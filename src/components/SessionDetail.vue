<template>
  <div>
    <div class="title">
      {{ item.title }}
      <v-icon
        class="favorite"
        @click="toggleFavorite(item)"
      >{{ item.isFavorite ? 'turned_in' : 'turned_in_not' }}</v-icon>
    </div>
    <span class="speaker">{{ item.speaker }}</span>
    <div class="subheading">{{ item.description }}</div>
    <div class="tags">
      <v-chip v-for="tag in item.tags" :key="tag">{{ tag }}</v-chip>
    </div>
    <v-card-actions></v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppState, Session } from '@/types';
import { State, Getter, Mutation } from 'vuex-class';

@Component({})
export default class SessionDetail extends Vue {
  public item!: Session;

  @Getter
  public getSessionById!: (id: number) => Session;

  @Mutation
  public toggleFavorite: any;

  @Prop({ required: true })
  private id!: string;

  constructor() {
    super();
  }

  public created() {
    this.item = this.getSessionById(parseInt(this.id, 10));
  }
}
</script>

<style>
.favorite {
  cursor: pointer;
  padding-left: 10px;
}

.subheading {
  margin-top: 20px;
}

.tags {
  padding-top: 15px;
}
</style>
