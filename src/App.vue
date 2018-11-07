<template>
  <v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <router-link tag="li" :to="item.route">{{ item.text }}</router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-btn icon class="hidden-xs-only" v-if="showBack()" @click="back()">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span>Sessions</span>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>-->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="./assets/logo.png" alt="Sessions">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout align-start>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-btn fab bottom right color="pink" dark fixed @click="showAddSessionModal()">
      <v-icon>add</v-icon>
    </v-btn>
    <AddSessionForm></AddSessionForm>
    <v-footer app>Sessions &copy;2018</v-footer>
  </v-app>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppModal from './components/AppModal.vue';
import AddSessionForm from '@/components/AddSessionForm.vue';
import Sessions from './views/Sessions.vue';
import { Getter, Mutation } from 'vuex-class';
import { Session } from './types';
import format from 'date-fns/format';

@Component({
  components: {
    Sessions,
    AddSessionForm
  }
})
export default class App extends Vue {
  @Prop()
  public source!: string;

  public dateMenu: boolean;
  public drawer: any;
  public items: object[];

  @Mutation
  public showAddSessionModal!: void;

  public back(): void {
    this.$router.go(-1);
  }

  public showBack(): boolean {
    return this.$route.name == 'details';
  }

  constructor() {
    super();
    this.dateMenu = false;
    this.drawer = null;

    this.items = [
      { icon: 'event', text: 'Sessions', route: '/sessions' },
      // { icon: 'event', text: 'Past Sessions', route: '/sessions/past' },
      { icon: 'star', text: 'Favorites', route: '/favorites' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Tags',
        model: true,
        children: [{ icon: 'add', text: 'Create tag' }],
        route: '/tags'
      },
      { icon: 'settings', text: 'Settings', route: '/settings' }
    ];
  }
}
</script>

<style lang="stylus">
li {
  cursor: pointer;
}

li.router-link-active {
  color: #1565C0;
}

li.router-link-exact-active {
  border-bottom: 1px solid #1565C0;
}

.v-footer {
  padding-left: 5px;
}
</style>
