<template>
    <div class="flex-fix">
        <h5 class="headline">My Sessions</h5>
        <v-list two-line subheader>
            <template v-for="item in mySessions">
                <SessionListItem :key="item.id" :item="item"/>
            </template>
        </v-list>
        <NoSessionsFound hideAddNew="true" v-if="!mySessions.length"/>
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
export default class MySessionList extends Vue {
  @Getter
  private mySessions!: Session[];
}
</script>

<style lang="stylus">
</style>

