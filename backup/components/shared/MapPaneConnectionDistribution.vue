<template>
  <div ref='echartsPaneConnectionDistribution' style='width: 100%; height: 100%' />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['isArrival', 'items'],
  data: () => ({
    chart : null,
    series: null,
    option: null,
  }),
  computed: {
    ...mapState(['airport', 'color', 'hubArr']),
  },
  methods: {
    drawChart(isReCalculate = false) {
      if(!this.series || isReCalculate) this.series = _.map(this.items, (n, i) => ({
        name: this.hubArr[i],
        type: 'line',
        symbolSize: 8,
        lineStyle: {
          // color: this.color[i],
          width: 3,
          opacity: 0.6
        },
        data: _.map(n, (o, j) => ({
          name : this.isArrival ? `${ this.hubArr[i] }<-${ o.ap }` : `${ this.hubArr[i] }->${ o.ap }`,
          // value: [this.distance(this.hubArr[i], o.ap), o.tau],
          // symbolSize: _.min([40, _.max([1, o.ratio * 7])]),
          // symbolSize: 10,
          value: o.tau
        })),
      }))

      if(!this.option || isReCalculate) {
        const v = this
        this.option = {
          textStyle: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: 11,
            fontWeight: 'bold',
            color: '#FFFFFF'
          },
          // title: {
          //   text: this.isArrival ? 'Arrival' : 'Departure',
          //   textStyle: {
          //     fontSize: 15,
          //     color: this.$vuetify.theme.primary
          //   }
          // },
          xAxis : [{
            // name: 'Ranking',
            // nameLocation: 'center',
            type : 'category',
            scale: true,
            // nameGap: 25,
            splitLine: {
              show: false
            },
            // axisLine: {
            //   lineStyle: {
            //     color: '#FFFFFF'
            //   }
            // },
            data: _.map(this.items[0], (n, i) => i + 1)
          }],
          yAxis : [{
            name: 'Volume (*1000)',
            nameGap: 10,
            type : 'value',
            scale: true,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter(item) {
                return _.round(item / 1000)
              }
            },
            // axisLine: {
            //   lineStyle: {
            //     color: '#FFFFFF'
            //   }
            // }
          }],
          grid: [{
            top: 25,
            left: 45,
            right: 20,
            bottom: 25,
          }],
          tooltip : {
            trigger: 'axis',
            formatter(params) {
              let el = `Rank ${ params[0].dataIndex + 1 }<br>`
              _.each(params, (n, i) => {
                const marker = n.marker.replace(n.color, v.color[i])
                el += `${ marker } ${ n.name }: ${ n.value }<br>`
              })
              return el.slice(0, -4)
            },
            // formatter: '{a}{b}{c}{d}{e}',
            axisPointer: {
              type: 'shadow',
              label: {
                color: '#000000',
              }
            },
          },
          legend: {
            orient: 'horizontal',
            width: 250,
            top: 0,
            right: 5,
            data: this.hubArr,
            itemGap: 3,
            itemWidth: 15,
            textStyle: {
              color: '#FFFFFF',
              selectedMode: 'single',
              fontSize: 12,
            },
          },
          series: this.series,
        }
      }

      this.chart.setOption(this.option, true)
    },
    distance(o, d) {
      if(o === d) return null
      const x = _.find(this.airport, n => n.code === o), y = _.find(this.airport, n => n.code === d)
      return _.round(3958.760 * acos(sin(x.lat) * sin(y.lat) + cos(x.lat) * cos(y.lat) * cos(x.lon - y.lon)), 2)
    },
  },
  watch: {
    items(to) {
      this.drawChart(true)
    },
  },
  created() {

  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.echartsPaneConnectionDistribution, 'chalk')
      this.drawChart()
      window.addEventListener('resize', debounce(this.chart.resize, 200))
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
