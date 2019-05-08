<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          How to use
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          How to use
        </v-card-title>

        <v-card-text>
          You can navigate using top navbar, turn the lights on if you drunk your "coffee"! Dont forget this website works more or less like an app and every part is seperated:
            <br>
            1) Main function lets you roam between cats.  <br>
            2) Second part provides important information from wikipedia.   <br>
            3) Third part is to upload your pictures, keep in mind tho if it's not a cat picture it wont be uploaded <br>
            this website works with an AI api   <br>
            4) Forth part is to sign up!   <br>
            5) Last part is for voting, highest voted pictures will be saved in our databases and will be listed,  <br>
            Keep in mind again, no username = No vote! <br>
            Click anywhere to get out of this dialog!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>