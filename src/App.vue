<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      v-if="currentUser"
      fixed
      app
    >
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
            <v-list-tile v-for="(tag, i) in getTags()" :key="i" class="indent-tags">
              <v-list-tile-action v-if="tag.icon">
                <v-icon>{{ tag.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-if="tag.route">
                  <router-link
                    tag="li"
                    :to="{name: 'tag', params: {name: tag.text }}"
                  >{{ tag.text }}</router-link>
                </v-list-tile-title>
                <v-list-tile-title v-else>{{ tag.text }}</v-list-tile-title>
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
        <v-list-tile class="clickable">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="logout()">Log out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-btn icon class="hidden-xs-only" v-if="showBack()" @click="back()">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-side-icon v-if="currentUser" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="font-weight-light" v-html="appName"></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="currentUser" class="welcome-msg hidden-xs-only">
        Logged in as:
        <span class="font-italic">{{ getUserName() }}</span>
      </span>
      <v-menu v-model="userMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
        <v-btn icon large slot="activator">
          <v-avatar v-if="currentUser">
            <img :src="getUserPhotoUrl()" alt="user avatar">
          </v-avatar>
        </v-btn>
        <v-card v-if="currentUser">
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="getUserPhotoUrl()" alt="user avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{ getUserName() }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ getUserEmail() }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn align-content="start" color="primary" flat>My Sessions</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="logout()">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout align-start>
          <router-view :key="$route.fullPath"/>
          <v-snackbar :value="showSnackbar" :color="'success'" :bottom="true">{{ snackbarText }}</v-snackbar>
        </v-layout>
      </v-container>
    </v-content>
    <v-btn
      v-if="currentUser"
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="showAddSessionModal()"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <AddSessionForm></AddSessionForm>
    <v-footer app>
      <span v-html="appName"></span>
      &nbsp;&copy;{{ getCurrentYear() }}
    </v-footer>
  </v-app>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AppModal from './components/AppModal.vue';
import AddSessionForm from '@/components/AddSessionForm.vue';
import Sessions from './views/Sessions.vue';

import { Getter, Mutation, Action } from 'vuex-class';
import { Session } from './types';
import format from 'date-fns/format';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  components: {
    Sessions,
    AddSessionForm
  }
})
export default class App extends Vue {
  private userMenu: boolean;
  private dateMenu: boolean;
  private drawer: any;
  private items: any[];

  @Getter
  private appName!: string;

  @Getter
  private allTags!: string[];

  @Getter
  private showSnackbar!: boolean;

  @Getter
  private snackbarText!: string;

  @Mutation
  private showAddSessionModal!: void;

  @Getter
  private currentUser!: firebase.User;

  constructor() {
    super();
    this.userMenu = false;
    this.dateMenu = false;
    this.drawer = null;

    this.items = [
      { icon: 'event', text: 'Sessions', route: '/sessions' },
      { icon: 'star', text: 'Favorites', route: '/favorites' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Tags',
        model: true,
        route: '/tags'
      },
      { icon: 'settings', text: 'Settings', route: '/settings' }
    ];
  }

  private getUserName() {
    return this.currentUser ? this.currentUser.displayName : '';
  }

  private getUserEmail() {
    return this.currentUser ? this.currentUser.email : '<unknown email>';
  }

  private getUserPhotoUrl() {
    return this.currentUser ? this.currentUser.photoURL : '';
  }

  private getCurrentYear() {
    return new Date().getFullYear();
  }

  private logout() {
    firebase
      .auth()
      .signOut()
      .catch(err => alert(err.message || err))
      .finally(() => {
        this.userMenu = false;
        this.drawer = false;
        this.$router.replace('/login');
      });
  }

  private back(): void {
    this.$router.go(-1);
  }

  private showBack(): boolean {
    return this.$route.name === 'details';
  }

  private mounted() {
    this.insertTagsSubmenu();
  }

  private insertTagsSubmenu() {
    const tagNodeIndex = this.items.findIndex(
      (i: any) => i.text === 'Tags'
    ) as any;
    this.items[tagNodeIndex].children = this.getTags();
  }

  private getTags() {
    return this.allTags.map(tag => {
      return {
        icon: 'label',
        text: tag,
        route: `/tag/${tag.toLowerCase()}`
      };
    });
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

.welcome-msg {
  padding-right: 10px;
}

.v-footer {
  padding-left: 5px;
}

.button-link {
  cursor: pointer;
  color: var(--v-primary-base);
}

.indent-tags {
  padding-left: 12px;
}

.clickable {
  cursor: pointer;
}

.flex-fix {
  width: 100%;
}
</style>
