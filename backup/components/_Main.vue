<template>
<v-layout row wrap class='pa-1' style='height: 100%; overflow: hidden;'>
  <v-flex :xs6='!large' :xs12='large' class='pa-1'>
    <v-card class='mb-2'>
      <v-layout row class='subheading pa-2 grey darken-1'>
        <v-flex style='max-width: 350px;'>
          <v-icon class='subheading bold vertical-middle mr-1'>public</v-icon>
          <span class='bold'>Flight Route Map</span> - {{ ori }} to {{ des }}
        </v-flex>
        <v-flex>
          <v-switch class='pa-0 ma-0' color='primary' hide-details label='Enlarge' v-model='large' />
        </v-flex>
      </v-layout>
      <v-divider />
      <Visualizer v-if='view < 2' :style='largeStyle' :map='map' :route='routeData' :tau='tau' :view='view' :refresh='large' :hoverIx='onHoverIx' />
      <Globe v-if='view === 2' :style='largeStyle' :refresh='large' />
    </v-card>

    <v-layout row>
      <v-flex xs6 class='elevation-2' style='overflow: hidden; height: calc(50vh + 24px - 64px - 16px - 49px)'>
        <vue-perfect-scrollbar style='overflow: auto; height: 100%' :settings='scrollSettings'>
          <v-card>
            <div class='subheading pa-2 grey darken-1'>
              <v-icon class='subheading bold vertical-middle mr-1'>apps</v-icon>
              <span class='bold'>Flight Route Detail</span> - {{ ori }} to {{ des }}
            </div>
            <v-divider />
            <v-layout row wrap class='pa-1'>
              <v-flex xs6 v-for='(x, i) in routeData' :key='i' class='pa-1' d-flex>
                <v-card class='body-1' @mouseenter='onHoverIx = i' @mouseleave='onHoverIx = -1'>
                  <div class='body-2 px-2 py-1 white--text' :style='hoverStyle(x, i)'>
                    <v-icon class='body-2 bold vertical-middle mr-1' color='white'>flight</v-icon>
                    <span class='bold'>{{ x.hub[0] || des + '(direct)' }}{{ x.hub[1] ? ' -> ' + x.hub[1] : ''  }}</span>
                  </div>
                  <v-divider class='mb-1' />
                  <p class='ma-0 px-2 py-0'>
                    <v-icon class='body-1 bold vertical-middle'>check</v-icon> airline: {{ x.grp ? 'major' : 'minor' }}
                  </p>
                  <p class='ma-0 px-2 py-0'>
                    <v-icon class='body-1 bold vertical-middle'>check</v-icon> demand: {{ x.tau }}
                  </p>
                  <p class='ma-0 px-2 pb-2'>
                    <v-icon class='body-1 bold vertical-middle'>check</v-icon> ratio: {{ round(x.tau / tau * 100, 2) }}%
                  </p>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </vue-perfect-scrollbar>
      </v-flex>
      <v-flex xs6 class='pl-2'>
        <v-card class='body-1'>
          <div class='subheading pa-2 grey darken-1'>
            <v-icon class='subheading bold vertical-middle mr-1'>bar_chart</v-icon>
            <span class='bold'>Route Breakdown</span> ({{ tau }})
          </div>
          <v-divider />
          <RouteBar :ori='ori' :des='des' :route='routeData' :tau='tau' :color='color' />
        </v-card>
      </v-flex>
    </v-layout>
  </v-flex>
  <v-flex xs3 class='pa-1' style='height: 100%'>
    <v-layout row wrap>
      <v-flex xs12 class='mb-1'>
        <v-card :style='oriDesHeight'>
          <div class='subheading pa-2 grey darken-1'>
            <v-icon class='subheading bold vertical-middle mr-1'>flight_takeoff</v-icon>
            <span class='bold'>Origin Summary - </span>{{ ori }}
          </div>
          <v-divider />
          <HubDistribution :ap='ori' />
        </v-card>
      </v-flex>
      <v-flex xs12 class='mt-1'>
        <v-card :style='oriDesHeight'>
          <div class='subheading pa-2 grey darken-1'>
            <v-icon class='subheading bold vertical-middle mr-1'>flight_land</v-icon>
            <span class='bold'>Destination Summary - </span>{{ des }}
          </div>
          <v-divider />
          <HubDistribution :ap='des' />
        </v-card>
      </v-flex>
    </v-layout>
    <!-- <vue-perfect-scrollbar style='overflow: auto; height: 100%;' :settings='scrollSettings'> -->
    <!-- </vue-perfect-scrollbar> -->
  </v-flex>
  <v-flex xs3 class='pa-1' style='overflow: hidden'>
    <!-- <vue-perfect-scrollbar style='overflow: auto; height: 100%;' :settings='scrollSettings'> -->
    <!-- </vue-perfect-scrollbar> -->
  </v-flex>
</v-layout>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import Visualizer      from '@/components/Visualizer'
import Globe           from '@/components/GlobeMap'
import HubDistribution from '@/components/HubDistribution'
import RouteBar        from '@/components/RouteBar'

export default {
  data: () => ({
    view: 0,
    map: false,
    slider: 2,
    scrollSettings: {
      maxScrollbarLength: 160
    },
    large: false,
    onHoverIx: -1,
  }),
  computed: {
    ...mapState(['airport', 'ori', 'des', 'color']),
    ...mapGetters(['oriFull', 'desFull', 'route', 'routeData', 'tau']),
    largeStyle() {
      return { height: this.large ? 'calc(100vh - 64px - 56px)' : 'calc(50vh - 24px)' }
    },
    oriDesHeight() {
      return { height: 'calc(50vh - 32px - 12px)' }
    }
  },
  methods: {
    round(x, i) {
      return _.round(x, i)
    },
    hoverStyle(x, i) {
      const background = _.size(x.hub) ? this.color[i] : this.$vuetify.theme.primary
      return { background }
    },
  },
  created() {
  },
  beforeMount() {
    this.$root.$on('onChangeView', i => this.view = i)
    this.$root.$on('onMapChange', () => this.map = !this.map)
    this.$root.$on('onSliderChange', x => this.slider = x)
  },
  mounted() {
    this.$root.$emit('onPairInitial', this.ori, this.des)
  },
  components: {
    Visualizer,
    Globe,
    HubDistribution,
    VuePerfectScrollbar,
    RouteBar,
  },
}
</script>


<style lang='stylus'>
.v-input--selection-controls .v-input__slot
  margin-bottom: 0 !important

</style>
