<template>
    <div>    
        <v-app>
            <v-content>
                    <v-card flat tile>
                        <v-toolbar color="deep-purple darken-1 white--text">
                          <v-toolbar-side-icon dark></v-toolbar-side-icon>
                          <v-toolbar-title>Meow or Not!</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-toolbar-items class="hidden-sm-and-down">
                            <v-btn dark flat value="true">Kitty tour</v-btn>
                            <v-btn dark flat>Ranking</v-btn>
                            <v-btn class="v-btn--active" dark>Upload</v-btn>
                            <v-btn dark color="white--text" flat>Sign Up</v-btn>
                          </v-toolbar-items>
                        </v-toolbar>
                    </v-card>   
                <v-container fluid>
                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                       
                    <v-img :src="image_url" height="300px" v-if="image_url" contain></v-img>

                        <v-text-field dark label="Select Image" @click='pickFile' v-model='image_name' prepend-icon='attach_file'></v-text-field>
                        <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                        >
                    </v-flex>
                    <v-layout align-center justify-center>
                        <v-btn v-show="!uploading" color="indigo" dark large @click="pickFile" >
                            Choose New Image &nbsp; <v-icon>upload</v-icon>
                        </v-btn>
                        <v-btn v-show="image_file && !uploading" color="blue" dark large @click="uploadFile" >
                            Upload &nbsp; <v-icon>upload</v-icon>
                        </v-btn>
                        <div v-show="uploading">Uploading</div>
                    </v-layout>
                </v-container>

                <v-container>


                    <v-alert v-show="error_message"
                    :value="true"
                    type="error"
                  >
                    {{error_message}}
                  </v-alert>
        
                        <v-layout row wrap>
                                <v-flex xs12 >
                                <v-data-table
                                :headers="headers"
                                :items="image_analysis"
                                class="elevation-1"
                                :total-items="image_analysis.length"
                                hide-actions
                                >
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.Name }}</td>
                                    <td>{{ props.item.Confidence }}</td>
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
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import Vuex from 'vuex'
import { vList } from "vuetify";

Vue.use(Vuetify);
Vue.use(axios);
Vue.use(Vuex);

export default {
    data: ()=>({
            image_name:"",
            image_file:"",
            image_url:"",

            uploading:false,

            uploaded_image:{},

            image_analysis:[],
            headers: [
            { text: 'Name' },
            { text: 'Confidence' }
            ],

          error_message:null,
        }),
        created(){
           
        } ,
        methods:{
            pickFile () {
                this.error_message = null
                this.$refs.image.click ()
            },
            
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.image_name = files[0].name
                    if(this.image_name.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.image_url = fr.result
                        this.image_file = files[0]
                    })
                } else {
                    this.image_name = ''
                    this.image_file = ''
                    this.image_url = ''
                }
            },
            async uploadFile()
            {
                this.uploading = true;
                let formData = new FormData();
                formData.append('file',this.image_file);
    
                try{
                    axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key
                    let response = await axios.post('https://api.thecatapi.com/v1/images/upload', formData, {headers: {'Content-Type':'multipart/form-data' }}) 
                    console.log(response.data)
                    this.uploaded_image = response.data
                    this.uploading = false;
                    this.image_file = null
                    this.loadImageAnaylsis(this.uploaded_image.id)

                }catch(error){
                    console.log(error)
                    this.error_message = error.response.data.message
                    this.uploading = false;
                    this.image_file = null
                }
            },
            async loadImageAnaylsis(image_id)
            {

                let response = await axios.get('https://api.thecatapi.com/v1/images/'+image_id +"/analysis") // Ask for 1 Image, at full resolution
                
                this.image_analysis = response.data[0].labels
                console.table(response.data[0].labels)
            }
        }
        
    }
</script>

<style scoped>
    .container{
        background-color:#474747;
    }
    td{
        background-color:#0a0e2c;
        color:white;
    }
    .v-content__wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    background: #333;
}
</style>
