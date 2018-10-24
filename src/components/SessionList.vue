<template>
  <div>
    <h5 class="headline">Upcoming Sessions</h5>
    <v-list two-line subheader>
      <template v-for="item in upcoming">
        <v-list-tile :key="item.id" avatar>
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
      </template>
    </v-list>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Session } from '@/types';

@Component
export default class SessionList extends Vue {
  @Getter
  private upcoming!: Session[];
  @Prop()
  private title!: string;
}
</script>

<style lang="stylus">
.headline {
  margin-bottom: 15px;
}
</style>

