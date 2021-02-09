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
      style="top: 70px"
      label="What needs to be done?"
      hint="Press 'Enter' to add new to-do"
      color="purple lighten-3"
      outlined
      clearable
      v-model="newTodoText"
      @keydown.enter="addTodo(newTodoText)"
    />
    <v-card style='top:100px;'>
    <v-card-title>
      hello
    </v-card-title>

    </v-card>

  </v-container>

 </div>

</template>

<script>
// import { mapGetters } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'Todos',
  // computed: {
  //   // map `this.user` to `this.$store.getters.user`
  //   ...mapGetters({
  //     user: 'user',
  //   }),
  // },
  data() {
    return {

    };
  },
  methods: {
    // openDialog() {
    //   // eslint-disable-next-line no-undef
    //   Vue.$emit('dialog', true);
    // },

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
