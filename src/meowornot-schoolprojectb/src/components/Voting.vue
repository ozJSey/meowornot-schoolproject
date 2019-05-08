<template>
    <div id="kitty-tour">        <router-view name="voting"></router-view>

    <v-app>
      <v-content>
        <v-container>
              <v-card flat tile> </v-card>
            <v-toolbar color="deep-purple darken-1 white--text">
              <v-btn @click="changeColor"><font-awesome-icon icon="coffee"/> </v-btn>
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
                    <v-btn color="pink lighten-4 grey--text text--darken-4 large" @click="voteUp" >
                        <v-icon>thumb_up</v-icon>&nbsp; Meow</v-btn>
                            <v-btn flat icon color="pink">
                              <v-icon>favorite</v-icon>
                            </v-btn>
                                <v-btn flat icon color="pink" @click="voteDown">
                                  <v-icon>thumb_down</v-icon>
                                </v-btn>
              
                
                </v-layout>
            
            <v-layout justify-center>
                
        <v-flex xs12 sm6 md3>
            <v-text-field 
              label="Enter your username here :"
              placeholder=""
              v-model="sub_id"
            ></v-text-field>
          </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12 >
                <v-card flat tile class="d-flex">
                    <v-img height="500px" :src="image.url" aspect-ratio="1">
                    </v-img>
                </v-card>
                </v-flex>
            </v-layout>


            <v-layout row wrap>
                <v-flex xs12 >
  <v-data-table
  :headers="headers"
  :items="votes"
  class="elevation-1"
  color="white"
  dark
>
  <template slot="items" slot-scope="props">
    <td>{{ props.item.created_at }}</td>
    <td class="text-xs-left">{{ props.item.image_id }}</td>
    <td class="text-xs-left">{{ props.item.value }}</td>
    <td>{{ props.item.sub_id }}</td>
    <td>{{ props.item.country_code }}</td>
  </template>
</v-data-table>

</v-flex>
</v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>


<script>
export default {
    data: ()=>({
          sub_id: "",
          image:{},
          votes:[],
          headers: [
            { text: 'date' },
            { text: 'image_id' },
            { text: 'value' },
            { text: 'sub_id' },
            { text: 'country' }
          ],
        }),
        created(){
            this.getImage();
            this.getVotes();
        } ,
        methods:{
            async getImage()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key, as it's set to defaults it will be used from now onwards

                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } ) // Ask for 1 Image, at full resolution
                    
                    this.image = response.data[0] // the response is an Array, so just use the first item as the Image

                    console.log("-- Image from TheCatAPI.com")
                    console.log("id:", this.image.id)
                    console.log("url:", this.image.url)

                }catch(err){
                    console.log(err)
                }
            },
            async voteUp(){
              let body = {
                  image_id: this.image.id,
                  sub_id: this.sub_id,
                  value: 1 // Voting up (you like it) so send 1
              }
              let response = await axios.post('https://api.thecatapi.com/v1/votes', body ) // Send the body to create a Vote in your Account
                    
              await this.getImage();
              await this.getVotes();
            },
            async voteDown(){

              let body = {
                  image_id: this.image.id,
                  sub_id: this.sub_id,
                  value: 0 // Voting down (you don't like) so send 0
              }
              let response = await axios.post('https://api.thecatapi.com/v1/votes', body ) // Send the body to create a Vote in your Account
                    
              await this.getImage();
              await this.getVotes();
            },
            async getVotes()
            {

              let response = await axios.get('https://api.thecatapi.com/v1/votes', { params: { order:"DESC", limit:25 } } ) // Get the last 25 votes
              
              response.data.forEach(element => {
                //element.created_at = new Date(element.created_at).toString();// full time string including timezone
                element.created_at = new Date(element.created_at).toJSON().slice(0,10)// just use the date for now
              });

              this.votes = response.data;
            },
            changeColor(){
                document.getElementsByClassName('container')[4].style.backgroundColor = "white";
                document.getElementsByClassName('container')[4].style.color = "black";
                document.getElementsByClassName('v-toolbar__content')[4].style.backgroundColor = "darkred";

                for(let i = 0 ; i < 26 ; i++){
                  document.getElementsByTagName('td')[i].style.backgroundColor = "white";
                  document.getElementsByTagName('td')[i].style.color = "black";
                  

                }

            }
        }
    }

</script>

<style>
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
