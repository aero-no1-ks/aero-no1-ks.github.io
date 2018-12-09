<template>
<div ref='routeBar' class='routeBarChart pa-1 my-1' />
</template>


<script>
export default {
  props: ['ori', 'des', 'route', 'tau', 'color'],
  data: () => ({

  }),
  computed: {
    prod() {
      return {
        tau  : _.map(this.route, 'tau'),
        ratio: _.map(this.route, n => _.round(n.tau / this.tau * 100, 2)),
        stop : _.map(this.route, n => _.join(n.hub, '->') || `${ this.des } (direct)`)
      }
    },
    rest() {
      let ix = _.findIndex(this.route, n => !_.size(n.hub))
      if(ix < 0) ix = 0
      return [{
        name: this.prod.stop[ix],
        value: this.prod.ratio[ix],
        itemStyle: {
          color: this.$vuetify.theme.primary,
        }
      }, {
        name: 'the rest',
        value: _.round(_.sum(_.reject(this.prod.ratio, (n, i) => i === ix)), 2),
        itemStyle: {
          color: this.color[1],
        }
      }]
    }
  },
  methods: {
    drawChart() {
      const option = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'lighter',
          color: 'white'
        },
        title: [{
          text: 'Relative(%) demand distribution',
          textStyle: {
            fontSize: 13,
            color: '#fff'
          }
        }, {
          text: 'Absolute demand distribution',
          top: '33%',
          textStyle: {
            fontSize: 13,
            color: '#fff'
          }
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
        },
        // axisPointer: {
        //   link: {
        //     xAxisIndex: 'all'
        //   },
        //   label: {
        //     fontFamily: 'Poppins, sans-serif'
        //   }
        // },
        xAxis: [{
          type: 'category',
          // data: this.prod.stop,
          data: _.map(this.rest, 'name'),
          gridIndex: 0,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },

        }, {
          type: 'category',
          data: this.prod.stop,
          gridIndex: 1,
          axisLine: {
            show: false,
          },
          // axisLabel: {
          //   show: false,
          // },
          axisTick: {
            show: false,
          }
        }],
        yAxis: [{
          type: 'value',
          min: 0,
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
          axisLine: {
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
          left: 5,
          right: 5,
          top: 30,
          bottom: '71%',
          containLabel: true,
        }, {
          left: 5,
          right: 5,
          top: '45%',
          bottom: 5,
          containLabel: true,
        }],
        series: [{
          name: 'relative(%)',
          type: 'bar',
          xAxisIndex: 0,
          yAxisIndex: 0,
          barCategoryGap: 5,
          data: this.rest,
          itemStyle: {
            opacity: 0.9,
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            barBorderRadius: [5, 5, 0, 0]
          },
          label: {
            normal: {
              show: true,
              position: 'top',
            }
          },
        }, {
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          barCategoryGap: 5,
          data: _.map(this.prod.tau, (n, i) => ({
            name: this.prod.stop[i],
            value: n,
            itemStyle: {
              color: _.size(this.route[i].hub) ? this.color[i] : this.$vuetify.theme.primary,
            }
          })),
          itemStyle: {
            opacity: 0.9,
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            barBorderRadius: [5, 5, 0, 0]
          },
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
        }],
      }

      this.chart.setOption(option, true)
    },
  },
  watch: {
    prod(to) {
      if(this.chart) this.drawChart()
    }
  },
  created() {
  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.routeBar)
      this.drawChart()
      // this.chart.on('click', params => this.$emit('onUpdate', params.name, this.isOri))
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    }, 1)
  }
}
</script>


<style lang='stylus'>
.routeBarChart
  width: 100%
  height: calc(50vh + 24px - 64px - 16px - 48px - 46px)
  // height: 150px
</style>
