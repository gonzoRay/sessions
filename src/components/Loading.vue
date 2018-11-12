<template>
    <v-progress-linear v-if="isLoading" :indeterminate="true"></v-progress-linear>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component({})
export default class Loading extends Vue {
  @Getter
  public isLoading!: boolean;
}
</script>

<style lang="stylus">
</style>