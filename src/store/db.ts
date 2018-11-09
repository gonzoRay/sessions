import firebase from 'firebase/app';
import Vue from 'vue';
import VueFirestore from 'vue-firestore';

import 'firebase/firestore';

Vue.use(VueFirestore);

firebase.initializeApp({
  projectId: 'sessions-e2e0f',
  databaseURL: 'https://sessions-e2e0f.firebaseio.com'
});

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;
