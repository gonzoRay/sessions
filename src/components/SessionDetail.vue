<template>
  <div>
    <div class="back">
      <v-btn flat small color="primary" @click="gotoList()">Back to Sessions</v-btn>
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
  @Prop({ required: true })
  private id!: string;

  private item!: Session;

  @Getter
  private getSessionById!: (id: string) => Session;

  @Mutation
  private toggleFavorite: any;

  @Action
  private deleteSessionAsync: any;

  @Action
  private showAlert: any;

  protected created() {
    if (!this.id) {
      this.gotoList();
    }

    this.item = this.getSessionById(this.id);

    if (!this.item) {
      this.gotoList();
    }
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

  private gotoList() {
    this.$router.replace('/sessions');
  }
}
</script>

<style lang="stylus">
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
