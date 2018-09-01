<template>
  <v-app>
    <v-navigation-drawer temporary v-model='drawer' fixed app>
      <v-list>
        <v-list-tile value="true" v-for="(item, i) in items" :key="i" :to='item.to'>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-content>
      <v-slide-y-reverse-transition mode='out-in'>
        <router-view class='pa-2' />
      </v-slide-y-reverse-transition>
    </v-content>

    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
    drawer: false,
    items: [{
      icon: 'bubble_chart',
      title: 'Inspire',
      to: '/helloword',
    }, {
      icon: 'bubble_chart',
      title: 'Inspire',
      to: '/',
    }],
  }),
  watch: {
    '$route'(to, from) {
      localStorage.setItem('route', to.path)
    }
  },
  created() {
    if(!localStorage.getItem('route')) {
      this.$router.push('/')
      return localStorage.setItem('route', '/')
    }
    this.$router.push(localStorage.getItem('route'))
  }
}
</script>
