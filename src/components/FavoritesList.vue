<template>
    <div>
        <h5 class="headline">Favorites</h5>
        <v-list two-line subheader>
            <template v-for="item in favorites">
                <SessionListItem :key="item.id" :item="item"/>
            </template>
        </v-list>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Session } from '@/types';
import SessionListItem from '@/components/SessionListItem.vue';

@Component({
  components: {
    SessionListItem
  }
})
export default class FavoritesList extends Vue {
  @Getter
  private favorites!: Session[];
}
</script>

<style lang="stylus">
</style>

