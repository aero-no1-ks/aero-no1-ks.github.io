<template>
  <div ref='echartsMapPaneIntermediate' style='width: 100%; height: 100%' />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['ap', 'hub', 'map', 'large', 'slider'],
  data: () => ({
    chart: '',
  }),
  computed: {
    ...mapState(['airport', 'color', 'areaColor']),
    items() {
      return _.slice(this.hubData, 0, this.slider)
    },
    center() {
      return this.hub.ap
    },
    ref() {
      return `echartsMapPaneIntermediate${ this.ix }`
    },
    hubData() {
      const x = _.find(datasetOri, n => n.ap === this.hub.ap)
      return _.slice(_.map(x.total, n => ({ ap: n.ap, tau: n.tau, ratio: _.round(n.tau / x.tau * 100, 2) })), 0, 10)
    },
  },
  methods: {
    drawChart2d(map = 'usa') {
      const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
      const effect = { show: true, trailLength: 0.7, color: '#fff', symbolSize: 3 }

      const series = [{
        name: this.ap.ap,
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
        symbolSize(val) {
          return val[2] / 4
        },
        itemStyle: {
          normal: {
            color: this.$vuetify.theme.primary
          }
        },
        tooltip: {
          formatter: `{b} - ${ this.ap.tau }`,
        },
        data: [{
          name: this.ap.ap,
          value : [...this.getCoords(this.ap.ap), 100]
        }]
      }, {
        name: this.center,
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
        symbolSize(val) {
          return val[2] / 4
        },
        itemStyle: {
          normal: {
            color: this.$vuetify.theme.primary
          }
        },
        tooltip: {
          formatter: `{b} - ${ this.hub.tau }`,
        },
        data: [{
          name: this.center,
          value : [...this.getCoords(this.center), 100]
        }]
      },
      ..._.compact(_.map(this.items, (n, i) => {
        if(n.ap === this.ap.ap) return null
        return {
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
          symbolSize(val) {
            return val[2] / 4
          },
          itemStyle: {
            normal: {
              color: this.color[i]
            }
          },
          tooltip: {
            formatter: `{b} - ${ n.tau }`,
          },
          data: [{
            name: n.ap,
            value: [...this.getCoords(n.ap), _.min([_.max([30, n.ratio]), 100])]
          }]
        }
      })), {
        name: `${ this.ap.ap } -> ${ this.center }`,
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#fff',
          symbolSize: 3
        },
        lineStyle: {
          normal: {
            color: this.$vuetify.theme.primary,
            width: 0,
            curveness: 0
          }
        },
        data: this.convertData(this.center, this.ap.ap)
      }, {
        name: `${ this.ap.ap } -> ${ this.center }`,
        type: 'lines',
        symbol: ['none', 'arrow'],
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          // trailLength: 0.7,
          symbol: planePath,
          symbolSize: 15
        },
        lineStyle: {
          color: this.$vuetify.theme.primary,
          // width: 1 + n.ratio * 50,
          width: 3,
          curveness: 0,
          opacity: 0.8,
        },
        data: this.convertData(this.center, this.ap.ap)
      },
      ..._.compact(_.map(this.items, (n, i) => {
        if(n.ap === this.ap.ap) return null
        return {
          name: n.ap,
          type: 'lines',
          symbol: ['none', 'arrow'],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            color: this.color[i],
            // width: 1 + n.ratio * 50,
            width: 1,
            curveness: 0.2,
            opacity: 0.5,
          },
          data: this.convertData(n.ap, this.center)
        }
      }))]


      const opt = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 'bold',
          // color: '#FFFFFF'
        },
        backgroundColor: '#666666',
        tooltip : {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          top: 5,
          right: 5,
          data: _.map(this.items, 'ap'),
          textStyle: {
            color: '#222',
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
          center: this.getCoords(this.center),
          roam: true,
          zoom: 1.4,
          itemStyle: {
            normal: {
              areaColor: this.areaColor,
              // areaColor: '#EEE',
              borderColor: '#5D5D5D',
            },
            emphasis: {
              areaColor: this.$vuetify.theme.primary,
            }
          }
        },
        series
      }

      this.chart.setOption(opt, true)
    },

    //** functions */
    getCoords(x) {
      const o = _.find(this.airport, n => n.code === x)
      return [o.lon, o.lat]
    },
    convertData(y, x) {
      const t    = x || this.center
      const from = this.getCoords(t)
      const to   = this.getCoords(y)
      return [{
        fromName: t,
        toName  : y,
        coords  : [from, to],
      }]
    },
    onOpen(x) {
      window.open(x)
    },
  },
  watch: {
    items(to) {
      this.drawChart2d()
    },
    large(to) {
      _.delay(this.chart.resize, 200)
    },
    map(to) {
      this.drawChart2d(!to ? 'usa' : 'world')
    }
  },
  created() {
  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.echartsMapPaneIntermediate)
      this.drawChart2d()
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    }, 1)
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.chart.resize, 200))
  }
}
</script>


<style lang='stylus' scoped>
.textShadow
  text-shadow: 1px 1px 1.5px rgba(0, 0, 0, 0.5) !important

.bold
  font-weight: bold !important

.line
  line-height: 48px !important

.noTransform
  text-transform: none !important
</style>
