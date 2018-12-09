<template>
  <div ref='echartsMapPane2' style='width: 100%; height: 100%' />
</template>

<script>
import echarts   from 'echarts'
import echartsGl from 'echarts-gl'
import airport   from '@/shared/airport'
import usa       from '@/shared/usa.fine'
import world     from 'world-map-geojson'

const color = ['#EC407A', '#AB47BC', '#42A5F5','#4DB6AC', '#66BB6A', '#FFEE58','#FFA726', '#A1887F', '#BDBDBD']

export default {
  props: ['ap', 'selected', 'slider'],
  data: () => ({
    chart: '',
  }),
  computed: {
    route() {
      return _.find(chartData, n => {
        // const e = 
        // .hub === this.ori && n.info.des === this.des
      })
    },
    ori() {
      return this.ap.ori
    }
  },
  methods: {
    drawChart2d(map = 'usa') {
      const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
      const effect = { show: true, trailLength: 0.7, color: '#fff', symbolSize: 3 }
  
      const series = [{
        name: this.ori,
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
          name: this.ori,
          value : [...this.getCoords(this.ori), 100]
        }]
      }, 
      ..._.map(this.topItems, (n, i) => ({
        name: n.des,
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
            color: color[i]
          }
        },
        tooltip: {
          formatter: `{b} - ${ n.tau }`,
        },
        data: [{
          name: n.des,
          value: [...this.getCoords(n.des), _.max([30 + n.tau.split(' ')[0] / this.ap.tau * 100])]
        }]
      })),
      ..._.map(this.topItems, (n, i) => ({
        name: n.des,
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
          color: color[i],
          width: 1 + n.tau.split(' ')[0] / this.ap.tau * 50,
          curveness: 0,
          opacity: 0.5,
        },
        data: this.convertData(n.des, this.ori, i, n)
      }))]


      const opt = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 'bold',
        },
        backgroundColor: '#FEFEFE',
        tooltip : {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          top: 5,
          right: 5,
          data: _.map(this.topItems, 'des'),
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
          center: this.getCoords(this.ori),
          roam: true,
          zoom: 1.7,
          itemStyle: {
            normal: {
              // areaColor: '#323c48',
              areaColor: '#EEE',
              borderColor: '#404a59',
            },
            emphasis: {
              areaColor: '#2a333d',
            }
          }
        },
        series
      }

      this.chart.setOption(opt, true)
    },

    //** functions */
    getCoords(x) {
      const o = _.find(airport, n => n.code === x)
      return [o.lon, o.lat]
    },
    convertData(y, x, i, n) {
      const t    = x || this.ori
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
    topItems(to) {
      this.drawChart2d()
      // const series = _.map(this.chart.getOption().series, (n, i) => {
      //   if(n.type !== 'lines') return n
      //   m(i, this.selected, n.name)
      //   n.lineStyle.width = this.selected !== n.name ? 25 : 1 //** to: bolden, from: recover */
      //   return n
      // })
      // this.chart.setOption({ series })
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
  beforeMount() {
    echarts.registerMap('usa', usa)
    echarts.registerMap('world', world)
  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.echartsMapPane2)
      this.drawChart2d()
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    }, 1)
  },
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