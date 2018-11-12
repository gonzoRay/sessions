<template>
    <router-link tag="li" v-bind:key="item.id" :to="{name: 'details', params: { id: item.id }}">
        <v-list-tile :key="item.id" avatar>
            <v-list-tile-avatar>
                <v-avatar>
                    <v-icon>event_note</v-icon>
                </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>
                    {{ item.title }}
                    <v-icon
                        class="favorite"
                        @click="toggleSessionFavorite($event, item)"
                    >{{ item.isFavorite ? 'turned_in' : 'turned_in_not' }}</v-icon>
                </v-list-tile-title>
                <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Session } from '@/types';
import { Mutation } from 'vuex-class';

@Component
export default class SessionListItem extends Vue {
  @Prop()
  private item!: Session;

  @Mutation
  private toggleFavorite: any;

  public toggleSessionFavorite(event: any, sessionItem: Session): any {
    this.toggleFavorite(sessionItem);
    event.preventDefault();
  }
}
</script>

<style>
li a {
  text-decoration: none;
}
</style>
