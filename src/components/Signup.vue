<template>
<div>
 <v-app>
  <v-content> 
       <v-card>
            <v-toolbar color="deep-purple darken-1 white--text">
              <v-toolbar-side-icon dark></v-toolbar-side-icon>
              <v-toolbar-title>Meow or Not!</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn dark flat value="true">Kitty tour</v-btn>
                <v-btn dark flat>Ranking</v-btn>
                <v-btn dark flat>Upload</v-btn>
                <v-btn class="v-btn--active" dark color="white--text">Sign Up</v-btn>
              </v-toolbar-items>
            </v-toolbar>
       </v-card>
      <v-flex xs8 offset-xs2 align-center justify-center>
        
      <br>
    

        <h1>
          <slot></slot>
        </h1>
        <v-form v-model="valid" @keydown.native.13="submitLogIn">
          <v-text-field id="email" prepend-icon="email" label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
          <v-text-field id="app_description" prepend-icon="help_outline" label="Password" hint="At least 8 characters" v-model="app_description" min="8" 
            required></v-text-field>
     
    <v-radio-group v-model="user_type" required >
      <p>Are you a...</p>
      <v-radio
        label="Student"
        value="student"
      ></v-radio>
      <v-radio
        label="Teacher"
        value="teacher"
      ></v-radio>
      <v-radio
        label="Tester"
        value="tester"
      ></v-radio>
      <v-radio
        label="Developer"
        value="developer"
      ></v-radio>
    </v-radio-group>
    <v-checkbox
      label=" I am also willing to get updates about the app.(Not required to use the application.)"
      v-model="opt_in"
    ></v-checkbox>

          <v-btn :disabled="loading" id="login" dark @click="submitLogIn" color="indigo darken-3" large style="margin-bottom:10px;">
            <b>Signup</b>
          </v-btn>
          <div v-show="loading"><h1>Loading...</h1></div>

        </v-form>
        <br>
        <p><router-link to="/privacy">Privacy Policy</router-link> | <router-link to="/terms">Terms Conditions</router-link></p>
      </v-flex>
    </v-layout>

    <v-dialog persistent v-model="modalshow" width="310">
      <v-card>
        <v-card-title class="headline">
          {{title}}
        </v-card-title>
        <v-card-text align-left>
          {{message}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="modalshow=!modalshow" flat>
            <b>Ok</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-content>
    </v-app>
</div>
</template>

<script>
export default {
     data: ()=>({
        email: "",
        app_description:"",
        emailRules: [
          v => !!v || 'E-mail is required',
        ],
        valid: false,
        checkbox: true,
        user_type: null,
        opt_in:false,
        title: '',
        message: '',
        modalshow: false,
        loading:false
    }),
    methods:{

      errorModal(title, error) {
        this.title = title;
        this.message = error;
        this.modalshow = !this.modalshow;
        this.loading = false;
      },
      async submitLogIn() {
          if(this.email.length<4){this.errorModal('Need an Email','Need somewhere to send the API Key');return;}
          else if(this.app_description.length<8){this.errorModal('Need a longer App Description','it helps me know what features to add next');return;}
          //else if(this.user_type==null){this.errorModal("Need an 'Are you a'",'it helps me know which type of user to make tutorials for');return;}
        
        this.loading = true;
        const scope = this; 
        var userCredentials = {
          email: scope.email,
          appDescription: scope.app_description,
          opted_into_mailing_list: scope.opt_in,
          details: { user_type:scope.user_type }
        }
        try {
          await scope.$store.dispatch('TheCatAPI/signup', userCredentials)
          scope.$router.push('/thanks')
        } catch (error) {
          let message, title = "";
          switch(error.message){
            case "INVALID_CREDENTIALS":
             title ="Account not found";
            break;
            case "INVALID_PASSWORD":
              title = "Wrong password";
            break;
            case "DUPLICATE_EMAIL":
             title ="Duplicate email";
              message= "Looks like you've already signed up with that Email. Please use another for now.";
            break;
            default:
            title = "Error"
              message=error.message;
              break;
          }
          this.errorModal(title,message)
          scope.$emit('error', message);        
        }
      }
    }
  }
</script>

<style>
       .layout{
            background-color:#999;
            color:white;
        }
        .v-input{
            color:white;
        }
        body{
            background-color:grey;
            }
        td{
          border-bottom:15px solid #999;
          background-color:#5E35B1;
          color:white;
        }
        th{
          background-color:#999;
          padding-top:50px;
          color:white;
        }
        .theme--dark.v-datatable .v-datatable__actions {
            background-color: #999;
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
            border-top:15px solid #999;;
            border-bottom:15px solid #999;
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
            background-color:#999;
        }
        p{color:#5E35B1}

        v-radio{color:#333}
</style>
