<template>
  <v-tabs>
    <v-tab v-for="tabName in tabs" :key="tabName">{{ tabName }}</v-tab>
    <v-tab-item>
      <v-list two-line subheader>
        <template v-for="item in upcoming">
          <SessionListItem :key="item.id" :item="item"/>
        </template>
      </v-list>
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

  private newSession: Session = {
    id: -1,
    title: '',
    description: '',
    speaker: '',
    datetime: ''
  };

  @Getter
  private upcoming!: Session[];
  @Getter
  private past!: Session[];
}
</script>

<style lang="stylus">
</style>

