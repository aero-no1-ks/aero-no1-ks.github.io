<template>
<v-layout row wrap class='pa-1'>
  <v-flex xs12 class='px-1'>
    <v-btn-toggle v-model='index' class='ma-0 pa-0' mandatory>
      <v-tooltip v-for='(x, i) in tooltipItems' :key='i' bottom color='primary'>
        <v-btn flat slot='activator'>
          {{ x.title }}
        </v-btn>
        <span>{{ x.description }}</span>
      </v-tooltip>
    </v-btn-toggle>
    <v-menu offset-y>
      <v-btn class='mx-2' slot='activator' color='primary' dark>
        Enlarge
      </v-btn>
      <v-list>
        <v-list-tile v-for='(x, i) in ["Shrink", ...desArrFull]' :key='i' @click='large = i - 1'>
          <v-list-tile-title>{{ x }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <v-btn class='mx-0' slot='activator' color='primary' dark>
        Top {{ slider }} travels
      </v-btn>
      <v-list>
        <v-list-tile v-for='i in cut' :key='i' @click='slider = i'>
          <v-list-tile-title>{{ i }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-flex>
  <v-flex xs12>
    <v-layout row wrap>
      <template v-for='(x, i) in items'>
        <v-flex :xs4='!isLarge(i)' :xs12='isLarge(i)' class='pa-1' :key='i' :style='setShow(i)'>
          <v-card dark>
            <app-map-pane :isArrival='1' :style='largeStyle(i)' :center='getCenter(center[i])' :items='x' :map='map' :large='large' :slider='slider' :xycor='xycor' />
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </v-flex>
  <!-- <v-flex xs4 class='pa-1'>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card style='position: relative; height: calc(50vh - 66px - 2px);'>
          <app-map-pane-connection-scatter :index='index' :items='items' :isRelative='isRelative' />

          <div style='position: absolute; left: 100px; top: 0px; font-size: 10px;'>
            <v-switch color='primary' label='Relative' v-model='isRelative' class='ma-0 pa-0' />
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class='py-1'>
      <v-flex xs12 class='py-1'>
        <v-card style='height: calc(25vh - 33px - 5px);'>
          <app-map-pane-connection-distribution :index='index' :items='items' />
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex> -->
</v-layout>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import MapPane from '@/components/shared/MapPane'

export default {
  data: () => ({
    index: 0,
    cut: 10,
    map: false,
    isRelative: false,
    large: -1,
    slider: 10,
    tooltipItems: [
      { title: 'Total', icon: 'looks_3', description: 'total rankings' },
      { title: 'From origin', icon: 'looks_one', description: 'direct flight' },
      { title: 'From hub', icon: 'looks_two', description: 'from hub (indirect flight)' },
    ]
  }),
  computed: {
    ...mapState(['desArr', 'dataDes', 'airport']),
    ...mapGetters(['desArrFull']),
    center() {
      return _.map(this.desArr, n => _.find(this.dataDes, o => n === o.ap))
    },
    prop() {
      return ['total', 'stopx', 'stopy'][this.index]
    },
    items() {
      return _.map(this.center, (n, i) => _.map(_.slice(n[this.prop], 0, this.slider), o => ({ ap: o.ap, tau: o.tau, ratio: _.round(o.tau / this.center[i].tau * 100, 2) })))
    },
    aps() {
      return _.uniq([...this.desArr, ..._.map(_.flattenDeep(this.items), 'ap')])
    },
    xycor() {
      const cor = _.map(this.aps, this.getCoords)
      const len = _.size(cor)
      return [_.sumBy(cor, 'lon') / len, _.sumBy(cor, 'lat') / len]
    }
  },
  methods: {
    isLarge(i) {
      return this.large === i
    },
    largeStyle(i) {
      return { height: this.isLarge(i) ? 'calc(100vh - 66px - 56px - 6px)' : 'calc(50vh - 66px - 2px)' }
    },
    setShow(i) {
      return { display: this.large === -1 || this.isLarge(i) ? '' : 'none' }
    },
    getCenter(x) {
      return { ap: x.ap, tau: x.tau }
    },
    getCoords(x) {
      const o = _.find(this.airport, n => n.code === x)
      return { lon: o.lon, lat: o.lat }
    },
  },
  components: {
    'app-map-pane': MapPane,
  }
}
</script>


<style lang='stylus'>

</style>
