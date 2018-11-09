<template>
  <v-tabs>
    <v-tab v-for="tabName in tabs" :key="tabName">{{ tabName }}</v-tab>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="item in upcoming">
          <SessionListItem :key="item.id" :item="item"/>
        </template>
      </v-list>
      <div class="empty-list" v-if="!upcoming.length">
        <span class="display-1">No upcoming sessions</span>
        <p class="button-link headline" @click="showAddSessionModal()">Add a new session!</p>
      </div>
    </v-tab-item>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="item in past">
          <SessionListItem :key="item.id" :item="item"/>
        </template>
      </v-list>
    </v-tab-item>
  </v-tabs>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { Session } from '@/types';
import SessionListItem from '@/components/SessionListItem.vue';

@Component({
  components: {
    SessionListItem
  }
})
export default class SessionList extends Vue {
  @Prop()
  public title!: string;
  public tabs = ['Upcoming', 'Past'];

  @Mutation
  public showAddSessionModal!: void;

  @Getter
  private upcoming!: Session[];
  @Getter
  private past!: Session[];
}
</script>

<style lang="stylus">
.empty-list {
  .display-1 {
    margin-bottom: 5px;
  }

  padding: 20px;
}
</style>

