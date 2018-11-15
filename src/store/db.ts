import { Session } from '@/types';
import firebase from 'firebase/app';
import Vue from 'vue';
import VueFirestore from 'vue-firestore';

import 'firebase/firestore';

import state from './state';

Vue.use(VueFirestore);

firebase.initializeApp({
  projectId: 'sessions-e2e0f',
  databaseURL: 'https://sessions-e2e0f.firebaseio.com',
  apiKey: 'AIzaSyAt-_3gAvu4v-rt8dZMmtcdQKE8yylGpWk',
  authDomain: 'sessions-e2e0f.firebaseapp.com'
});

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

const sessionCollection = db.collection('sessions');
const tagCollection = db.collection('tags');

firebase.auth().onAuthStateChanged(user => {
  state.currentUser = user;
});

// Create subscription Firestore collections in Firebase
sessionCollection.onSnapshot(sessionsRef => {
  state.isLoading = true;
  state.sessions = [];
  sessionsRef.forEach(doc => {
    const session = doc.data();
    session.id = doc.id;
    state.sessions.push(session as Session);
  });
  state.isLoading = false;
});

tagCollection.onSnapshot(tagRef => {
  state.isLoading = true;
  state.allTags = [];
  tagRef.forEach(tagDoc => {
    state.allTags.push(tagDoc.data().name);
  });
  state.isLoading = false;
});

export { tagCollection, sessionCollection, db, firebase };
