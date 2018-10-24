<template>
    <FavoritesList/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FavoritesList from '@/components/FavoritesList.vue';

@Component({
  components: {
    FavoritesList
  }
})
export default class Favorites extends Vue {}
</script>
