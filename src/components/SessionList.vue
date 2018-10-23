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
import { State } from 'vuex-class';
import { Session } from '@/types';

@Component
export default class SessionList extends Vue {
  @State
  private sessions!: Session[];
  @Prop()
  private title!: string;
}
</script>
