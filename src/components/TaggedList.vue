<template>
  <div class="flex-fix">
    <h5 class="headline">
      Tagged as:
      <span class="tag-name font-italic">{{ name }}</span>
    </h5>
    <v-list two-line subheader>
      <template v-for="item in tagged">
        <SessionListItem :key="item.id" :item="item"/>
      </template>
    </v-list>
    <NoSessionsFound hideAddNew="true" v-if="!tagged.length"/>
    <Loading/>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
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
export default class TaggedList extends Vue {
  private tagged: Session[] = [];

  @Prop({ required: true })
  private name!: string;

  @Getter
  private getSessionsByTagName!: (tagName: string) => Session[];

  private created() {
    this.tagged = this.getSessionsByTagName(this.name) || [];
  }
}
</script>

<style lang="stylus">
.tag-name {
  color: var(--v-primary-base);
}
</style>