<template>
    <div id="app">
    <v-app id="inspire">
    <div class="pa-0" style="max-height:100vh;overflow:hidden;">
    <v-card class="mx-auto elevation-5 text-center pa-5" max-width="350" style="border-radius:20px;position:relative;top:-50px;"
    >
      <v-card-subtitle class="title black--text pa-1">
       LOGIN
      </v-card-subtitle>
      <v-text-field hide-details color="red" label="Email"></v-text-field>
      <v-text-field color="red" label="Password" type="password"></v-text-field>
      <v-card-actions>  
        <v-btn color="red" dark block rounded >
        login
        </v-btn>
      </v-card-actions>
    </v-card>
      <div class="text-center" style="position:relative;top:-40px">
         <p class="mt-3">Don't have an account yet? <span class="red--text" style="cursor:pointer">Register here</span></p>
     </div>
      </div>
  </v-app>
</div>
</template>




<script>
import firebase from "firebase";

export default {
  data() {
    return {
        name: "",
        email: "",
        password: "",
        error: null,
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>