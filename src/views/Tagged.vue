<template>
  <TagList/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TagList from '@/components/SessionList.vue';

@Component({
  components: {
    TagList
  }
})
export default class Tagged extends Vue {}
</script>
