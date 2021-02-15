<template>

 <div id="Todo">

 <v-app-bar app color="purple lighten-5">
      <v-toolbar-title justify-center>Todos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="purple lighten-5" @click.prevent="LogOut">
        <span>Sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
  </v-app-bar>

  <v-container>
    <v-text-field
      style="top: 75px"
      label="What needs to be done?"
      hint="Press 'Enter' to add new to-do"
      color="purple lighten-3"
      outlined
      clearable
      v-model="todoText"
      @keydown.enter="addTodo"
    />

    <v-card v-for="item in todos" v-bind:key= "item.text" v-model="todoText" class="mx-auto" style='top:100px;'>
    <v-layout row wrap>
    <v-flex xs10 md4>
    <v-card-title>
    <v-checkbox color="success"></v-checkbox>
    {{ item.text }}
    </v-card-title>
    </v-flex>

    <v-flex xs4 sm4 md2 class="pt-3">
    <v-text-field align-center type="date" label="Due on" color="purple lighten-3">
    </v-text-field>
    </v-flex>

    <v-spacer></v-spacer>

    <v-flex xs3 sm3 md3 class="pt-7">
    <v-progress-circular
      :rotate="-90"
      :size="30"
      :width="5"
      :value="value"
      color="primary"
      class="pr-10">
     {{ value }}
    </v-progress-circular>
    <v-btn icon>
    <v-icon color="blue">mdi-plus</v-icon>
    </v-btn>
    <v-btn icon>
    <v-icon color="purple">mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon>
    <v-icon color="red lighten-2">mdi-delete</v-icon>
    </v-btn>
    </v-flex>
    </v-layout>
    </v-card>
  </v-container>

 </div>

</template>

<script>
// import { mapGetters } from 'vuex';
import firebase from 'firebase';
import 'firebase/database';

// eslint-disable-next-line no-unused-vars
const database = firebase.database();

export default {
  name: 'Todos',
  data() {
    return {
      todoText: '',
      todos: {},
      todoRef: null,
      editing: null,
    };
  },
  created() {
    this.todoRef = database.ref(`/users/${this.$store.state.auth.user.uid}`);
  },
  mounted() {
    this.todoRef.on('value', (snapshot) => {
      this.todos = snapshot.val();
      console.log(this.todos);
    });
  },
  methods: {
    // addTodo() {
    //   this.todos.push({ text: this.todoText.trim() });
    //   this.todoText = '';
    // },
    addTodo() {
      this.todoRef.push({
        text: this.todoText.trim(),
        isDone: false,
      });
      this.todoText = '';
    },

    LogOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: 'login',
          });
        });
    },
  },
};
</script>
<style scoped>
</style>
