<template>
<v-layout row wrap class='pa-1'>
  <template v-for='(x, i) in items'>
    <v-flex :xs8='!large[i]' :xs12='large[i]' class='pa-1' d-flex :key='i'>
      <v-card dark style='position: relative;'>
        <v-layout row class='subheading pa-2'>
          <v-flex style='max-width: 350px;'>
            <v-icon class='subheading bold vertical-middle mr-1'>public</v-icon>
            <span class='bold'>{{ flight[i] }} Arrival to {{ ap.ap }}</span>
          </v-flex>
          <v-flex style='max-width: 100px;'>
            <v-switch class='pa-0 ma-0' color='primary' hide-details label='Hide' v-model='hide[i]' />
          </v-flex>
          <v-flex>
            <v-switch class='pa-0 ma-0' color='primary' hide-details label='Enlarge' v-model='large[i]' />
          </v-flex>
        </v-layout>
        <v-divider />
        <v-slide-y-transition>
          <app-map-pane-arrival v-show='!hide[i]' :style='largeStyle(i)' :ap='ap' :item='x' :map='map' :large='large[i]' :slider='slider[i]' />
        </v-slide-y-transition>

        <v-slide-y-transition>
          <div v-show='!hide[i]' style='position: absolute; bottom: 5px; left: 10px;'>
            <v-slider v-model='slider[i]' :label='`Max. # of APs: ${ slider[i] }`' :thumb-size='25' always-dirty :max='cut' min='1' hide-details style='margin-top: 0px' />
          </div>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
    <v-flex v-if='!large[i]' xs4 class='pa-1' d-flex>
      <v-card dark class='text-xs-center'>
        <div class='subheading pa-2'>
          <v-icon class='subheading bold vertical-middle mr-1'>navigation</v-icon>
          <span class='bold'>Top {{ cut }} Origin 'TO' {{ ap.ap }} ({{ flight[i] }})</span>
        </div>
        <v-divider />
        <v-slide-y-transition>
          <v-data-table v-show='!hide[i]' :headers='getHeaders(flight[i])' :items='x' hide-actions disable-initial-sort>
            <template slot='items' slot-scope='props'>
              <td class='text-xs-center' style='cursor: pointer' @click='onClick(props, i)' :style='selectedStyle(props)'>{{ props.item.ap }}</td>
              <td class='text-xs-center' style='cursor: pointer' @click='onClick(props, i)' :style='selectedStyle(props)'>{{ props.item.tau }}</td>
              <td class='text-xs-center' style='cursor: pointer' @click='onClick(props, i)' :style='selectedStyle(props)'>{{ props.item.ratio }}</td>
            </template>
          </v-data-table>
        </v-slide-y-transition>
      </v-card>
    </v-flex>

    <!-- -->
    <v-slide-y-transition>
      <v-layout v-if='showHub[i]'>
        <v-flex :xs8='!largeHub[i]' :xs12='largeHub[i]' class='pa-1' d-flex>
          <v-card dark style='position: relative;'>
            <v-layout row class='subheading pa-2'>
              <v-flex style='max-width: 350px;'>
                <v-icon class='subheading bold vertical-middle mr-1'>public</v-icon>
                <span class='bold'>Top 10 Destinations of {{ hub.ap }}</span>
              </v-flex>
              <v-flex>
                <v-switch class='pa-0 ma-0' color='primary' hide-details label='Enlarge' v-model='largeHub[i]' />
              </v-flex>
            </v-layout>
            <v-divider />
            <app-map-pane-intermediate :style='largeStyleHub(i)' :ap='ap' :hub='hub' :map='map' :large='largeHub[i]' :slider='sliderHub[i]' />
            <div style='position: absolute; bottom: 5px; left: 10px;'>
              <v-slider v-model='sliderHub[i]' :label='`Max. # of APs: ${ sliderHub[i] }`' :thumb-size='25' always-dirty :max='cut' min='1' hide-details style='margin-top: 0px' />
            </div>
          </v-card>
        </v-flex>
        <v-flex v-if='!largeHub[i]' xs4 class='pa-1' d-flex>
          <v-card dark class='text-xs-center'>
            <div class='subheading pa-2'>
              <v-icon class='subheading bold vertical-middle mr-1'>navigation</v-icon>
              <span class='bold'>Top {{ cut }} Arrivals 'TO' {{ hub.ap }}</span>
            </div>
            <v-divider />
            <v-data-table :headers='getHeaders("Total")' :items='hubItem' hide-actions disable-initial-sort>
              <template slot='items' slot-scope='props' style='cursor: pointer'>
                <td class='text-xs-center'>{{ props.item.ap }}</td>
                <td class='text-xs-center'>{{ props.item.tau }}</td>
                <td class='text-xs-center'>{{ props.item.ratio }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </template>
</v-layout>
</template>


<script>
import { mapState } from 'vuex'
import MapPaneArrival      from '@/components/shared/MapPaneArrival'
import MapPaneIntermediate from '@/components/shared/MapPaneArrivalIntermediate'

export default {
  data: () => ({
    apIx: 0,
    ix: 0,
    cut: 10,
    map: false,
    center: '',
    sw: false,
    selected: -1,
    hide: [false, false, false],
    large: [false, false, false],
    slider: [10, 10, 10],
    flight: ['Direct', 'Indirect', 'Total'],
    hub: {
      ap: '',
      tau: 0,
    },
    showHub: [false, false, false],
    largeHub: [false, false, false],
    sliderHub: [10, 10, 10],
  }),
  computed: {
    ...mapState(['ori']),
    ap() {
      return datasetDes[this.apIx]
    },
    items() {
      const x = datasetDes[this.apIx]
      return [
       _.slice(_.map(x.stopx, n => ({ ap: n.ap, tau: n.tau, ratio: `${ _.round(n.tau / x.tau * 100, 2) }%` })), 0, this.cut),
       _.slice(_.map(x.stopy, n => ({ ap: n.ap, tau: n.tau, ratio: `${ _.round(n.tau / x.tau * 100, 2) }%` })), 0, this.cut),
       _.slice(_.map(x.total, n => ({ ap: n.ap, tau: n.tau, ratio: `${ _.round(n.tau / x.tau * 100, 2) }%` })), 0, this.cut),
      ]
    },
    hubItem() {
      if(this.hub.ap === '') return []
      const x = _.find(datasetDes, n => n.ap === this.hub.ap)
      return _.slice(_.compact(_.map(x.total, n => {
        if(n.ap === this.ap.ap) return null
        return { ap: n.ap, tau: n.tau, ratio: `${ _.round(n.tau / x.tau * 100, 2) }%` }
      })), 0, this.cut)
    }
  },
  methods: {
    onHide(i) {
      this.hide.splice(i, 1, !this.hide[i])
    },
    largeStyle(i) {
      return { height: this.large[i] ? 'calc(100vh - 66px - 56px)' : !this.hide[i] ? 'calc(50vh - 33px - 28px - 24px)' : 0 }
    },
    largeStyleHub(i) {
      return { height: this.largeHub[i] ? 'calc(100vh - 66px - 56px)' : 'calc(50vh - 33px - 28px - 24px)' }
    },
    getHeaders(text) {
      return [
        { text, value: 'ap', sortable: false, align: 'center' },
        { text: 'Volume', value: 'tau', sortable: false, align: 'center' },
        { text: 'Ratio', value: 'ratio', sortable: false, align: 'center' },
      ]
    },
    onClick(x, i) {
      if(this.hub.ap === x.item.ap) {
        this.showHub.splice(i, 1, false)
        return _.delay(() => this.hub = { ap: '', tau: 0 }, 300)
      }

      this.hub = { ap: x.item.ap, tau: x.item.tau }
      this.showHub.splice(i, 1, true)
    },
    selectedStyle(x) {
      return this.hub.ap !== x.item.ap ? {} : {
        background: this.$vuetify.theme.primary
      }
    },
    updateIx(x) {
      const ix = _.findIndex(datasetDes, n => n.ap === x)
      if(ix >= 0) this.apIx = ix
    }
  },
  watch: {
    ori(to) {
      this.updateIx(to)
    },
  },
  created() {
    this.updateIx(this.ori)
  },
  components: {
    'app-map-pane-arrival'   : MapPaneArrival,
    'app-map-pane-intermediate': MapPaneIntermediate,
  }
}
</script>


<style lang='stylus'>
.v-input--selection-controls .v-input__slot
  margin-bottom: 0 !important

table.v-table thead tr:nth-child(1)
  height: 35px !important

table.v-table tbody td, table.v-table tbody th
  height: 28px !important

th, td
  padding: 0 12px !important
</style>
