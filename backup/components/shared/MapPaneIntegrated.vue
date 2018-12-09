<template>
<div ref='echartsMapPaneIntegrated' style='width: 100%; height: 100%' />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['isArrival', 'centers', 'items', 'map'],
  data: () => ({
    chart : null,
    series: null,
    option: null,
  }),
  computed: {
    ...mapState(['airport', 'color', 'areaColor', 'effectLines']),
    xyCor() {
      const spread = _.map(_.flatten(this.items), n => this.getCoords(n.ap))
      const lon = _.map(spread, _.head), lat = _.map(spread, _.last)
      return [(_.max(lon) +_.min(lon)) / 2, (_.max(lat) + _.min(lat)) / 2]
    }
  },
  methods: {
    drawChart2d(isRecalculate = false, isRedraw = false, map = 'usa') {
      if(!this.series || isRecalculate) this.series = [
      ..._.map(this.centers, (n, i) => ({
        name: n.ap,
        type: 'effectScatter',
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
        // itemStyle: {
        //   normal: {
        //     color: this.color[i]
        //   }
        // },
        tooltip: {
          formatter: `{b} - ${ n.tau }`,
        },
        data: [{
          name: n.ap,
          value : this.getCoords(n.ap)
        }]
      })),
      ..._.flatten(_.map(this.items, (n, i) => _.map(n, (o, j) => ({
        name: this.centers[i].ap,
        type: 'effectScatter',
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
        symbolSize: 5,
        // symbolSize(val) {
        //   return val[2] / 4
        // },
        // itemStyle: {
        //   normal: {
        //     color: this.color[i]
        //   }
        // },
        tooltip: {
          formatter: `{b} - ${ o.tau }`,
        },
        data: [{
          name: o.ap,
          value: this.getCoords(o.ap)
        }]
      })))),
      // ..._.map(this.items, (n, i) => ({
      //   name: n.ap,
      //   type: 'lines',
      //   silent: true,
      //   zlevel: 2,
      //   effect: this.effectTrail,
      //   lineStyle: {
      //     color: '#FFFFFF',
      //     width: 0,
      //     curveness: 0
      //   },
      //   data: this.isArrival ? this.convertData(this.center.ap, n.ap) : this.convertData(n.ap, this.center.ap)
      // })),
      ..._.flatten(_.map(this.items, (n, i) => _.map(n, (o, j) => ({
        name: this.centers[i].ap,
        type: 'lines',
        zlevel: 3,
        symbol: ['none', 'arrow'],
        symbolSize: 6,
        effect: {
          ...this.effectLines,
          constantSpeed: 15,
        },
        large: true,
        largeThreshold: 50,
        // effect: {
        //   show: true,
        //   period: 6,
        //   trailLength: 0,
        //   symbol: this.planePath,
        //   symbolSize: 12,
        // },
        tooltip: {
          formatter: `{a}{b}{c} - ${ o.tau }`,
        },
        lineStyle: {
          // color: this.color[i],
          width: 1.5,
          curveness: 0,
          opacity: 0.7,
          // shadowBlur: 5,
          // shadowColor: this.color[i]
        },
        data: this.isArrival ? this.convertData(this.centers[i].ap, o.ap) : this.convertData(o.ap, this.centers[i].ap)
      }))))]

      if(!this.option || isRecalculate) this.option = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 'bold',
        },
        // title: {
        //   text: `${ this.center.ap } (total: ${ this.center.tau })`,
        //   bottom: 5,
        //   left: 5,
        //   fontSize: 12,
        //   textStyle: {
        //     color: '#FFFFFF'
        //   }
        // },
        // backgroundColor: '#424242',
        tooltip : {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          top: 5,
          right: 5,
          data: _.map(this.centers, 'ap'),
          textStyle: {
            color: '#FFFFFF',
            selectedMode: 'single',
            fontSize: 12,
          },
        },
        geo: {
          map,
          label: {
            emphasis: {
              show: false,
            },
          },
          // center: this.getCoords(this.center.ap),
          center: this.xyCor,
          roam: true,
          zoom: 1.6,
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
      const t    = x
      const from = this.getCoords(t)
      const to   = this.getCoords(y)
      return [{
        fromName: t,
        toName  : y,
        coords  : [from, to],
      }]
    },
  },
  watch: {
    items(to) {
      this.drawChart2d(true, true)
    },
    large(to) {
      _.delay(this.chart.resize, 200)
    },
    map(to) {
      this.drawChart2d(false, false, !to ? 'usa' : 'world')
    },
  },
  created() {

  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.echartsMapPaneIntegrated, 'chalk')
      this.drawChart2d(false, true)
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    }, 1)
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.chart.resize, 200))
  }
}
</script>
