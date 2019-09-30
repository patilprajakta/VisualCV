<template>
  <v-container class="mx-0">
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSubmit">
          <v-card flat>
            <v-card-text>
              <div class="form-group mb-0">
                <v-text-field class="mt-0" label="Title" v-model="achievement.title"></v-text-field>
              </div>
              <div class="form-group mb-0">
                <v-textarea class="mt-0" label="Description" v-model="achievement.description"></v-textarea>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-btn medium class="error mr-2 text-none float-left">Delete</v-btn>
            <v-btn medium class="primary text-none float-right" @click="onSave()">Save</v-btn>
          </v-card>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["achievement"],
  data: () => ({}),
  methods: {
    onSave() {
      this.$emit("saveAchievement", this.achievement);
    }
  },
  created() {
    console.log("Achievement from home page", this.achievement);
  }
};
</script>