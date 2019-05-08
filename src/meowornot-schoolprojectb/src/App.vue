<template>
  <v-app>
    <v-content>
      <Index></Index>
      <howtouse class="a-bit-higher"> </howtouse> </v-content>
     <v-btn color="pink lighten-5" @click="backToTop"> <font-awesome-icon icon="fa-cat"/> <i class="fas fa-cat"></i>Back to free roaming kitty advantures </v-btn>
    <v-content>
      <Ranking></Ranking>
    </v-content>
     <v-btn color="pink lighten-5" @click="backToTop"> <font-awesome-icon icon="arrow"/> Back to free roaming kitty advantures</v-btn>
    <v-content>
      <Upload></Upload>
    </v-content>
     <v-btn color="pink lighten-5" @click="backToTop"> <font-awesome-icon icon="arrow"/> Back to free roaming kitty advantures </v-btn>
    <v-content>
      <Signup></Signup>
    </v-content>
     <v-btn color="pink lighten-5" @click="backToTop"> <font-awesome-icon icon="arrow"/> Back to free roaming kitty advantures </v-btn>
     <v-content>
      <Voting></Voting>
    </v-content>
     <v-btn color="pink lighten-5" @click="backToTop"> <font-awesome-icon icon="arrow"/> Back to free roaming kitty advantures </v-btn>
  </v-app>
</template>

<script>
import Index from './components/Index'
import Ranking from './components/Ranking'
import Upload from './components/Upload'
import Signup from './components/Signup'
import Voting from './components/Voting'
import Howtouse from './components/Howtouse'
export default {
  name: 'App',
  components: {
    Index,
    Ranking,
    Upload,
    Signup,
    Voting,
    Howtouse
  },
  data () {
    return {
      //
    }
  },
  methods:{
    backToTop(){
      scrollTo(top);
    }
  },
}
</script>

<style>

.container .container-wrap{
  background-color:#333;
}
a{color:white !important}

.a-bit-higher{ position:absolute; top:850px; left:15px;}
</style>

<style>

