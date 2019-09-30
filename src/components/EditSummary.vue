<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12>
        <v-label class="caption">Experience Summary</v-label>
        <v-textarea v-model="summaryText" rows="6"></v-textarea>
        <v-btn class="primary float-right" @click="onSave()">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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
    console.log('Coming data', this.summary)
  }
};
</script>