<template>
  <div>
    <v-card-title primary-title>
      <span class="headline">{{ item.title }}</span>
      <v-icon class="favorite">{{ item.id === 1 ? 'turned_in' : 'turned_in_not' }}</v-icon>
      <p class="subheading">{{ item.description }}</p>
    </v-card-title>
    <div>
      <v-chip v-for="tag in item.tags" :key="tag">{{ tag }}</v-chip>
    </div>
    <v-card-actions></v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppState, Session } from '@/types';
import { State, Getter } from 'vuex-class';

@Component({})
export default class SessionDetail extends Vue {
  public item!: Session;

  @Prop({ required: true })
  private id!: string;

  @Getter
  public getSessionById!: (id: number) => Session;

  created() {
    this.item = this.getSessionById(parseInt(this.id, 10));
  }
  constructor() {
    super();
  }
}
</script>

<style>
.favorite {
  cursor: pointer;
  padding-left: 10px;
}
</style>
