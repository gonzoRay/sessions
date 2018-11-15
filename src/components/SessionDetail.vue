<template>
  <div>
    <div class="back">
      <v-btn flat small color="primary" @click="back">Back to Sessions</v-btn>
    </div>
    <div class="detail-wrapper">
      <div class="title">
        {{ item.title }}
        <v-icon
          class="favorite"
          @click="toggleFavorite(item)"
        >{{ item.isFavorite ? 'turned_in' : 'turned_in_not' }}</v-icon>
        <div class="delete">
          <v-menu bottom right>
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>delete</v-icon>
                </v-list-tile-action>
                <v-list-tile-title class="clickable" @click="deleteSession(item.id)">Delete Session</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>edit</v-icon>
                </v-list-tile-action>
                <v-list-tile-title class="clickable" @click="editSession(item.id)">Edit Session</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </div>
      <span class="speaker">{{ item.speaker }}</span>
      <div class="subheading">{{ item.description }}</div>
      <div class="tags">
        <v-chip v-for="tag in item.tags" :key="tag">{{ tag }}</v-chip>
      </div>
    </div>
    <ConfirmModal
      ref="deleteModal"
      prompt="Delete session?"
      agreeText="Delete"
      disagreeText="Cancel"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AppState, Session } from '@/types';
import { State, Getter, Mutation, Action } from 'vuex-class';
import ConfirmModal from '@/components/ConfirmModal.vue';

@Component({
  components: {
    ConfirmModal
  }
})
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

  constructor() {
    super();
  }

  protected created() {
    this.item = this.getSessionById(this.id);
  }

  private deleteSession(id: string): void {
    const deleteModal = this.$refs.deleteModal as ConfirmModal;
    deleteModal.show().then(confirmAction => {
      if (confirmAction) {
        this.deleteSessionAsync(id);
        this.$router.replace('/sessions');
        this.showAlert('Session deleted');
      }
    });
  }

  private back() {
    this.$router.replace('/sessions');
  }
}
</script>

<style>
.detail-wrapper {
  padding-left: 15px;
}

.back {
  padding-bottom: 15px;
}
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

.delete {
  float: right;
}
</style>
