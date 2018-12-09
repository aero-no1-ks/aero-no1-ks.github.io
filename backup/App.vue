<template>
<v-app dark>
  <v-navigation-drawer id='appDrawer' temporary v-model='drawer' fixed app class='primary--text' width='250'>
    <v-toolbar color='primary darken-2' dark>
      <v-toolbar-title class='ma-0 pa-0'>
        <span class='hidden-sm-and-down'>Flight Analyzer</span>
      </v-toolbar-title>
    </v-toolbar>

    <vue-perfect-scrollbar class='drawer-menu--scroll' :settings='scrollSettings'>
      <v-list>
        <template v-for='(item, i) in menus'>
          <v-list-group v-if='item.items' v-model='item.active' :key='item.title' :prepend-icon='item.action || item.icon' no-action>
            <v-list-tile slot='activator'>
              <v-list-tile-content>
                <v-list-tile-title class='body-1'>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-for='(subItem, j) in item.items' :key='subItem.title' @click='onClick(item.icon, j)' ripple>
              <v-list-tile-content>
                <v-list-tile-title class='body-1'>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-subheader v-else-if='item.header' :key='i'>{{ item.header }}</v-subheader>

          <v-divider v-else-if='item.divider' :key='i'></v-divider>

          <v-list-tile v-else :to='item.to' ripple @click='item.onclick ? onClick(item.icon) : ""'>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class='body-1'>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>

      <v-card class='px-2 pt-2 mb-2'>
        <div>
          <h4 class='mb-1'>Threshold filter (%)</h4>
          <v-slider v-model='sliders' :thumb-size='25' always-dirty persistent-hint thumb-label='always' class='mt-4' />
        </div>
      </v-card>
    </vue-perfect-scrollbar>
  </v-navigation-drawer>

  <v-navigation-drawer temporary v-model='drawer2' right fixed app clipped class='primary--text pa-2' :width='vw'>
  </v-navigation-drawer>

  <v-toolbar app class='primary' dark>
    <v-tooltip color='primary' bottom>
      <v-toolbar-side-icon @click='drawer = !drawer' slot='activator' />
      <span>Hide/show left navigation drawer</span>
    </v-tooltip>

    <v-combobox v-show='!pathIndex' v-model='origin' :items='airportNameOri' class='ml-2 my-2' hide-details label='Select origin' prepend-inner-icon='flight_takeoff' />

    <v-combobox v-show='!pathIndex' v-model='destination' :items='airportNameDes' class='ml-3 my-2' hide-details label='Select destination' prepend-inner-icon='flight_land' />

    <v-combobox v-show='pathIndex === 1' v-model='selectedAP' :items='airportNameOri' class='ml-3 my-2' chips label='Select airports to analyze' hide-details multiple>
      <template slot='selection' slot-scope='{ item, index }'>
        <v-chip v-if='index < 4'>
          <span>{{ item }}</span>
        </v-chip>
        <span v-if='index === 4' class='white--text caption'>(+{{ selectedAP.length - 4 }} others)</span>
      </template>
    </v-combobox>

    <v-combobox v-show='pathIndex === 2' v-model='selectedAP' :items='airportNameDes' class='ml-3 my-2' chips label='Select airports to analyze' hide-details multiple>
      <template slot='selection' slot-scope='{ item, index }'>
        <v-chip v-if='index < 4'>
          <span>{{ item }}</span>
        </v-chip>
        <span v-if='index === 4' class='white--text caption'>(+{{ selectedAP.length - 4 }} others)</span>
      </template>
    </v-combobox>

    <v-combobox v-show='pathIndex === 3' v-model='selectedAP' :items='airportNameHub' class='ml-3 my-2' chips label='Select airports to analyze' hide-details multiple>
      <template slot='selection' slot-scope='{ item, index }'>
        <v-chip v-if='index < 4'>
          <span>{{ item }}</span>
        </v-chip>
        <span v-if='index === 4' class='white--text caption'>(+{{ selectedAP.length - 4 }} others)</span>
      </template>
    </v-combobox>

    <v-toolbar-items v-show='pathIndex'>
      <v-btn flat class='ml-4' @click='onDeselectAll'>
        <v-icon class='mr-1 subheading'>undo</v-icon>
        <span class='subheading'>Deselect All</span>
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <v-tooltip color='primary' bottom>
      <v-toolbar-side-icon @click='drawer2 = !drawer2' slot='activator' />
      <span>Hide/show right navigation drawer</span>
    </v-tooltip>
  </v-toolbar>

  <v-content class='grey lighten-1' style='overflow: hidden;'>
    <vue-perfect-scrollbar class='main--scroll' :settings='scrollSettings'>
      <router-view />
    </vue-perfect-scrollbar>
  </v-content>

  <v-snackbar v-model='snackbar' bottom right dark color='primary' :timeout='5000'>
    {{ snackText }}
  </v-snackbar>
</v-app>
</template>


<script>
import { mapState, mapGetters } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  data: () => ({
    drawer : false,
    drawer2: false,
    selectedAP: [],
    selectedAPDes: [],
    selectedAPHub: [],
    origin     : '',
    destination: '',
    perspectives: ['2D', '3D', 'Globe'],
    isFullscreen: false,
    sliders: 2,
    vw: null,
    scrollSettings: {
      maxScrollbarLength: 400
    },
    snackText: '',
    isVisited: [false, false, false, false],
    snackbar : false,
    isDashboard: '',
    pathIndex: 0,
    menus: [
      { header: 'Analysis 1: DB1B' },
      {
        title: 'Top-Level Summary',
        icon: 'equalizer',
        to: '/'
      }, {
        title: 'Departure (Origin)',
        icon: 'flight_takeoff',
        to: '/production'
      }, {
        title: 'Arrival (Destination)',
        icon: 'flight_land',
        to: '/attraction'
      }, {
        title: 'Connection (Hub)',
        icon: 'call_split',
        to: '/connection'
      },
      { divider: true },
      { header: 'Analysis 2: T-100' },
      {
        title: 'Top-Level Summary',
        icon: 'equalizer',
        // to: '/1'
      }, {
        title: 'Aircraft Breakdown',
        icon: 'flight_takeoff',
        // to: '/2'
      }, {
        title: 'LoadFactor',
        icon: 'flight_land',
        // to: '/'
      }, {
        title: 'Connection (Hub)',
        icon: 'call_split',
        // to: '/'
      },
      { divider: true },
      { header: 'Widgets' },
      {
        title: 'Map Projection',
        icon: 'layers',
        items: [
          { name: '2D',    title: '2D' },
          { name: '3D',    title: '3D' },
          { name: 'Globe', title: 'Globe' },
        ]
      }, {
        title: 'Data Source',
        icon: 'table_chart',
        onclick: true,
      }, {
        title: 'Toggle Map',
        icon: 'map',
        onclick: true,
      }, {
        title: 'Flip O/D',
        icon: 'compare_arrows',
        onclick: true,
      }, {
        title: 'Fullscreen',
        icon: 'zoom_out_map',
        onclick: true,
      }
    ],
  }),
  computed: {
    ...mapState(['airport', 'airportName', 'ori', 'des', 'color', 'dataHub']),
    ...mapGetters(['oriFull', 'desFull', 'hubArrFull', 'oriArrFull', 'desArrFull', 'airportNameOri', 'airportNameDes', 'airportNameHub']),
    icon() {
      return this.onSelectAllHub ? 'mdi-close-box' : this.onSelectSomeHub ? 'mdi-minus-box' : 'mdi-checkbox-blank-outline'
    },

  },
  methods: {
    onClick(x, i) {
      if(x === 'layers')         return this.onChangeView(i)
      if(x === 'table_chart')    return this.onSource()
      if(x === 'map')            return this.onMapChange()
      if(x === 'compare_arrows') return this.onFlip()
      if(x === 'zoom_out_map')   return this.onFullscreen()
    },
    setVW() {
      this.vw = _.min([window.innerWidth * 0.3, 420])
    },
    onFlip() {
      // [this.origin, this.destination] = [this.destination, this.origin]
      this.$store.commit('flip')
    },
    onUpdate(x, ori = true) {
      const ix = _.findIndex(this.airport, n => n.code === x)
      if(ori) this.ori = this.airportName[ix]
      else    this.des = this.airportName[ix]
    },
    onFullscreen() {
      if(this.isFullscreen) {
        if(document.exitFullscreen)            document.exitFullscreen()
        else if(document.mozCancelFullScreen)  document.mozCancelFullScreen()
        else if(document.webkitExitFullscreen) document.webkitExitFullscreen()
        else if(document.msExitFullscreen)     document.msExitFullscreen()
      } else {
        const e = document.documentElement
        if     (e.requestFullscreen)       e.requestFullscreen()
        else if(e.mozRequestFullScreen)    e.mozRequestFullScreen()
        else if(e.webkitRequestFullscreen) e.webkitRequestFullscreen()
        else if(e.msRequestFullscreen)     e.msRequestFullscreen()
      }
      this.drawer       = this.isFullscreen
      this.drawer2      = this.isFullscreen
      this.isFullscreen = !this.isFullscreen
    },
    onSource() {
      window.open('https://www.transtats.bts.gov/DatabaseInfo.asp?DB_ID=125')
    },
    onChangeView(i) {
      // if(i === 2) return this.$router.push('/globe')
      // if(i < 2) {
        this.$router.push('/')
        this.$root.$emit('onChangeView', i)
      // }
    },
    onMapChange() {
      this.$root.$emit('onMapChange')
    },
    showSnackbar() {
      this.snackbar = false
      const x = this.$router.currentRoute.path
      _.delay(() => {
        if(x === '/' && !this.isVisited[0]) {
          this.isVisited.splice(0, 1, true)
          this.snackText = 'This section shows top-level origin-destination pair data analytics.'
          this.snackbar  = true
        } else if(_.includes(['/production', '/attraction'], x) && !this.isVisited[1] && !this.isVisited[2]) {
          this.isVisited.splice(1, 1, true)
          this.isVisited.splice(2, 1, true)
          this.snackText = 'Click any airport in the right tables to see detail information for the airport.'
          this.snackbar  = true
        } else if(x === '/connection' && !this.isVisited[3]) {
          this.isVisited.splice(3, 1, true)
          this.snackText = 'Airport as a \'hub\': neither true origin nor true destination.'
          this.snackbar  = true
        }
      }, 250)
    },
    onDeselectAll() {
      this.selectedAP = []
    },
    setAirportNameArray() {
      if(this.pathIndex === 1) this.selectedAP = this.oriArrFull
      if(this.pathIndex === 2) this.selectedAP = this.desArrFull
      if(this.pathIndex === 3) this.selectedAP = this.hubArrFull
    }
  },
  watch: {
    '$route'(to) {
      this.showSnackbar()
      this.isDashboard = to.path === '/'

      this.pathIndex = _.indexOf(['/', '/production', '/attraction', '/connection'], to.path)

      this.setAirportNameArray()
    },
    origin(to) {
      if(this.oriFull === to) return
      this.$store.commit('setState', ['ori', to.slice(0, 3)])
    },
    destination(to) {
      if(this.desFull === to) return
      this.$store.commit('setState', ['des', to.slice(0, 3)])
    },
    oriFull(to) {
      if(this.origin === to) return
      this.origin = to
    },
    desFull(to) {
      if(this.destination === to) return
      this.destination = to
    },
    sliders(to) {
      this.$store.commit('setState', ['slider', to])
    },
    selectedAP: {
      deep: true,
      handler(to) {
        if(!this.pathIndex) return
        this.$store.commit('setState', [['', 'oriArr', 'desArr', 'hubArr'][this.pathIndex], _.map(to, n => n.slice(0, 3))])
      }
    },
  },
  created() {
    this.$vuetify.theme.primary = '#00BBD5'
    this.setVW()
    window.addEventListener('resize', debounce(this.setVW, 200))

    this.origin      = this.oriFull
    this.destination = this.desFull
    this.isDashboard = this.$router.currentRoute.path === '/'

    this.setAirportNameArray()
    this.showSnackbar()

  },
  beforeMount() {
    this.$root.$on('getODPair', fn => fn({
      ori: this.ori,
      des: this.des,
      slider: this.sliders,
    }))
  },
  components: {
    VuePerfectScrollbar,
  }
}

</script>


<style scoped lang='stylus'>
nav.v-toolbar
  padding-right: 0 !important

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 64px)
    overflow: auto

.main--scroll
  overflow: auto
  height: calc(100vh - 64px)

</style>


<style lang='stylus'>
.v-menu__content
  max-height: 90vh !important

.v-menu__content.menuable__content__active
  min-width: 450px !important
  max-width: 450px !important

div[role='combobox']
  min-width: 300px !important
  max-width: 300px !important

</style>
