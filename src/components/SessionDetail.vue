<template>
  <div>
    <div class="back">
      <v-btn flat small color="primary" @click="gotoList()">Back to Sessions</v-btn>
    </div>
    <div class="detail-wrapper">
      <div class="title">
        {{ item.title }}
        <v-icon class="delete" @click="deleteSession(item.id)">delete</v-icon>
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
import { AppState, Session, SessionUser } from '@/types';
import { State, Getter, Mutation, Action } from 'vuex-class';
import ConfirmModal from '@/components/ConfirmModal.vue';
import { userCollection } from '@/store/db';

@Component({
  components: {
    ConfirmModal
  }
})
export default class SessionDetail extends Vue {
  @Prop({ required: true })
  private id!: string;

  private createdByUser!: string | null;

  private item!: Session;

  @Getter
  private getSessionById!: (id: string) => Session;

  @Action
  private deleteSessionAsync: any;

  @Action
  private showAlert: any;

  constructor() {
    super();
    this.createdByUser = '';
  }

  protected created() {
    if (!this.id) {
      this.gotoList();
    }

    this.item = this.getSessionById(this.id);

    if (!this.item) {
      this.gotoList();
    }

    if (!this.item.createdByUid) {
      return;
    }

    this.getUserByUid(this.item.createdByUid).then(result => {
      if (result.empty) {
        this.createdByUser = 'no user found';
      }

      const sessionUser = result.docs[0].data() as SessionUser;

      this.createdByUser = sessionUser ? sessionUser.name : 'unknown user';
    });
  }

  private getUserByUid(uid: string): Promise<firebase.firestore.QuerySnapshot> {
    return userCollection.where('uid', '==', uid).get();
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

.delete {
  padding-left: 15px;
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

.menu {
  float: right;
}
</style>
