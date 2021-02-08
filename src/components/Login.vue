<template>
    <div id="app">
    <v-app id="inspire">
    <div class="pa-0" style="max-height:100vh;">
    <v-card class="mx-auto elevation-5 text-center pa-5" max-width="350" style="border-radius:20px;position:relative;top:40px;">
    <v-form @submit.prevent="login">
      <v-card-subtitle class="title black--text pa-1">
       LOGIN
      </v-card-subtitle>
      <v-text-field color="green" label="Email" v-model="email" type="email" required></v-text-field>
      <v-text-field color="green" label="Password" type="password" v-model="password" required></v-text-field>
      <v-card-actions>
        <v-btn color="green" dark block rounded type="submit">
        login
        </v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
    <div class="text-center" style="position:relative;top:40px">
        <p class="ma-0" style="position:relative;top:10px;font-size:12px"> OR </p>
        <v-btn color="grey" rounded outlined class="ma-2" width="220" style="position:relative;top:12px" @click='socialLogin'>
        <v-icon left color="red" size ="20px" >mdi-google</v-icon>Sign in with google</v-btn>
     </div>
      <div class="text-center" style="position:relative;top:50px">
         <p class="mt-3" style="color:grey; font-size:12px">Don't have an account yet?</p>
     </div>
     <div class="text-center" style="position:relative;top:25px">
     <v-btn color="orange" rounded outlined class="ma-4" width="200" to="/register">Register here</v-btn>
      </div>
      </div>
  </v-app>
</div>
</template>
<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then((data) => {
          this.$router.replace({ name: 'todos' });
        })
        .catch(() => {
          alert('Invalid email or password');
        });
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      // eslint-disable-next-line no-unused-vars
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$router.replace('home');
      }).catch((err) => {
        alert(`Oops.${err.message}`);
      });
    },
  },
};
</script>
