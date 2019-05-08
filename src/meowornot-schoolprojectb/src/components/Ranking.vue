<template>
  <div id='ranking'>
    <router-view name="ranking"></router-view>
     <v-app>
      <v-content>
        <v-container dark>
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

            <v-layout align-center justify-center dark>

            <v-flex xs6>
                <v-select :items="breeds"
                        item-text="name"
                        v-model="selected_breed"
                        label="Breeds"
                        return-object
                        attach></v-select>
            </v-flex>
             
            </v-layout>


            <v-layout  id="rankingL">
                <v-flex xs12 sm8 offset-sm2>
                  <v-card>

  <v-carousel>
      <v-carousel-item
        v-for="(item,i) in images"
        :key="i"
        :src="item.url"
      ></v-carousel-item>
    </v-carousel>

            
                    <v-card-title primary-title>

                    <div class="text-xs-center">
                        <v-chip>
                                <v-avatar>
                                  <img :src="country_flag_url" :alt="selected_breed.country_code">
                                </v-avatar>
                        {{selected_breed.origin}}</v-chip>
                        <v-chip v-if="selected_breed.experimental==1">Experimental</v-chip>
                        <v-chip v-if="selected_breed.rex==1">Rex</v-chip>
                        <v-chip v-if="selected_breed.natural==1">Natural</v-chip>
                        <v-chip v-if="selected_breed.rare==1">Rare</v-chip>
                        <v-chip v-if="selected_breed.hairless==1">Hairless</v-chip>
                        <v-chip v-if="selected_breed.suppressed_tail==1">Suppressed Tail</v-chip>
                        <v-chip v-if="selected_breed.short_legs==1">Short Legs</v-chip>
                        <v-chip v-if="selected_breed.hypoallergenic==1">Hypoallergenic</v-chip>
                    </div>
                      <div>
                        <h3 class="headline mb-0">{{selected_breed.name}}</h3>
                        <div>{{selected_breed.description}}</div>
                        <div>---</div>
                        <div><i>{{selected_breed.temperament}}</i></div>
                      </div>
                    </v-card-title>


                        <v-list dark>
                                <v-list-tile>
                      
                                  <v-list-tile-content>
                                    
                            Affection Level
                                  </v-list-tile-content>
                                            <v-rating
                                          v-model="selected_breed.affection_level "
                                          readonly
                                          size="18"
                                        ></v-rating>
                                </v-list-tile>
                      
                                <v-list-tile>
                                  <v-list-tile-content>
                                        Adaptability
                                  </v-list-tile-content>
                                            <v-rating
                                        v-model="selected_breed.adaptability "
                                        readonly
                                        size="18"
                                      ></v-rating>
                                </v-list-tile>
                      
                                <v-list-tile>
                                <v-list-tile-content>
                                        Child Friendly
                                </v-list-tile-content>
                    
                                
                                        <v-rating
                                        v-model="selected_breed.child_friendly "
                                        readonly
                                        size="18"
                                    ></v-rating>
                                </v-list-tile>

                                <v-list-tile>
                                <v-list-tile-content>
                                        Dog Friendly
                                </v-list-tile-content>
                    
                                
                                        <v-rating
                                        v-model="selected_breed.dog_friendly "
                                        readonly
                                        size="18"
                                    ></v-rating>
                                </v-list-tile>
                                
                                <v-list-tile>
                                        <v-list-tile-content>
                                                Energy Level
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.energy_level "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>

                                <v-list-tile>
                                        <v-list-tile-content>
                                                Grooming
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.grooming "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>
                                
                                <v-list-tile>
                                        <v-list-tile-content>
                                                Health Issues
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.health_issues "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>

                                <v-list-tile>
                                        <v-list-tile-content>
                                                Intelligence
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.intelligence "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>
                                
                                <v-list-tile>
                                        <v-list-tile-content>
                                            Shedding Level
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.shedding_level "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>
                                
                                <v-list-tile>
                                        <v-list-tile-content>
                                                Social Needs
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.social_needs "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>
                                  
                                <v-list-tile>
                                        <v-list-tile-content>
                                                Stranger Friendly
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.stranger_friendly "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>    
                                
                                <v-list-tile>
                                        <v-list-tile-content>
                                                Vocalisation
                                        </v-list-tile-content>
                                                                <v-rating
                                                v-model="selected_breed.vocalisation "
                                                readonly
                                                size="18"
                                            ></v-rating>
                                        </v-list-tile>  
                                            
                              </v-list>

                    <v-card-actions id="rankingV" justify-center color="#0a0e2c">
                      <v-btn dark :href="selected_breed.wikipedia_url" flat target="_blank" color="grey">Wikipedia</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuetify);
Vue.use(axios);
Vue.use(Vuex);

export default {
     data: ()=>({
          country_flag_url:"",
          images: [],
          breeds:[],
          selected_breed: {},
          current_image: {}
        }),
        created(){
            this.getBreeds();
        } ,
        watch: {
           
            selected_breed: function()
            {
                console.log(this.selected_breed)

                let country_code = this.selected_breed.country_code.toLowerCase();

                this.country_flag_url = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${country_code}.svg`;
                this.getImages();
            }
        },
        methods:{

            async getBreeds()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key, as it's set to defaults it will be used from now onwards
                    
                    let response = await axios.get('https://api.thecatapi.com/v1/breeds/' ) 
                    this.breeds = response.data;
                    console.log("-- ("+this.breeds.length +") Breeds from TheCatAPI.com")
                    
                    // pick one to display initially
                    this.selected_breed = this.breeds[10]
                }catch(err){
                    console.log(err)
                }
            },
            async getImages()
            {
                try{
                    
                    let query_params = {
                        breed_ids: this.selected_breed.id,
                        limit:8
                    }

                    let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: query_params} ) 
                    
                    this.pagination_count = response.headers['pagination-count'];
                    this.images = response.data 
                    this.current_image = this.images[0]

                    

                    console.log("-- ("+this.images.length +") Images from TheCatAPI.com")
                    console.log( this.pagination_count ,'images available for this query.')
                    
                }catch(err){
                    console.log(err)
                }
            },
            changeColor(){
                document.getElementsByClassName('container')[1].style.backgroundColor = "white";
                document.getElementsByClassName('container')[1].style.color = "black";
                document.getElementsByClassName('color-purple')[1].style.backgroundColor = "#999";
                document.getElementsByClassName('v-toolbar__content')[1].style.backgroundColor = "darkred";
                document.getElementById('rankingL').style.backgroundColor = "lightgrey";
                 document.getElementById('rankingV').style.backgroundColor = "darkRed";

            }
            
        }
    }

</script>

<style scoped>
body{
    margin-top:0;
}
.layout{
    background-color:#0a0e2c;
}
.v-card__actions {
    align-items: center;
    display: flex;
    padding: 8px;
    background-color: #5E35B1;
}
.justify-center {
    justify-content: center;
    color: white;
    background-color: #aaa;
}
body{
    background-color:grey;
    }
td{
  border-bottom:15px solid #0a0e2c;
  background-color:#5E35B1;
  color:white;
}
th{
  background-color:#0a0e2c;
  padding-top:50px;
  color:white;
}
.theme--dark.v-datatable .v-datatable__actions {
    background-color: #0a0e2c;
    color: white;
    border-bottom-left-radius:15px;
    border-bottom-right-radius:15px;
}
.container{
    min-width: 100%;
    min-height: 100%;
    background-size:cover;
    background-color:#474747;
}
.v-content__wrap{
    background-color:#999;
}
.v-responsive__content{
    border-top:15px solid #0a0e2c;;
    border-bottom:15px solid #0a0e2c;
    border-left:15px solid #5E35B1;
    border-right:15px solid #5E35B1;
    background-color:#999;
    z-index:-2;
    padding-bottom:100px;
}
.rounded-card{
   height:50%;
}
.color-purple{
    background-color:#0a0e2c;
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
