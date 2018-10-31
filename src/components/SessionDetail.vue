<template>
  <div>
    <v-card-title primary-title>
      <span class="headline">{{ item.title }}</span>
      <v-icon>{{ item.id === 1 ? 'turned_in' : 'turned_in_not' }}</v-icon>
      <p class="subheading">{{ item.description }}</p>
    </v-card-title>
    <div>
      <v-chip v-for="tag in item.tags" :key="tag">{{ tag }}</v-chip>
    </div>
    <v-card-actions>
      <v-btn flat>Edit</v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Session } from '@/types';

@Component({})
export default class SessionDetail extends Vue {
  @Prop()
  private item!: Session;
}
</script>

<style>
v-icon {
  padding-left: 10px;
}
</style>
