<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 no-glutter>
        <form @submit.prevent="onSubmit">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div class="form-group mb-0">
                    <v-text-field class="mt-0" label="Title" v-model="article.title"></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="form-group mb-0">
                    <v-text-field class="mt-0" label="URL" v-model="article.url"></v-text-field>
                  </div>
                </v-col>
              </v-row>
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
  props: ["article"],
  data: () => ({
    skillList: [],
    list: []
  }),
  methods: {
    onSave() {
      this.$emit("saveArticle", this.article);
    }
  },
  created() {
    console.log("Article from home page", this.article);
  }
};
</script>
        