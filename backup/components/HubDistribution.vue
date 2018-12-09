<template>
<div :ref='ref' class='hubChart pa-1 my-1' />
</template>


<script>
import { mapState, mapGetters } from 'vuex'

const handleIcon = 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'

export default {
  props: ['ap'],
  data: () => ({
    chart: null,
    percent: 0.95,
  }),
  computed: {
    ...mapState(['ori', 'des', 'airport']),
    isOri() {
      return this.ap === this.ori
    },
    info() {
      return _.filter(chartData, n => n.info.ori === this.ap)
    },
    ref() {
      return `distribution_${ this.ap }`
    },
    prod() {
      return _.orderBy(_.map(this.info, n => ({
        des  : n.info.des,
        tau  : n.info.tau,
        break: _.times(3, i => _.sumBy(_.filter([...n.data.major, ...n.data.minor], o => _.size(o.hub) === i), 'tau'))
      })), ['tau'], ['desc'])
    },
    cut() {
      return _.findIndex(this.prod, n => n.tau < 500)
    },
    ix() {
      return _.findIndex(_.map(this.prod, 'des'), n => n === this.target)
    },
    target() {
      return this.isOri ? this.des : this.ori
    },
    abs() {
      return _.times(3, i => _.slice(_.map(this.prod, n => n.break[i]), 0, this.cut))
    },
    dest() {
      return _.slice(_.map(this.prod, 'des'), 0, this.cut)
    },
    tau() {
      return _.orderBy(_.map(this.info, n => ({
        des : n.info.des,
        tau : n.info.tau,
        dist: this.distance(n.info.ori, n.info.des),
      })), ['dist'], ['asc'])
    },
    distTau() {
      const maxDist = _.ceil(_.maxBy(this.tau, 'dist').dist / 50)
      const tau = [], aps = []
      _.times(maxDist, i => {
        const arr = _.filter(this.tau, n => n.dist >= i * 50 && n.dist < (i + 1) * 50)
        tau.push(_.sum(_.map(arr, n => Number(n.tau))))
        aps.push(_.join(_.map(arr, 'des').sort((a, b) => a - b), ','))
      })
      return [_.times(maxDist, i => i * 50), tau, aps]
    },
    cdf() {
      const el = _.map(this.distTau[1], (n, i) => ({
        name: this.distTau[2][i],
        value: _.sum(_.slice(this.distTau[1], 0, i + 1))
      }))
      const ix = _.findIndex(el, n => (n.value / _.last(el).value) >= this.percent)
      return [_.slice(this.distTau[0], 0, ix), _.slice(el, 0, ix)]
    }
  },
  methods: {
    toRelative(i) {
      return _.slice(_.map(this.prod, (n, j) => _.round(n.break[i] / n.tau * 100, 2)), 0, this.cut)
    },
    distance(o, d) {
      if(o === d) return null
      const x = _.find(this.airport, n => n.code === o), y = _.find(this.airport, n => n.code === d)
      return _.round(3958.760 * acos(sin(x.lat) * sin(y.lat) + cos(x.lat) * cos(y.lat) * cos(x.lon - y.lon)), 2)
    },
    drawChart() {
      const v = this
      const option = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'lighter',
          color: '#fff'
        },
        title: [{
          text: 'Relative(%)',
          textStyle: {
            fontSize: 13,
            color: '#fff'
          }
        }, {
          text: 'Absolute',
          top: '26%',
          textStyle: {
            fontSize: 13,
            color: '#fff'
          }
        }, {
          text: `CDF: demand vs. distance (${ this.percent * 100 }%)`,
          top: '58%',
          textStyle: {
            fontSize: 13,
            color: '#fff'
          }
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
        },
        axisPointer: {
          link: {
            xAxisIndex: [0, 1],
          },
          label: {
            fontFamily: 'Poppins, sans-serif'
          }
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.dest,
          gridIndex: 0,
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        }, {
          type: 'category',
          boundaryGap: false,
          data: this.dest,
          gridIndex: 1,
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          }
        }, {
          type: 'category',
          boundaryGap: false,
          // data: this.des,
          // data: this.distTau[0],
          data: this.cdf[0],
          min: 0,
          gridIndex: 2,
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          }
        }],
        yAxis: [{
          type: 'value',
          max: 100,
          gridIndex: 0,
          position: 'right',
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          }
        }, {
          type: 'value',
          gridIndex: 1,
          position: 'right',
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          }
        }, {
          type: 'value',
          gridIndex: 2,
          position: 'right',
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          }
        }],
        grid: [{
          left: 10,
          right: 15,
          top: 22,
          height: '18%',
          containLabel: true,
        }, {
          left: 10,
          right: 15,
          top: '29.5%',
          height: '18%',
          containLabel: true,
        }, {
          left: 10,
          right: 15,
          top: '62%',
          height: '18%',
          containLabel: true,
          // tooltip: {
          //   trigger: 'axis',
          //   axisPointer: {
          //     type: 'cross',
          //     label: {
          //       show: true,
          //       formatter(params) {
          //         const x = params.seriesData[0] || { name: '', value: '' }
          //         return `${ x.name }: ${ v.distance(v.ap, x.name || v.ap) || 0 }miles`
          //       }
          //     }
          //   },
          // },
        }],
        series: [{
          name: '0-stop',
          type: 'line',
          stack: '1',
          smooth: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this.toRelative(0),
          lineStyle: {
            width: 1,
            color: 'white',
          },
          areaStyle: {
            color: this.$vuetify.theme.primary,
            opacity: 0.7
          }
        }, {
          name: '1-stop',
          type: 'line',
          stack: '1',
          smooth: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this.toRelative(1),
          lineStyle: {
            width: 1,
            color: 'white'
          },
          areaStyle: {
            color: 'rgb(149, 213, 30)',
            opacity: 0.7
          }
        }, {
          name: '2-stop',
          type: 'line',
          stack: '1',
          smooth: false,
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: this.toRelative(2),
          lineStyle: {
            width: 1,
            color: 'white',
          },
          areaStyle: {
            color: 'black',
            opacity: 0.7
          },
        }, {
          name: '0-stop',
          type: 'line',
          stack: '2',
          smooth: false,
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: this.abs[0],
          lineStyle: {
            width: 1,
            color: 'white',
          },
          areaStyle: {
            color: this.$vuetify.theme.primary,
            opacity: 0.7
          },
          markPoint : {
            itemStyle: {
              color: this.$vuetify.theme.primary,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            data : [
              { name : this.target, value: this.target, xAxis: this.ix, yAxis: this.abs[0][this.ix] * 1.1 }
            ]
          }
        }, {
          name: '1-stop',
          type: 'line',
          stack: '2',
          smooth: false,
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: this.abs[1],
          lineStyle: {
            width: 1,
            color: 'white'
          },
          areaStyle: {
            color: 'rgb(149, 213, 30)',
            opacity: 0.7
          },
        }, {
          name: '2-stop',
          type: 'line',
          stack: '2',
          smooth: false,
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: this.abs[2],
          lineStyle: {
            width: 0,
            color: 'white',
          },
          areaStyle: {
            color: 'black',
            opacity: 0.7
          },
        }, {
          // name: 'Demand along Distance',
          type: 'line',
          smooth: false,
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: this.cdf[1],
          lineStyle: {
            width: 1,
            color: 'white',
          },
          areaStyle: {
            color: this.$vuetify.theme.primary,
            opacity: 0.9
          },
          tooltip: {
            formatter: '{a}{b}{c}{d}{e}',
            // formatter(params) {
            //   return params.name + params.value
            // }
          }
        }],
        dataZoom: [{
          top: '51%',
          xAxisIndex: [0, 1],
          realtime: true,
          right: 15,
          type: 'slider',
          filterMode: 'weakFilter',
          showDataShadow: false,
          height: 10,
          borderColor: 'transparent',
          backgroundColor: '#e2e2e2',
          handleIcon,
          handleSize: 20,
          showDetail: false,
          // handleStyle: {
          //   shadowBlur: 6,
          //   shadowOffsetX: 1,
          //   shadowOffsetY: 2,
          //   shadowColor: '#aaa'
          // },
          labelFormatter: ''
        }, {
          top: '84%',
          xAxisIndex: [2],
          realtime: true,
          right: 15,
          type: 'slider',
          filterMode: 'weakFilter',
          showDataShadow: false,
          height: 10,
          borderColor: 'transparent',
          backgroundColor: '#e2e2e2',
          handleIcon,
          handleSize: 20,
          showDetail: false,
          // handleStyle: {
          //   shadowBlur: 6,
          //   shadowOffsetX: 1,
          //   shadowOffsetY: 2,
          //   shadowColor: '#aaa'
          // },
          labelFormatter: ''
        }],
      }

      this.chart.setOption(option, true)
    },
  },
  watch: {
    prod(to) {
      if(this.chart) this.drawChart()
    },
    ap(to) {
      if(this.chart) this.drawChart()
    },
    des(to) {
      if(this.chart) this.drawChart()
    }
  },
  created() {
  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs[this.ref])
      this.drawChart()
      window.addEventListener('resize', debounce(this.chart.resize, 200))

      if(this.isOri) this.chart.on('click', params => this.$store.commit('setState', ['ori', params.name]))
      else           this.chart.on('click', params => this.$store.commit('setState', ['des', params.name]))
    }, 1)
  },
  beforeDestroy() {
    window.removeEventListener('resize', debounce(this.chart.resize, 200))
  }
}

function de2ra(x) { return x * Math.PI / 180 }
function sin(x)   { return Math.sin(de2ra(x)) }
function cos(x)   { return Math.cos(de2ra(x)) }
function asin(x)  { return Math.asin(x) }
function acos(x)  { return Math.acos(x) }
</script>


<style lang='stylus'>
.hubChart
  width: 100%
  height: 100%
</style>
