<template>
  <v-dialog :value="confirmFlag" @input="$emit('input')" width="30%" height="50%">
    <v-card>
      <v-card-text class="py-10 px-5">
        <h5 class="mb-5 mt-0">You have unsaved changes. Do you want to discard the changes?</h5>
        <v-btn medium class="error text-none float-right mr-5" @click="onYesClick">Yes</v-btn>
        <v-btn medium class="primary text-none float-right mr-2" @click="onNoClick">No</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["confirmFlag"],
  data() {
    return {};
  },
  methods: {
    onNoClick() {
      this.$emit("closeConfirm", "no");
    },
    onYesClick() {
      this.$emit("closeConfirm", "yes");
      this.$emit("closeDialog", "yes");
    }
  }
};
</script>