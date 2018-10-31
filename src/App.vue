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
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
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
    <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">Create session</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap="">
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field v-model="newSession.title" prepend-icon="title" placeholder="Title"></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="newSession.speaker"
                prepend-icon="person_outline"
                placeholder="Speaker"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-menu
                ref="dateMenu"
                :close-on-content-click="false"
                v-model="dateMenu"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  :value="dateFormatted"
                  label="Date of Session"
                  clearable
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="newSession.datetime" @change="dateMenu = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                v-model="newSession.description"
                prepend-icon="notes"
                placeholder="Enter a brief description of your talk."
              ></v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="saveSession(newSession)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer app>Sessions &copy;2018</v-footer>
  </v-app>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Sessions from './views/Sessions.vue';
import { Getter, Mutation } from 'vuex-class';
import { Session } from './types';
import format from 'date-fns/format';

@Component({
  components: {
    Sessions
  }
})
export default class App extends Vue {
  @Prop()
  public source!: string;

  public dateMenu: boolean;
  public drawer: any;
  public dialog: boolean;

  public items: object[];
  public newSession: Session = {} as Session;

  get newDate(): string {
    return this.newSession.datetime
      ? new Date(this.newSession.datetime).toISOString().substr(0, 10)
      : '';
  }

  set newDate(value) {
    this.newSession.datetime = value;
  }

  get dateFormatted(): string | null {
    return this.newDate ? format(this.newDate, 'dddd, MMMM Do YYYY') : '';
  }

  @Mutation
  public addSession: any;

  constructor() {
    super();
    this.dateMenu = false;
    this.drawer = null;
    this.dialog = false;

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

    this.resetNewSession();
  }

  public saveSession(data: Session): void {
    this.addSession(data);
    this.dialog = false;

    this.resetNewSession();
  }

  private resetNewSession() {
    this.newSession = {
      id: -1,
      title: '',
      description: '',
      datetime: '',
      speaker: '',
      tags: []
    } as Session;
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
