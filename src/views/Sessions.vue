<template>
  <div class="home">
    <SessionList title="Lunch and Learn Sessions"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SessionList from '@/components/SessionList.vue';

@Component({
  components: {
    SessionList
  }
})
export default class Sessions extends Vue {}
</script>
