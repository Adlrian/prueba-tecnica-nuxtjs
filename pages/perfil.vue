<template>
  <v-row>
    <v-col class="text-center">
      <v-avatar
      size="120px"
      class="mb-4 border-gray mt-10"
      >
      <v-img
        src="imgphoto.jpg"
      ></v-img>
      </v-avatar>
      <br>
      <span class="font-weight-bold title text-black">{{this.name}}</span>

      <div class="flex mt-2">
        <v-icon color="white" size="0.9rem" class="box-black-2 mr-5" >mdi-linkedin</v-icon>
        <v-icon color="white" size="0.88rem" class="box-black mr-5">mdi-twitter</v-icon>
        <v-icon color="black" size="1.7rem">mdi-facebook</v-icon>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
      name: null,
      title: 'MI PERFIL'
  }),
  async mounted() {
    this.$store.commit('main/setTitlePage',this.title)
  },
  async created() {    
    if(navigator.onLine){
      var profile = await this.$axios.$get(`https://jsonplaceholder.typicode.com/users/1/`)
      this.name = profile.name;
    }
  }
}
</script>
<style>
.box-black{
  background-color: black;
  border-radius: 50%;
  padding: 4.5px;
}
.box-black-2{
  background-color: black;
  border-radius: 50%;
  padding: 4px;
}
.border-gray{
  border: 3px solid #d4d4d4;
}
</style>