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
      <v-toolbar-title class="title" v-text="this.$store.state.main.titlePage" />
      <v-spacer />
        <v-btn
          icon
          color="black"
          dark
          @click="openDialog()"
        >
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
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
      <span class="text-offline">Modo Offline</span>
      <span class="text-offline">Envíos pendientes: {{this.$store.state.main.isPending}}</span>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Información
        </v-card-title>
          
        <v-card-text>
          <div class="flex">
            <span>Conexión a internet:</span> <span>{{this.$store.state.main.isOnline?"SI":"NO"}}</span>
          </div>
          <div class="flex">
            <span>Envíos pendientes:</span> <span>{{this.$store.state.main.isPending}}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  head() {
      return {
        script: [
          {
            src: 'https://unpkg.com/localbase/dist/localbase.dev.js'
          }
        ],
      }
  },
  data () {
    return {
      dialog: false,
      clipped: false,
      fixed: false,
      items: [
        {
          title: 'Captura de datos',
          to: '/'
        },
        {
          title: 'Mi perfil',
          to: '/perfil'
        }
      ],
      miniVariant: false,
      right: true,
      left: true,
      leftDrawer: false,
      online: false
    }
  },
  mounted() {
    let db = new Localbase('workbox-background-sync')
    db.collection('requests').get().then(req => {
      this.$store.commit('main/updatePendingData',req.length)
    })

    this.online = navigator.onLine
    this.$store.commit('main/setData',this.online)
    self.addEventListener('online', ()=> {
      this.$store.commit('main/toOnline')
      db.collection('requests').get().then(req => {
        this.$store.commit('main/updatePendingData',req.length)
      })
    });
    self.addEventListener('offline',()=> {
      this.$store.commit('main/toOffline')
      db.collection('requests').get().then(req => {
        this.$store.commit('main/updatePendingData',req.length)
      })
    });
  },
  methods:{
    openDialog(){
      let db = new Localbase('workbox-background-sync')
      db.collection('requests').get().then(req => {
        this.$store.commit('main/updatePendingData',req.length)
      })
      this.dialog = true
    }
  }
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