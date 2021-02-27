<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      app
      dense
      absolute
      color="white"
    >
      <v-app-bar-nav-icon @click.stop="leftDrawer = !leftDrawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="leftDrawer"
      :left="left"
      temporary
      fixed
    >
      <v-list-item>
        <v-list-item-action>
          <v-btn
            icon
            @click.stop="leftDrawer = !leftDrawer"
          >
          <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="title">
            MENU
          </v-list-item-title>  
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <!-- <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action> -->
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <span class="text--disabled text-body-2">Version 0.1</span> <br>
          <span class="text--disabled text-body-2">Todos los derechos reservados</span>
        </div>
      </template>
    </v-navigation-drawer>
    <div class="box-offline" v-show="!this.$store.state.main.isOnline">
      <span class="text-offline">MODO OFFLINE</span>
      <span class="text-offline">PENDIENTES (0)</span>
    </div>
    <!-- <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Captura de datos',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Mi perfil',
          to: '/perfil'
        }
      ],
      miniVariant: false,
      right: true,
      left: true,
      leftDrawer: false,
      title: 'Vuetify.js',
      online: false
    }
  },
  mounted() {
    this.online = navigator.onLine
    this.$store.commit('main/setData',this.online)
    self.addEventListener('online', ()=> this.$store.commit('main/toOnline'));
    self.addEventListener('offline',()=> this.$store.commit('main/toOffline'));
    self.addEventListener('fetch',()=> console.log('laputamdre================'));

  },
}
</script>
<style>
  .box-offline{
    width: 100%;
    background-color: #b6ff20;
    position: fixed;
    top: 49px;
    display: flex;
    justify-content: space-between;
    padding: 2px 10px 2px 10px;
  }
  .text-offline{
    color: #656565;
    font-size: 0.8rem;
  }
</style>