<template>
    <div class="empty-list" v-if="!isLoading">
        <span class="display-1">Nothing here!</span>
        <p
            v-if="!!hideAddNew === false"
            class="button-link headline"
            @click="showAddSessionModal()"
        >Add a new session</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation, Getter } from 'vuex-class';

@Component({})
export default class NoSessionsFound extends Vue {
  @Prop()
  private hideAddNew?: boolean;

  @Mutation
  private showAddSessionModal!: void;

  @Getter
  private isLoading!: boolean;
}
</script>

<style lang="stylus">
.empty-list {
    .display-1 {
        padding-bottom: 5px;
    }

    padding: 20px;
}
</style>