<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="mt-4 mb-5">
        <span class="font-weight-bold subtitle-1">Formulario</span>
        <p class="font-weight-regular body-2">Por favor complete el siguiente formulario</p>
      </div>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
          v-model="objForm.name"
          label="Nombres *"
          solo
          flat
          background-color="#eeeeee"
          required
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          v-model="objForm.address"
          label="Dirección"
          solo
          flat
          background-color="#eeeeee"
          hide-details="true"
          class="mb-7"
        ></v-text-field>

        <v-select
          v-model="objForm.gender"
          :items="genders"
          label="Género"
          flat
          solo
          background-color="#eeeeee"
          hide-details="true"
          class="mb-1"
        ></v-select>
        <span class="text-body-2">* Campos requeridos</span>
        <v-btn block
        class="pt-6 pb-6 btn-send mt-1"
        elevation="false"
        @click="btnSendData()"
        :loading="loading"
        :disabled="loading"
        >
          ENVIAR
        </v-btn>
      </v-form>
    </v-col>

    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
      title:'CAPTURA DE DATOS',
      loading: false,
      valid: true,
      genders: ['Masculino', 'Femenino'],
      snackbar: false,
      text: `Hello, I'm a snackbar`,
      nameRules: [
        v => !!v || 'El campo nombre es requerido'
      ],
      objForm: {
        name: "",
        address: null,
        gender: null
      },
      showMsgOffline: false,
  }),
  async mounted() {
    this.$store.commit('main/setTitlePage',this.title)
  },
  methods: {
    async btnSendData() {
      let db = new Localbase('workbox-background-sync')
      this.loading = true;
      this.text = "Ocurrió un error.";
      await this.validate();
      if(this.valid){
        try {
          let resp = await this.$axios.$put(`https://postman-echo.com/put`,this.objForm)
          if (resp.data) {
            this.text = "Se envió la data correctamente."
            this.snackbar = true;
          }
        } catch (error) {
          console.log("ERROR:"+error.message)
          db.collection('requests').get().then(req => {
            this.$store.commit('main/updatePendingData',req.length)
          })
          this.snackbar = true
        }
      }
      this.loading = false
      
    },
    async validate () {
        await this.$refs.form.validate()
    },
  },
}
</script>
<style>
  .btn-send{
   background-image: linear-gradient(to bottom right, #72edf2 5%, #6b73ff)
  }
  .btn-send span{
   color: white;
   font-size: 1rem!important;
   text-shadow: 0.5px 0.5px 1px #2f2f2f;
   font-weight: bold;
  }
</style>