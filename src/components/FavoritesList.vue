<template>
    <div>
        <h5 class="headline">Favorites</h5>
        <v-list two-line subheader>
            <template v-for="item in favorites">
                <SessionListItem :key="item.id" :item="item"/>
            </template>
        </v-list>
        <NoSessionsFound v-if="!favorites.length"/>
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
export default class FavoritesList extends Vue {
  @Getter
  private favorites!: Session[];
}
</script>

<style lang="stylus">
</style>

