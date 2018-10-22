<template>
  <div class="session-list">
    <h1>{{ title }}</h1>
    <p>Find an upcoming Lunch and Learn session. Or add your own!</p>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap="">
          <v-flex xs12>
            <v-card v-for="item in sessions" :key="item.id">
              <SessionListItem :item="item"/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import SessionListItem from './SessionListItem.vue';

@Component({
  components: {
    SessionListItem
  }
})
export default class SessionList extends Vue {
  @Prop()
  private title!: string;
  get sessions() {
    return [
      {
        id: 1,
        title: 'Intro to Web Components w/ Polymer',
        description:
          'Shallow dive in the kiddie pool will get you quite far w/ Polymer',
        speaker: 'Eldridge Cleaver',
        datetime: new Date('2001-01-01 12:00:00 PM'),
        tags: ['Web Components', 'Polymer', 'PWA']
      },
      {
        id: 2,
        title: 'VUE 102',
        description: 'Troubles in the rear Vue',
        speaker: 'Fred Hampton',
        datetime: new Date('2001-02-01 09:00:00 AM'),
        tags: ['VueJS', 'PWA']
      }
    ];
  }
}
</script>
