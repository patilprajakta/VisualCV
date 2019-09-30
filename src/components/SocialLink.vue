<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 no-glutter>
        <form @submit.prevent="onSubmit">
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col class="pt-0">
                  <div class="form-group mb-0">
                    <v-text-field
                      v-for="(link, i) in socialLink"
                      :key="i"
                      class="mt-0 py-3"
                      :label="[link.type]+' url'"
                      v-model="link.url"
                      style="text-transform:capitalize;"
                    ></v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mt-0 mx-0"></v-divider>
              <!-- <v-btn medium class="error text-none float-left">Delete</v-btn> -->
              <v-btn medium class="primary text-none float-right" @click="onSave()">Save</v-btn>
            </v-card-text>
          </v-card>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["socialLink"],
  data: () => ({}),
  methods: {
    onSave() {
      this.$emit("saveSocialLink", this.socialLink);
    }
  },
  created() {
    console.log("Social from home page", this.socialLink);
  }
};
</script>
                