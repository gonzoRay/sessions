<template>
  <v-list two-line subheader>
    <v-list-tile v-for="item in sessions" :key="item.title" avatar>
      <v-list-tile-avatar>
        <v-avatar>
          <v-icon>event_note</v-icon>
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1">chevron_right</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Session } from '../models/session';

@Component
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
        technology: 'vue',
        tags: ['Web Components', 'Polymer', 'PWA']
      } as Session,
      {
        id: 2,
        title: 'VUE 102',
        description: 'Troubles in the rear Vue',
        speaker: 'Fred Hampton',
        datetime: new Date('2001-02-01 09:00:00 AM'),
        technology: 'angular',
        tags: ['VueJS', 'PWA']
      } as Session
    ];
  }
}
</script>
