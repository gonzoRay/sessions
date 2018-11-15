<template>
    <v-layout row justify-center>
        <v-dialog :value="showConfirmModal" persistent max-width="290">
            <!-- <v-btn slot="activator" color="primary">Open dialog</v-btn> -->
            <v-card>
                <v-card-title class="headline">{{ prompt }}</v-card-title>
                <v-card-text>{{ description }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary darken-1"
                        flat
                        @click.prevent="onDecline"
                    >{{ declineText }}</v-btn>
                    <v-btn color="primary darken-1" flat @click.native="onConfirm">{{ confirmText }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation, Action, Getter } from 'vuex-class';

@Component({})
export default class ConfirmModal extends Vue {
  @Prop({ default: 'Are you sure?' })
  private prompt!: string;

  @Prop({ default: 'This action cannot be undone.' })
  private description!: string;

  @Prop({ default: 'Yes' })
  private confirmText!: string;

  @Prop({ default: 'No' })
  private declineText!: string;

  @Action
  private toggleConfirmModal!: () => void;

  @Getter
  private showConfirmModal!: boolean;

  private resolve: any;

  public show() {
    this.toggleConfirmModal();
    return new Promise(resolve => {
      this.resolve = resolve;
    });
  }

  private onConfirm() {
    this.toggleConfirmModal();
    this.resolve(true);
  }

  private onDecline() {
    this.toggleConfirmModal();
    this.resolve(false);
  }
}
</script>

<style lang="stylus">
</style>
