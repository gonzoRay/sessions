<template>
    <div class="empty-list" v-if="!isLoading">
        <span class="display-1">Nothing here!</span>
        <p
            v-if="!!!hideAddNew"
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
  hideAddNew?: boolean;

  @Mutation
  public showAddSessionModal!: void;

  @Getter
  public isLoading!: boolean;
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