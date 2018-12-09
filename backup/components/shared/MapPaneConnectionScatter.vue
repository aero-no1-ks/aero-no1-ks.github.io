<template>
  <div ref='echartsMapPaneConnectionScatter' style='width: 100%; height: 100%' />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['isArrival', 'items', 'isRelative'],
  data: () => ({
    chart : null,
    series: null,
    option: null,
  }),
  computed: {
    ...mapState(['airport', 'color', 'hubArr']),
    itemsRelative() {
      return _.map(this.items, n => {
        const [max, min] = [_.maxBy(n, 'tau').tau, _.minBy(n, 'tau').tau]
        const delimiter  = max - min
        return _.map(n, o => ({ ap: o.ap, tau: _.round((o.tau - min) / delimiter * 100, 2) }))
      })
    },
    itemsFiltered() {
      return this.isRelative ? this.itemsRelative : this.items
    }
  },
  methods: {
    drawChart(isReCalculate = false) {
      if(!this.series || isReCalculate) this.series = _.map(this.itemsFiltered, (n, i) => ({
        name: this.hubArr[i],
        type: 'scatter',
        itemStyle: {
          // color: this.color[i],
          borderWidth: 1,
          borderColor: '#fff'
        },
        data: _.map(n, o => ({
          name : `${ this.hubArr[i] }->${ o.ap }`,
          value: [this.distance(this.hubArr[i], o.ap), o.tau],
          // symbolSize: _.min([40, _.max([1, o.ratio * 7])]),
          symbolSize: 12,
        })),
        // markPoint: {
        //   data : [
        //     {type : 'average', name: this.hubArr[i] },
        //     // {type : 'min', name: this.hubArr[i] }
        //   ],
        //   label: {
        //     show: false,
        //     formatter: '{a}{b}{c}{d}{e}'
        //   }
        // },
        // markArea: {
        //   silent: true,
        //   itemStyle: {
        //     normal: {
        //       color: 'transparent',
        //       borderWidth: 1,
        //       borderType: 'dashed'
        //     }
        //   },
        //   data: _.map(this.hubArr, n => [{
        //     name: n,
        //     xAxis: 'min',
        //     yAxis: 'min'
        //   }, {
        //     xAxis: 'max',
        //     yAxis: 'max'
        //   }])
        // }
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
            name: 'Distance (mile)',
            nameLocation: 'center',
            type : 'value',
            scale: true,
            nameGap: 25,
            splitLine: {
              show: false
            },
            // axisLine: {
            //   lineStyle: {
            //     color: '#FFFFFF'
            //   }
            // },
          }],
          yAxis : [{
            name: this.isRelative ? 'Volume (%)' : 'Volume (*1000)',
            nameGap: 10,
            type : 'value',
            scale: true,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter(item) {
                return v.isRelative ? item : _.round(item / 1000)
              }
            },
            // axisLine: {
            //   lineStyle: {
            //     color: '#FFFFFF'
            //   }
            // }
          }],
          grid: [{
            top: 35,
            left: 45,
            right: 20,
            bottom: 45,
          }],
          tooltip : {
            trigger: 'item',
            axisPointer: {
              type: 'cross',
              label: {
                color: '#FFFFFF',
                backgroundColor: this.$vuetify.theme.primary,
                shadowBlur: 0,
              },
              crossStyle: {
                type: 'dotted',
              }
            },
          },
          legend: {
            orient: 'vertical',
            top: 0,
            right: 2,
            data: this.hubArr,
            itemGap: 3,
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
    itemsFiltered(to) {
      this.drawChart(true)
    },
    large(to) {
      _.delay(this.chart.resize, 200)
    },
  },
  created() {

  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.echartsMapPaneConnectionScatter, 'chalk')
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
