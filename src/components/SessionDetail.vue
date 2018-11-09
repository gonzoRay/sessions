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
    <v-card-actions>
      <v-btn @click="deleteSession(item.id)">Delete</v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppState, Session } from '@/types';
import { State, Getter, Mutation, Action } from 'vuex-class';

@Component({})
export default class SessionDetail extends Vue {
  public item!: Session;

  @Getter
  public getSessionById!: (id: string) => Session;

  @Mutation
  public toggleFavorite: any;

  @Action
  public deleteSessionAsync: any;

  @Action
  public showAlert: any;

  @Prop({ required: true })
  private id!: string;

  public deleteSession(id: string): void {
    this.deleteSessionAsync(id);
    this.$router.replace('/sessions');
    this.showAlert('Session deleted');
  }

  constructor() {
    super();
  }

  public created() {
    this.item = this.getSessionById(this.id);
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
