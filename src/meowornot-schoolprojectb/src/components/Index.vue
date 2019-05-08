 <template>
  <div id='index'>
    <v-app>
    <router-view name="index"></router-view>
      <v-content>
        <v-container>
        <v-card flat tile> </v-card>
            <v-toolbar color="deep-purple darken-1 white--text">
              <v-btn @click="changeColor"> <font-awesome-icon icon="coffee"/> </v-btn>
              <v-toolbar-title>Meow or Not!</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn dark flat value="true"> <a href="#kitty-tour">Kitty tour</a></v-btn>
                <v-btn dark flat><a href="#ranking">Ranking</a></v-btn>
                <v-btn dark flat><a href="#upload">Upload</a></v-btn>
                <v-btn dark color="white--text" flat><a href="#sign-up">Sign Up</a></v-btn>
              </v-toolbar-items>    
              </v-toolbar>
            <v-layout align-center justify-center class="color-purple">
                <v-btn color="pink lighten-4 grey--text text--darken-4
                " large @click="loadNextImage" class="mt-3">
                    Another Kitty &nbsp;  <v-icon>refresh</v-icon>
                </v-btn>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12 >
                <v-card flat tile class="d-flex" style="background-color:#474747">
                    <v-img height="650px" :src="image.url" tile="true">
                    </v-img>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
      </v-content>
    </v-app>
   </div>
  </template>

  <script>
    import Vue from 'vue';
    import Vuetify from 'vuetify'
    import axios from 'axios'

    Vue.use(axios);
    Vue.use(Vuetify);
   export default { 
        data: () =>({
            image: { url: ""}
        }),
        created(){
            this.loadNextImage();
        } ,
        methods:{
            async loadNextImage()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key

                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } ) // Ask for 1 Image, at full resolution
                    
                    this.image = response.data[0] // the response is an Array, so just use the first item as the Image

                    console.log("-- Image from TheCatAPI.com")
                    console.log("id:", this.image.id)
                    console.log("url:", this.image.url)

                }catch(err){
                    console.log(err)
                }
            },
            changeColor(){
                document.getElementsByClassName('container')[0].style.backgroundColor = "white";
                document.getElementsByClassName('container')[0].style.color = "black";
                document.getElementsByClassName('color-purple')[0].style.backgroundColor = "#999";
                document.getElementsByClassName('v-toolbar__content')[0].style.backgroundColor = "darkred";
            }
        }
    }
    
  </script>
<style scoped>
    body{
        background-color:grey;
        }
    .container{
        min-width: 100%;
        min-height: 100%;
        background-size:cover;
        background-color:#333;
    }
    .v-content_wrap{
        background:#357;
    }
    .v-responsive__content{
        border-top:15px solid #0a0e2c;;
        border-bottom:15px solid #0a0e2c;;
        border-left:15px solid #5E35B1;
        border-right:15px solid #5E35B1;
        border-bottom-right-radius:20px;
        border-bottom-left-radius:20px;
    }
    .rounded-card{
       height:100%;
    }
    .color-purple{
        background-color:#0a0e2c;
    }
    .v-image__image{
        border-radius:50px;
    }
 a {
  background: linear-gradient(to bottom, var(--mainColor) 0%, var(--mainColor) 100%);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 3px 3px;
    color: #fff;
    text-decoration: none;
}

a:hover {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
  background-position: 0 100%;
  background-size: auto 6px;
  background-repeat: repeat-x;
  text-decoration: none;
}
</style>
