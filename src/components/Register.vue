<template>
<div id="app">
  <v-app id="inspire">
    <div class="pa-0" style="max-height:100vh;">
    <v-card class="mx-auto elevation-5 text-center pa-5" max-width="350" style="border-radius:20px;position:relative;top:40px;"
    >
      <v-form @submit.prevent="SignIn">
      <v-card-subtitle class="title black--text pa-1">
        Sign Up
      </v-card-subtitle>
      <v-text-field color="green" label="Email" v-model="email" type="email" required></v-text-field>
      <v-text-field color="green" label="Password" type="password" v-model="password" required></v-text-field>
      <v-text-field color="green" label="Confirm Password" type="password" v-model="confirm_password" :rules="confirmPasswordRules" required>
      </v-text-field>
        <v-btn color="green" dark block rounded type="submit">
          sign in
        </v-btn>
      </v-form>
    </v-card>
      <div class="text-center" style="position:relative;top:40px">
        <p class="ma-0" style="position:relative;top:10px;font-size:12px"> OR </p>
        <v-btn color="grey" rounded outlined class="ma-2" width="200" style="position:relative;top:15px">
        <v-icon left color="red" size ="20px" >mdi-google</v-icon>Login with google</v-btn>
     </div>
      </div>
  </v-app>
</div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      confirm_password: '',
      confirmPasswordRules: [
        (value) => value === this.password || 'Passwords does not match',
      ],
      error: null,
    };
  },
  methods: {
    SignIn() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.email,
            })
            .then(() => {
              this.$router.replace({ name: 'login' });
            });
        })
        .catch(() => {
          alert('Check if your email is valid and your password consists of atleast six characters');
        });
    },
  },
};
</script>
