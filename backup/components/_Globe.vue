<template>
<div ref='container' style='width: 100%; height: 100%;' />
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    chart: null,
    ori: '',
    des: '',
    slider: 2,
    color: ['#EC407A', '#AB47BC', '#42A5F5','#4DB6AC', '#66BB6A', '#FFEE58','#FFA726', '#A1887F', '#BDBDBD'],
  }),
  computed: {
    ...mapState(['airport']),
    route() {
      return _.find(chartData, n => n.info.ori === this.ori && n.info.des === this.des)
    },
    routeData() {
      return !this.route ? [] : _.filter([...this.route.data.major, ...this.route.data.minor], n => n.ratio >= (this.slider / 100))
    },
    tau() {
      return this.route.info.tau
    },
  },
  methods: {
    drawChart() {
      const series = []
      _.each(this.routeData, (n, i) => {
        //** direct path */
        if(!_.size(n.hub)) {
          const name = `${ this.ori }->${ this.des }`
          series.push({
            name,
            type: 'lines3D',
            coordinateSystem: 'globe',
            blendMode: 'source-over',
            effect: {
              show: true,
            },
            lineStyle: {
              width: 3,
              color: this.$vuetify.theme.primary,
              opacity: 0.3
            },
            data: [{
              coords: [this.getCoords(this.ori), this.getCoords(this.des)],
              value: 10,
            }]
          })
        } else {
          //** indirect path */
          const name = `${ this.ori }->${ _.join(n.hub, '->') }->${ this.des }`
          const obj  = {
            name,
            type: 'lines3D',
            coordinateSystem: 'globe',
            blendMode: 'souce-over',
            effect: {
              show: true,
            },
            lineStyle: {
              width: 3,
              color: this.color[i],
              opacity: 0.3
            },
            data: _.map([...n.hub, this.des], (o, j) => this.convertData3D(o, !j ? this.ori : n.hub[j - 1]))
          }
          series.push(obj)
        }
      })

      this.chart.setOption({
        backgroundColor: '#000',
        globe: {
          baseTexture: './assets/img/world.topo.bathy.200401.jpg',
          heightTexture: './assets/img/world.topo.bathy.200401.jpg',
          displacementScale: 0.01,
          // shading: 'realistic',
          environment: './assets/img/starfield.jpg',
          realisticMaterial: {
            roughness: 0.9,
          },
          postEffect: {
            enable: true,
          },
          light: {
            // main: {
            //   intensity: 5,
            //   shadow: true
            // },
            ambient: {
              intensity: 2,
            },
            // ambientCubemap: {
            //   texture: './assets/img/pisa.hdr',
            //   diffuseIntensity: 0.2
            // }
          },
          viewControl: {
            autoRotate: false
          }
        },
        series,
        // : {
        //   type: 'lines3D',
        //   coordinateSystem: 'globe',
        //   blendMode: 'source-over',
        //   effect: {
        //     show: true,
        //   },
        //   lineStyle: {
        //     width: 2,
        //     color: this.$vuetify.theme.primary,
        //     opacity: 0.3
        //   },
        //   data: [{
        //     coords: [this.getCoords('ATL'), this.getCoords('LAX')],
        //     value: 10,
        //     name: 'ATL-LAX',
        //   }]
        // }
      })
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
    convertData3D(y, x) {
      const t    = x || this.ori
      const from = this.getCoords(t)
      const to   = this.getCoords(y)
      return { coords: [from, to], value: 10 }
    },
  },
  beforeMount() {
    this.$root.$emit('getODPair', res => {
      this.ori = res.ori
      this.des = res.des
      this.slider = res.slider
    })
  },
  mounted() {
    _.delay(() => {
      this.chart = echarts.init(this.$refs.container)
      this.drawChart()
      window.addEventListener('resize', debounce(this.chart.resize, 200))
    }, 1)
  }
}
</script>

<style>

</style>
