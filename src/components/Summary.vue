<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm12 md12 lg12>
        <v-form class="form validators">
          <v-label class="caption">Experience Summary</v-label>
          <v-textarea v-model="summaryText" rows="6"></v-textarea>
          <v-btn class="primary float-right" @click="onSave">Save</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import { required } from "vuelidate/lib/validators";

export default {
  // validations: {
  //   summaryText: {
  //     required
  //   }
  // },
  props: ["summary"],
  data: () => ({
    summaryText: ""
  }),
  methods: {
    onSave() {
      this.$emit("saveSummary", this.summaryText);
    }
  },

  created() {
    this.summaryText = this.summary;
    console.log("Coming data", this.summary);
  }
};
</script>