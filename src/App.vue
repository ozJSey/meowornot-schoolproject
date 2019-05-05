<template>
  <v-app>
    <v-content>
      <Index></Index>
    </v-content>
    <v-content>
      <Ranking></Ranking>
    </v-content>
    <v-content>
      <Upload></Upload>
    </v-content>
    <v-content>
      <Signup></Signup>
    </v-content>
     <v-content>
      <Voting></Voting>
    </v-content>
  </v-app>
</template>

<script>
import Index from './components/Index'
import Ranking from './components/Ranking'
import Upload from './components/Upload'
import Signup from './components/Signup'
import Voting from './components/Voting'

export default {
  name: 'App',
  components: {
    Index,
    Ranking,
    Upload,
    Signup,
    Voting
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>

.container .container-wrap{
  background-color:#333!important;
}

</style>
