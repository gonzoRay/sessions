<template>
    <v-dialog v-model="addSessionModalVisible" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Create session</v-card-title>
            <v-card-text>
                <v-container grid-list-sm class="pa-4">
                    <v-layout row wrap="">
                        <v-flex xs12 align-center justify-space-between>
                            <v-layout align-center>
                                <v-text-field
                                    v-model="newSession.title"
                                    prepend-icon="title"
                                    placeholder="Title"
                                    required
                                ></v-text-field>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                v-model="newSession.speaker"
                                prepend-icon="person_outline"
                                placeholder="Speaker"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-menu
                                ref="showDateMenu"
                                :close-on-content-click="false"
                                v-model="showDateMenu"
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
                                    required
                                ></v-text-field>
                                <v-date-picker
                                    v-model="newSession.datetime"
                                    @change="showDateMenu = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                                v-model="newSession.description"
                                prepend-icon="notes"
                                placeholder="Enter a brief description of your talk."
                                required
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="hideAddSessionModal">Cancel</v-btn>
                <v-btn flat @click="saveSession(newSession)">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { mutations } from '@/store/sessions';
import { Session } from '@/types';
import format from 'date-fns/format';

@Component
export default class AddSessionForm extends Vue {
  public showDateMenu = false;

  @Getter
  public addSessionModalVisible!: boolean;

  @Mutation
  public addSession: any;

  @Mutation
  public hideAddSessionModal: any;

  public newSession: Session = {} as Session;

  constructor() {
    super();

    this.newSession = {
      id: -1,
      title: '',
      description: '',
      datetime: '',
      speaker: '',
      isFavorite: false,
      tags: []
    } as Session;

    this.resetNewSession();
  }

  public saveSession(data: Session): void {
    this.addSession(data);
    this.resetNewSession();
    this.hideAddSessionModal();
  }

  private resetNewSession() {
    this.newSession = {
      id: -1,
      title: '',
      description: '',
      datetime: '',
      speaker: '',
      isFavorite: false,
      tags: []
    } as Session;
  }

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
}
</script>

<style>
</style>
