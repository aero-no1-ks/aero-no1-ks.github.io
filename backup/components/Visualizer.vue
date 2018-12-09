<template>
<div ref='echartsWrapper' style='width: 100%; height: 100%' />
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['view', 'map', 'refresh', 'hoverIx'],
  data: () => ({
    chart: '',
  }),
  computed: {
    ...mapState(['airport', 'ori', 'des', 'color', 'areaColor', 'effectLines', 'effectTrail']),
    ...mapGetters(['routeData', 'tau']),
    draw() {
      return ['drawChart2d', 'drawChart3d'][this.view]
    },
    shaded() {
      return _.uniq(_.flatten(_.map(this.routeData, 'hub')))
    },
    center() {
      const el = [this.ori, this.des, ...this.shaded]
      const xycor = _.map(el, this.getCoords)
      return [_.sum(_.map(xycor, n => n[0])) / _.size(el), _.sum(_.map(xycor, n => n[1])) / _.size(el)]
    },
  },
  methods: {
    drawChart2d(map = 'usa') {
      const series = [{
        name: this.ori,
        type: 'effectScatter',
        zlevel: 2,
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
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: this.$vuetify.theme.primary
          }
        },
        tooltip: {
          formatter: '{a},{b},{c},{d},{e}',
        },
        data: [{
          name : this.ori,
          value: _.concat(this.getCoords(this.ori), 100)
        }]
      }, {
        name: this.des,
        type: 'effectScatter',
        zlevel: 2,
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
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: this.$vuetify.theme.primary
          }
        },
        data: [{
          name : this.des,
          value: _.concat(this.getCoords(this.des), 100)
        }]
      }]

      //** direct path */
      const el = _.find(this.routeData, n => !_.size(n.hub))
      if(el) {
        // const name = `${ this.ori }->${ this.des }`
        const name  = 'direct'
        const input = this.convertData(this.des)
        series.push(
        {
          name,
          type: 'lines',
          zlevel: 1,
          silent: true,
          effect: this.effectTrail,
          lineStyle: {
            normal: {
              color: this.$vuetify.theme.primary,
              width: 0,
              curveness: 0
            }
          },
          data: input
        },
        {
          name,
          type: 'lines',
          zlevel: 2,
          progressive: 300,
          symbol: ['none', 'arrow'],
          symbolSize: 6,
          effect: this.effectLines,
          lineStyle: {
            normal: {
              color: this.$vuetify.theme.primary,
              width: 1.5,
              opacity: 0.6,
              curveness: 0,
            },
            emphasis: {
              color: this.$vuetify.theme.primary,
              width: 8,
              opacity: 1,
              curveness: 0,
              shadowBlur: 10,
              shadowColor: 'white'
            }
          },
          data: input
        }
      )
      }

      //** indirect path */
      _.each(this.routeData, (n, i) => {
        // const name = `${ this.ori }->${ _.join(n.hub, '->') }->${ this.des }`
        const name = _.join(n.hub, '->')
        _.each(n.hub, (o, j) => {
          const input = this.convertData(o, !j ? false : n.hub[j - 1])
          series.push(
          {
            name,
            zlevel: 1,
            type: 'lines',
            silent: true,
            effect: this.effectTrail,
            lineStyle: {
              normal: {
                color: this.color[i],
                width: 0,
                curveness: 0
              },
            },
            data: input
          },
          {
            name,
            zlevel: 2,
            type: 'lines',
            progressive: 300,
            symbol: ['none', 'arrow'],
            symbolSize: 6,
            effect: this.effectLines,
            lineStyle: {
              normal: {
                color: this.color[i],
                width: 1.5,
                opacity: 0.6,
                curveness: 0,
              },
              emphasis: {
                color: this.color[i],
                width: 8,
                opacity: 1,
                curveness: 0,
                shadowBlur: 10,
                shadowColor: 'white'
              }
            },
            data: input
          }, {
            name: o,
            type: 'effectScatter',
            zlevel: 2,
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
            itemStyle: {
              normal: {
                color: this.color[i],
              }
            },
            tooltip: {
              formatter: '{a},{b},{c},{d},{e}'
            },
            data: [{
              name : o,
              value: _.concat(this.getCoords(o), 100)
            }]
          })
        })

        if(!_.size(n.hub)) return
        const input = this.convertData(this.des, _.last(n.hub))
        series.push(
        {
          name,
          zlevel: 1,
          type: 'lines',
          silent: true,
          effect: this.effectTrail,
          lineStyle: {
            normal: {
              color: this.color[i],
              width: 0,
              curveness: 0
            },
          },
          data: input
        },
        {
          name,
          zlevel: 2,
          type: 'lines',
          progressive: 300,
          symbol: ['none', 'arrow'],
          symbolSize: 6,
          effect: this.effectLines,
          lineStyle: {
            normal: {
              color: this.color[i],
              width: 1.5,
              opacity: 0.6,
              curveness: 0,
            },
            emphasis: {
              color: this.color[i],
              width: 8,
              opacity: 1,
              curveness: 0,
              shadowBlur: 10,
              shadowColor: 'white'
            }
          },
          data: input
        })
      })

      const opt = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 'bold',
        },
        // backgroundColor: '#FEFEFE',
        tooltip : {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          top: 5,
          right: 5,
          data: _.map(this.routeData, n => _.size(n.hub) ? _.join(n.hub, '->') : 'direct'),
          textStyle: {
            color: '#FFF',
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
          // center: [(i[0] + j[0]) / 2, (i[1] + j[1]) / 2],
          center: this.center,
          roam: true,
          zoom: 1.5,
          itemStyle: {
            normal: {
              // areaColor: '#4F4658',
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
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    },

    ///////////////////////////////////////
    ///////////////////////////////////////
    ///////////////////////////////////////

    drawChart3d(map = 'usa') {
      const effect = { show: true, trailLength: 0.2, constantSpeed: 15, trailWidth: 7, trailOpacity: 0.7 }
      const series = []

      _.each(this.shaded, (n, i) => {
        series.push({
          name: n,
          type: 'bar3D',
          coordinateSystem: 'geo3D',
          shading: 'lambert',
          barSize: 1,
          bevelSize: 0.2,
          bevelSmoothness: 2,
          minHeight: 1,
          maxHeight: 5,
          itemStyle: {
            color: this.color[i],
            borderWidth: 1,
            borderColor: '#FFFFFF',
          },
          blendMode: 'source-over',
          label: {
            show: true,
            distance: 1,
            formatter: '{b}',
            textStyle: {
              color: '#222222',
            }
          },
          data: [{
            name : n,
            value: _.concat(this.getCoords(n), _.round(Math.log(this.getTau(n) / this.tauSum * 50), 2)),
          }]
        })
      })

      _.each([this.ori, this.des], (n, i) => {
        series.push({
          name: `${ n }(${ !i ? 'Origin' : 'Destination' })`,
          type: 'bar3D',
          coordinateSystem: 'geo3D',
          shading: 'lambert',
          barSize: 1,
          bevelSize: 0.2,
          bevelSmoothness: 2,
          minHeight: 1,
          maxHeight: 5,
          itemStyle: {
            color: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#FFFFFF',
          },
          blendMode: 'source-over',
          label: {
            show: true,
            distance: 1,
            formatter: '{b}',
            textStyle: {
              color: '#222222',
            }
          },
          data: [{
            name : n,
            value: _.concat(this.getCoords(n), 5),
          }]
        })
      })


      _.each(this.routeData, (n, i) => {
        //** direct path */
        if(!_.size(n.hub)) {
          const name = `${ this.ori }->${ this.des }`
          series.push(
            {
            name,
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            effect: this.effectTrail,
            blendMode: 'source-over',
            lineStyle: {
              normal: {
                color: '#FFFFFF',
                width: 1,
                opacity: 0.6,
              }
            },
            data: [this.convertData3D(this.des)]
          },
          )
        } else {
          //** indirect path */
          const name = `${ this.ori }->${ _.join(n.hub, '->') }->${ this.des }`
          const obj  = {
            name,
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            effect: this.effectTrail,
            blendMode: 'souce-over',
            lineStyle: {
              normal: {
                color: this.color[i],
                width: 1,
                opacity: 0.6,
              }
            },
            data: _.map([...n.hub, this.des], (o, j) => this.convertData3D(o, !j ? this.ori : n.hub[j - 1]))
          }
          series.push(obj)
        }
      })



      ////////////////////////////////////////
      ////////////////////////////////////////
      ////////////////////////////////////////
      const i = this.getCoords(this.ori)
      const j = this.getCoords(this.des)
      const opt = {
        textStyle: {
          fontFamily: 'Poppins, sans-serif',
          fontSize: 14,
          fontWeight: 'bold',
        },
        tooltip : {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 5,
          bottom: 5,
          data: _.map(this.routeData, n => `${ this.ori }${ _.size(n.hub) ? '->' + _.join(n.hub, '->') : '' }->${ this.des }`),
          textStyle: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14,
            fontWeight: 'bold',
            color: '#FFFFFF',
            selectedMode: 'single',
          },
        },
        geo3D: {
          map,
          viewControl: {
            // projection: 'orthographic',
            alpha: 50,
            distance: 70,
            panMouseButton: 'left',
            rotateMouseButton: 'right'
          },
          groundPlane: {
            show: false,
            // color: 'rgba(0, 0, 0, 0.1)',
          },
          environment: '/atn-research/assets/img/starfield.jpg',
          boxHeight: 2.5,
          regionHeight: 2.5,
          boxHeight: 0.1,
          silent: true,
          shading: 'realistic',
          light: {
            main: {
              intensity: 1.5,
              shadow: true,
              shadowQuality: 'medium',
              alpha: 45
            },
            ambient: {
              intensity: 0
            },
          },
          postEffect: {
            enable: true,
            bloom: {
              enable: false
            },
            SSAO: {
              radius: 1,
              intensity: 1,
              enable: true
            },
            depthOfField: {
              enable: false,
              focalRange: 10,
              blurRadius: 10,
              fstop: 1
            }
          },
          temporalSuperSampling: {
            enable: true
          },
          instancing: true,
          // center: [(i[0] + j[0]) / 2, (i[1] + j[1]) / 2],
          center: this.center,
          roam: true,
          itemStyle: {
            color: '#323c48',
            // borderWidth: 1,
            // borderColor: '#999999',
          },
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              color: '#2a333d',
            }
          },
        },
        series
      }

      this.chart.setOption(opt, true)
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    },
    //** functions */
    getXY(x, y) {
      return {
        fromName: x,
        toName  : y,
        coords  : [this.getCoords(x), this.getCoords(y)],
      }
    },
    getCoords(x) {
      const o = _.find(this.airport, n => n.code === x)
      return [o.lon, o.lat]
    },
    getFlTime(x, y) {
      const [i, j] = [this.getCoords(x || this.ori), this.getCoords(y)]
      return Math.pow(Math.pow(i[0] - j[0], 2) + Math.pow([1] - j[1], 2), 0.5) / 5
    },
    getTau(x) {
      return _.find(this.routeData, n => _.includes(n.hub, x)).tau
    },
    convertData(y, x) {
      const t    = x || this.ori
      const from = this.getCoords(t)
      const to   = this.getCoords(y)
      return [{
        fromName: t,
        toName  : y,
        coords  : [from, to],
      }]
    },
    convertData3D(y, x) {
      const t    = x || this.ori
      const from = this.getCoords(t)
      const to   = this.getCoords(y)
      return [from, to]
    },
    onOpen(x) {
      window.open(x)
    },
  },
  watch: {
    hoverIx(to, from) {
      const e    = [this.routeData[to], this.routeData[from]]
      const name = []
      _.each(e, n => name.push(!n ? null : _.size(n.hub) ? _.join(n.hub, '->') : 'direct'))
      const series = _.map(this.chart.getOption().series, (n, i) => {
        if(!_.includes(name, n.name) || n.type !== 'lines') return n
        n.lineStyle.width       = name[0] === n.name ? 8 : 1.5 //** to: bolden, from: recover */
        n.lineStyle.shadowBlur  = name[0] === n.name ? 10 : 0 //** to: bolden, from: recover */
        n.lineStyle.shadowColor = name[0] === n.name ? 'white' : 'rgba(0, 0, 0, 0)' //** to: bolden, from: recover */
        return n
      })
      this.chart.setOption({ series })
    },
    refresh(to) {
      debounce(this.chart.resize, 200)()
    },
    view(to) {
      if(to === 2) return
      this.chart.clear()
      debounce(this[this.draw], 200)()
    },
    routeData(to) {
      this[this.draw](!this.map ? 'usa' : 'world')
    },
    map(to) {
      if(this.view === 2) return
      this[this.draw](!to ? 'usa' : 'world')
    }
  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.echartsWrapper)
      this[this.draw]()
    }, 1)
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
