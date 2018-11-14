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
            <v-list-tile v-for="(tag, i) in getTags()" :key="i">
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-btn icon class="hidden-xs-only" v-if="showBack()" @click="back()">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-side-icon v-if="currentUser" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span>Sessions</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="currentUser" class="hidden-xs-only">
        Logged in as:
        <span class="font-italic">{{ getUserName() }}</span>
      </span>
      <v-menu v-model="userMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
        <v-btn icon large slot="activator">
          <v-avatar icon>
            <v-icon x-large>person</v-icon>
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
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="logout()">Log out</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout align-start>
          <router-view/>
          <v-snackbar :value="showSnackbar" :color="'success'" :bottom="true">{{ snackbarText }}</v-snackbar>
        </v-layout>
      </v-container>
    </v-content>
    <v-btn fab bottom right color="pink" dark fixed @click="showAddSessionModal()">
      <v-icon>add</v-icon>
    </v-btn>
    <AddSessionForm></AddSessionForm>
    <v-footer app>Sessions &copy;{{ getCurrentYear() }}</v-footer>
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
  @Prop()
  public source!: string;

  public userMenu: boolean;
  public dateMenu: boolean;
  public drawer: any;
  public items: any[];

  @Getter
  public allTags!: string[];

  @Getter
  public showSnackbar!: boolean;

  @Getter
  public snackbarText!: string;

  @Mutation
  public showAddSessionModal!: void;

  constructor() {
    super();
    this.userMenu = false;
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
        route: '/tags'
      },
      { icon: 'settings', text: 'Settings', route: '/settings' },
      { icon: 'logout', text: 'Log out', route: '/logout' }
    ];
  }

  @Getter
  private currentUser!: firebase.User;

  private getUserName() {
    return this.currentUser ? this.currentUser.displayName : '';
  }

  private getUserEmail() {
    return this.currentUser ? this.currentUser.email : '<unknown email>';
  }

  private getUserPhotoUrl() {
    return this.currentUser ? this.currentUser.photoURL : '#';
  }

  private getCurrentYear() {
    return new Date().getFullYear();
  }

  private logout() {
    this.userMenu = false;
    return this.$router.replace('/logout');
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
    return this.allTags.map(t => {
      return {
        icon: 'label',
        text: t,
        route: `/tag/${t.toLowerCase()}`
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

.v-footer {
  padding-left: 5px;
}

.button-link {
  cursor: pointer;
  color: var(--v-primary-base);
}
</style>
