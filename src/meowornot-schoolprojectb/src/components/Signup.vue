<template>
<div id="sign-up">        
  <router-view name="signup"></router-view>
 <v-app>
  <v-content> 
      <v-card flat tile> </v-card>
            <v-toolbar color="deep-purple darken-1 white--text">
              <v-btn @click="changeColor"> <font-awesome-icon icon="coffee"/></v-btn>
              <v-toolbar-title>Meow or Not!</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="hidden-sm-and-down">
                <v-btn dark flat value="true"> <a href="#kitty-tour">Kitty tour</a></v-btn>
                <v-btn dark flat><a href="#ranking">Ranking</a></v-btn>
                <v-btn dark flat><a href="#upload">Upload</a></v-btn>
                <v-btn dark color="white--text" flat><a href="#sign-up">Sign Up</a></v-btn>
              </v-toolbar-items>    
              </v-toolbar>
       
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

          <v-btn :disabled="loading" id="login" dark @click="submitLogIn" color="pink-lighten-3" large style="margin-bottom:10px;">
            <b>Signup</b>
          </v-btn>
          <div v-show="loading"><h1>Loading...</h1></div>

        </v-form>
        <br>
       
      </v-flex>

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
          if(this.email.length<4){this.errorModal('Need an Email','You need an email adress registered to sign up!');return;}
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
      },
            changeColor(){
                document.getElementsByClassName('container')[3].style.backgroundColor = "white";
                document.getElementsByClassName('container')[3].style.color = "black";
                document.getElementsByClassName('v-toolbar__content')[3].style.backgroundColor = "darkred";
                document.getElementById('login').style.backgroundColor = "lightpink";
                document.getElementById('login').style.color = "black";
                document.getElementsByTagName('p')[0].style.color = "black";

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
