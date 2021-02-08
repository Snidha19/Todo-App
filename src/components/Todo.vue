<template>
 <div id="Todo">
 <h1 class="subheading grey--text ml-4">Dashboard</h1>
    <h1>Todos</h1>
    <v-btn middle @click.prevent="LogOut"> Log Out </v-btn>
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
  methods: {
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
