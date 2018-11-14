<template>
    <v-container fill-height>
        <v-layout row wrap="" align-center>
            <v-flex class="text-xs-center">
                <img class="logo" src="../assets/logo.png" width="120px" title="Sessions logo">
                <div class="fill-height bottom-gradient"></div>
                <h1 class="display-3">Sessions</h1>
                <v-btn @click.prevent="signInWithGoogle">Log in with Google</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class Login extends Vue {
  private signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => this.$router.replace('/sessions'))
      .catch(err => alert(err.message || err));
  }
}
</script>

<style>
.logo {
  background-color: var(--v-primary-base);
}
</style>
