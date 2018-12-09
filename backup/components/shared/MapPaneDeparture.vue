<template>
<div ref='echartsMapPaneDeparture' style='width: 100%; height: 100%' />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['ap', 'item', 'map', 'large', 'slider'],
  data: () => ({
    chart: '',
  }),
  computed: {
    ...mapState(['airport', 'color', 'areaColor']),
    items() {
      return _.slice(this.item, 0, this.slider)
    },
    center() {
      return this.ap.ap
    },
  },
  methods: {
    drawChart2d(map = 'usa') {
      const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
      const effect = { show: true, trailLength: 0.7, color: '#fff', symbolSize: 3 }

      const series = [{
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
          formatter: `{b} - ${ this.ap.tau }`,
        },
        data: [{
          name: this.center,
          value : [...this.getCoords(this.center), 100]
        }]
      },
      ..._.map(this.items, (n, i) => ({
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
          value: [...this.getCoords(n.ap), _.max([30, n.tau / this.ap.tau * 100])]
        }]
      })),
      ..._.map(this.items, (n, i) => ({
        name: n.ap,
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
          color: this.color[i],
          width: 1 + n.tau / this.ap.tau * 50,
          curveness: 0,
          opacity: 0.5,
        },
        data: this.convertData(n.ap, this.center, i, n)
      }))]


      const opt = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 'bold',
          // color: '#FFFFFF'
        },
        // backgroundColor: '#424242',
        tooltip : {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          top: 5,
          right: 5,
          data: _.map(this.items, 'ap'),
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
    convertData(y, x, i, n) {
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
      this.chart = echarts.init(this.$refs.echartsMapPaneDeparture)
      this.drawChart2d()
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    }, 1)
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.chart.resize, 200))
  }
}
</script>
