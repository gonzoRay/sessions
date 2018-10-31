<template>
    <v-list-tile :key="item.id" avatar>
        <v-list-tile-avatar>
            <v-avatar>
                <v-icon>event_note</v-icon>
            </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <router-link tag="li" :to="{name: 'details', params: { id: item.id, item: item }}">
                <v-btn icon ripple>
                    <v-icon color="grey lighten-1">chevron_right</v-icon>
                </v-btn>
            </router-link>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Session } from '@/types';
@Component
export default class SessionListItem extends Vue {
  @Prop()
  private item!: Session;
}
</script>

<style>
li a {
  text-decoration: none;
}
</style>
