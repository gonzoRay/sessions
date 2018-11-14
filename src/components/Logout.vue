<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class Logout extends Vue {
  private logout() {
    firebase
      .auth()
      .signOut()
      .catch(err => alert(err.message || err))
      .finally(() => {
        this.$router.replace('/login');
      });
  }

  private created() {
    this.logout();
  }
}
</script>

<style>
</style>
