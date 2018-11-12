<template>
    <div class="empty-list" v-if="!isLoading">
        <span class="display-1">Nothing here!</span>
        <p class="button-link headline" @click="showAddSessionModal()">Add a new session</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, Getter } from 'vuex-class';

@Component({})
export default class NoSessionsFound extends Vue {
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