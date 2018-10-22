<template>
  <div>
    <v-card-title primary-title>
      <div class="headline">{{ item.title }}</div>
      <div>{{ item.description }}</div>
    </v-card-title>
    <div>
      <v-chip color="extra" text-color="white" v-for="tag in item.tags" :key="tag">{{ tag }}</v-chip>
    </div>
    <v-card-actions>
      <v-btn flat>Edit</v-btn>
      <v-icon>{{ item.id === 1 ? 'turned_in' : 'turned_in_not' }}</v-icon>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: 'SessionListItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    methods: {
      isBookmarked(sessionItem) {
        const bookmarks = new Set();
        bookmarks.add('VUE 102');
        return bookmarks.has(sessionItem.name) ? 'turned_in' : 'turned_not_in';
      }
    }
  }
};
</script>

<style>
</style>
