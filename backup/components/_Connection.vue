<template>
<v-layout row wrap class='pa-1'>
  <v-flex xs12 class='px-1'>
    <v-btn-toggle v-model='isArrival' class='ma-0 pa-0' mandatory>
      <v-tooltip v-for='(x, i) in tooltipItems' :key='i' bottom color='primary'>
        <v-btn flat slot='activator'>
          <v-icon>{{ x.icon }}</v-icon>
        </v-btn>
        <span>{{ x.title }}</span>
      </v-tooltip>
    </v-btn-toggle>
    <v-menu offset-y>
      <v-btn class='mx-2' slot='activator' color='primary' dark>
        Enlarge
      </v-btn>
      <v-list>
        <v-list-tile v-for='(x, i) in ["Shrink", ...hubArrFull]' :key='i' @click='large = i - 1'>
          <v-list-tile-title>{{ x }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <v-btn class='mx-0' slot='activator' color='primary' dark>
        Top {{ slider }} segments
      </v-btn>
      <v-list>
        <v-list-tile v-for='i in cut' :key='i' @click='slider = i'>
          <v-list-tile-title>{{ i }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-btn class='mx-2' color='primary' dark @click='onSeeAltogether'>
      toggle integrated view
    </v-btn>
  </v-flex>
  <v-flex xs8>
    <v-slide-y-transition>
      <v-layout v-if='showAltogether'>
        <v-flex xs12 class='pa-1'>
          <v-card dark style='height: calc(100vh - 66px - 56px - 6px)'>
            <app-map-pane-integrated :isArrival='isArrival' :centers='centers' :items='items' :map='map' />
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <v-slide-y-transition>
      <v-layout v-if='true' row wrap>
        <template v-for='(x, i) in items'>
          <v-flex :xs6='!isLarge(i)' :xs12='isLarge(i)' class='pa-1' :key='i' :style='setShow(i)'>
            <v-card dark>
              <app-map-pane :isArrival='isArrival' :style='largeStyle(i)' :center='centers[i]' :items='x' :map='map' :large='large' :slider='slider' :xycor='xycor' />
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-slide-y-transition>
  </v-flex>
  <v-flex xs4 class='pa-1'>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card style='position: relative; height: calc(50vh - 66px - 2px);'>
          <app-map-pane-connection-scatter :isArrival='isArrival' :items='items' :isRelative='isRelative' />

          <div style='position: absolute; left: 100px; top: 0px; font-size: 10px;'>
            <v-switch color='primary' label='Relative' v-model='isRelative' class='ma-0 pa-0' />
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class='py-1'>
      <v-flex xs12 class='py-1'>
        <v-card style='height: calc(25vh - 33px - 5px);'>
          <app-map-pane-connection-distribution :isArrival='isArrival' :items='items' />
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
</v-layout>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import MapPane                       from '@/components/shared/MapPane'
import MapPaneIntegrated             from '@/components/shared/MapPaneIntegrated'
import MapPaneConnectionScatter      from '@/components/shared/MapPaneConnectionScatter'
import MapPaneConnectionDistribution from '@/components/shared/MapPaneConnectionDistribution'

export default {
  data: () => ({
    isArrival: 0,
    flight: ['Departure', 'Arrival'],
    cut: 10,
    map: false,
    isRelative: false,
    large: -1,
    slider: 10,
    tooltipItems: [
      { title: 'Departure', icon: 'flight_takeoff' },
      { title: 'Arrival', icon: 'flight_land' },
    ],
    showAltogether: false,
  }),
  computed: {
    ...mapState(['hubArr', 'dataHub', 'airport']),
    ...mapGetters(['hubArrFull']),
    index() {
      return this.isArrival ? 'bndIn' : 'bndOt'
    },
    center() {
      const el = _.map(this.hubArr, n => _.find(this.dataHub, o => n === o.ap))
      return _.map(el, n => ({
        ap   : n.ap,
        tau  : n.tau * 10,
        bndIn: _.map(_.slice(n.bndIn, 0, this.slider), o => ({ ap: o.ap, tau: o.tau * 10, ratio: _.round(o.tau / n.tau * 100, 2) })),
        bndOt: _.map(_.slice(n.bndOt, 0, this.slider), o => ({ ap: o.ap, tau: o.tau * 10, ratio: _.round(o.tau / n.tau * 100, 2) }))
      }))
    },
    centers() {
      return _.map(this.center, this.getCenter)
    },
    itemData() {
      return [_.map(this.center, 'bndOt'), _.map(this.center, 'bndIn')]
    },
    items() {
      return this.itemData[this.isArrival]
    },
    aps() {
      return _.uniq([...this.hubArr, ..._.map(_.flattenDeep(this.items), 'ap')])
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
    onSeeAltogether() {
      this.showAltogether = !this.showAltogether
    },
    getCoords(x) {
      const o = _.find(this.airport, n => n.code === x)
      return { lon: o.lon, lat: o.lat }
    },
  },
  created() {
  },
  mounted() {

  },
  components: {
    'app-map-pane'                        : MapPane,
    'app-map-pane-integrated'             : MapPaneIntegrated,
    'app-map-pane-connection-scatter'     : MapPaneConnectionScatter,
    'app-map-pane-connection-distribution': MapPaneConnectionDistribution,
  }
}
</script>


<style lang='stylus'>
</style>
