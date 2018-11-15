<template>
  <v-tabs class="flex-fix">
    <v-tab v-for="tabName in tabs" :key="tabName">{{ tabName }}</v-tab>
    <v-tab-item>
      <v-list two-line subheader v-if="!isLoading">
        <template v-for="item in upcoming">
          <SessionListItem :key="item.id" :item="item"/>
        </template>
      </v-list>
      <Loading/>
      <NoSessionsFound v-if="!upcoming.length"/>
    </v-tab-item>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="item in past">
          <SessionListItem :key="item.id" :item="item"/>
        </template>
      </v-list>
      <NoSessionsFound v-if="!past.length"/>
      <Loading/>
    </v-tab-item>
  </v-tabs>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation, Action } from 'vuex-class';
import { Session } from '@/types';
import SessionListItem from '@/components/SessionListItem.vue';
import NoSessionsFound from '@/components/NoSessionsFound.vue';
import Loading from '@/components/Loading.vue';

@Component({
  components: {
    SessionListItem,
    NoSessionsFound,
    Loading
  }
})
export default class SessionList extends Vue {
  @Prop()
  public title!: string;

  public tabs = ['Upcoming', 'Past'];

  @Getter
  public isLoading!: boolean;

  @Getter
  private upcoming!: Session[];

  @Getter
  private past!: Session[];
}
</script>

<style lang="stylus">
.flex-fix {
  width: 100%;
}
</style>

