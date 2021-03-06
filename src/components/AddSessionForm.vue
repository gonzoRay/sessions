<template>
    <v-dialog :value="showAddModal" width="800px">
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
                        <v-flex xs12>
                            <v-combobox
                                prepend-icon="label"
                                v-model="newSession.tags"
                                :items="allTags"
                                label="Tags"
                                multiple
                                chips
                                deletable-chips
                            ></v-combobox>
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
import { Getter, Mutation, Action } from 'vuex-class';
import { mutations } from '@/store/mutations';
import { Session } from '@/types';
import format from 'date-fns/format';

@Component
export default class AddSessionForm extends Vue {
  private showDateMenu = false;

  @Getter
  private showAddModal!: boolean;

  @Action
  private addSessionAsync: any;

  @Mutation
  private hideAddSessionModal: any;

  @Getter
  private allTags!: string[];

  private newSession: Session = {} as Session;

  constructor() {
    super();

    this.newSession = {
      id: '',
      title: '',
      description: '',
      datetime: '',
      speaker: '',
      isFavorite: false,
      tags: [],
      createdByUid: ''
    } as Session;

    this.resetNewSession();
  }

  private saveSession(data: Session): void {
    this.addSessionAsync(data);
    this.resetNewSession();
    this.hideAddSessionModal();
  }

  private resetNewSession() {
    this.newSession = {
      id: '',
      title: '',
      description: '',
      datetime: '',
      speaker: '',
      isFavorite: false,
      tags: [],
      createdByUid: ''
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

<style lang="stylus">
</style>
