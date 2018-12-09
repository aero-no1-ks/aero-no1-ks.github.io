<template>
<div ref='echartsInstance' style='width: 100%; height: 100%' />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['isArrival', 'center', 'items', 'map', 'large', 'slider', 'xycor'],
  data: () => ({
    chart : null,
    series: null,
    option: null,
  }),
  computed: {
    ...mapState(['airport', 'color', 'areaColor', 'effectLines', 'effectTrail']),
  },
  methods: {
    drawChart2d(isRecalculate = false, isRedraw = false, map = 'usa') {
      if(!this.series || isRecalculate) this.series = [{
        name: this.center.ap,
        type: 'effectScatter',
        zLevel: 10,
        coordinateSystem: 'geo',
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}',
            distance: 10,
          }
        },
        symbolSize: 10,
        // symbolSize(val) {
        //   return val[2] / 4
        // },
        // itemStyle: {
        //   normal: {
        //     color: this.$vuetify.theme.primary
        //   }
        // },
        tooltip: {
          formatter: `{b} - ${ this.center.tau }`,
        },
        data: [{
          name: this.center.ap,
          value : [...this.getCoords(this.center.ap), 100]
        }]
      },
      ..._.map(this.items, (n, i) => ({
        name: n.ap,
        // type: 'effectScatter',
        type: 'scatter',
        coordinateSystem: 'geo',
        // rippleEffect: {
        //   brushType: 'stroke'
        // },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}',
            distance: 10,
          }
        },
        symbolSize: 5,
        // symbolSize(val) {
        //   return val[2] / 4
        // },
        // itemStyle: {
        //   normal: {
        //     // color: this.color[i]
        //     color: 'rgb(159, 159, 159)'
        //   }
        // },
        tooltip: {
          formatter: `{b} - ${ n.tau } (${ n.ratio }%)`,
        },
        data: [{
          name: n.ap,
          value: [...this.getCoords(n.ap), _.min([_.max([20, n.ratio]), 80])]
        }]
      })),
      // ..._.map(this.items, (n, i) => ({
      //   name: n.ap,
      //   type: 'lines',
      //   silent: true,
      //   zlevel: 5,
      //   effect: this.effectLines,
      //   lineStyle: {
      //     color: '#FFFFFF',
      //     width: 0,
      //     curveness: 0
      //   },
      //   data: this.isArrival ? this.convertData(this.center.ap, n.ap) : this.convertData(n.ap, this.center.ap)
      // })),
      ..._.map(this.items, (n, i) => ({
        name: n.ap,
        type: 'lines',
        zlevel: 2,
        // symbol: ['none', 'none'],
        // symbolSize: 6,
        // effect: this.effectLines,
        large: true,
        // largeThreshold: 50,
        tooltip: {
          formatter: `{a}{b}{c} - ${ n.tau } (${ n.ratio }%)`,
        },
        lineStyle: {
          color: 'cyan',
          width: 2.5,
          curveness: 0,
          opacity: 0.9,
        },
        data:
        // this.isArrival ? [{
        //   fromName: n.ap,
        //   toName  : this.center.ap,
        //   coords  : [this.getCoords(n.ap), this.getRatioCoords(n.ap, this.center.ap, 0.3)],
        // }] :
        [{
          fromName: this.center.ap,
          toName  : n.ap,
          coords  : [this.getCoords(this.center.ap), this.getRatioCoords(this.center.ap, n.ap, 0.3)],
        }]
        // this.convertData(this.getRatioCoords(n.ap, this.center.ap, 0.3), n.ap) : this.convertData(this.getRatioCoords(this.center.ap, n.ap, 0.3), this.center.ap)
      })),
      ..._.map(this.items, (n, i) => ({
        name: n.ap,
        type: 'lines',
        zlevel: 3,
        // symbol: ['none', 'none'],
        // symbolSize: 6,
        effect: this.effectLines,
        large: true,
        silent: true,
        // largeThreshold: 50,
        // tooltip: {
        //   formatter: `{a}{b}{c} - ${ n.tau } (${ n.ratio }%)`,
        // },
        lineStyle: {
          color: 'rgb(255, 237, 0)',
          width: 1.5,
          curveness: 0,
          opacity: 0.4,
          type: 'dotted',
        },
        data: this.isArrival ? [{
          fromName: n.ap,
          toName  : this.center.ap,
          coords  : [this.getCoords(n.ap), this.getCoords(this.center.ap)],
        }] : [{
          fromName: this.center.ap,
          toName  : n.ap,
          coords  : [this.getCoords(this.center.ap), this.getCoords(n.ap)],
        }]
        // data: this.isArrival ? this.convertData(this.center.ap, this.getRatioCoords(n.ap, this.center.ap, 0.3)) : this.convertData(n.ap, this.getRatioCoords(this.center.ap, n.ap, 0.3))
      }))]

      if(!this.option || isRecalculate) this.option = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 'bold',
        },
        title: {
          text: `${ this.center.ap } (total: ${ this.center.tau })`,
          bottom: 5,
          left: 5,
          fontSize: 12,
          textStyle: {
            color: '#FFFFFF'
          }
        },
        // backgroundColor: '#424242',
        tooltip : {
          trigger: 'item',
        },
        // legend: {
        //   orient: 'horizontal',
        //   top: 5,
        //   right: 5,
        //   data: _.map(this.items, 'ap'),
        //   textStyle: {
        //     color: '#FFFFFF',
        //     selectedMode: 'single',
        //     fontSize: 12,
        //   },
        // },
        geo: {
          map,
          label: {
            emphasis: {
              show: false,
            },
          },
          silent: true,
          // center: this.getCoords(this.center.ap),
          center: this.xycor,
          roam: true,
          zoom: 1.4,
          itemStyle: {
            normal: {
              areaColor: this.areaColor,
              borderColor: '#989898',
            },
            emphasis: {
              areaColor: this.$vuetify.theme.primary,
            }
          }
        },
        series: this.series
      }

      this.chart.setOption(this.option, isRedraw)
    },

    //** functions */
    getCoords(x) {
      const o = _.find(this.airport, n => n.code === x)
      return [o.lon, o.lat]
    },
    convertData(y, x) {
      const t    = x || this.center.ap
      const from = this.getCoords(t)
      const to   = this.getCoords(y)
      return [{
        fromName: t,
        toName  : y,
        coords  : [from, to],
      }]
    },
    getRatioCoords(o, d, r = 0.3) {
      const x = this.getCoords(o)
      const y = this.getCoords(d)
      return [(1 - r) * x[0] + r * y[0], (1 - r) * x[1] + r * y[1]]
    }
  },
  watch: {
    xycor(to) {
      this.drawChart2d(true, true)
    },
    large(to) {
      _.delay(this.chart.resize, 200)
    },
    map(to) {
      this.drawChart2d(false, false, !to ? 'usa' : 'world')
    },
  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.echartsInstance, 'chalk', { renderer: 'canvas' })
      this.drawChart2d(false, true)
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    }, 1)

  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.chart.resize, 200))
  }
}
</script>
