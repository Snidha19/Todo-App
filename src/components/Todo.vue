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
    <v-card v-for="(item,key) in todos" v-bind:key="key" v-model="todoText" class="mx-auto" style='top:100px;'>
    <v-layout row wrap>
    <v-flex xs10 md4>
    <v-card-title :class="{ 'text--line-through': (item.isDone == true)}">
    <v-checkbox :input-value="item.isDone" v-on:change="setStatus(key, item.isDone, 'isDone')" color="success"></v-checkbox>
    {{ item.text }}
    </v-card-title>
    </v-flex>

    <v-flex xs4 sm4 md2 class="pt-3">
    <v-text-field align-center type="date" label="Due on" color="purple lighten-3"
    v-model="date" @keydown.enter="setdueDate(key)">
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
    <v-btn v-if="item.isDone" icon @click="remove(key)">
    <v-icon color="red lighten-2">mdi-delete</v-icon>
    </v-btn>
    <v-btn icon v-if="item.isDone" color="purple lighten-3" @click="hideCompleted(key,true)">
    <v-icon> mdi-eye </v-icon>
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
      todos: [],
      todoRef: null,
      editing: null,
      todoKey: '',
      date: null,
    };
  },
  created() {
    this.todoRef = database.ref(`/users/${this.$store.state.auth.user.data.uid}`);
    this.$store.dispatch('todos/setTodosRef', this.todoRef);
  },
  mounted() {
    this.todoRef.on('value', (snapshot) => {
      this.todos = snapshot.val();
      this.$store.dispatch('todos/setTodos', this.todos);
    });
  },
  methods: {
    addTodo() {
      this.todoRef.push({
        text: this.todoText.trim(),
        isDone: false,
        dueDate: '',
        hideDone: false,
      });
      this.todoText = '';
    },
    setdueDate(key) {
      if (this.date !== null) {
        database.ref(`users/${this.$store.state.auth.user.data.uid}/${key}/dueDate`).set(this.date);
      }
    },
    remove(task) {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.data.uid}/${task}`)
        .set({});
    },
    setStatus(key, status, data) {
      firebase
        .database()
        .ref(`users/${this.$store.state.auth.user.data.uid}/${key}/${data}`)
        .set(!status);
    },
    hideCompleted(key, bool) {
      database.ref(`users/${this.$store.state.auth.user.data.uid}/${key}/hideDone`).set(bool);
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
  computed: {
    activeTodos() {
      return this.todos.values.filter((todo) => !todo.isDone).length;
    },
    completedTodos() {
      return this.todos.filter((todo) => todo.isDone);
    },
    countCompleted() {
      return this.todos.filter((todo) => todo.isDone).length;
    },
  },
};
</script>

<style lang="scss" scoped>
.text--line-through {
  text-decoration: line-through;
}
</style>
