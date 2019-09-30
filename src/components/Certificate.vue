<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 no-glutter>
        <form @submit.prevent="onSubmit">
          <v-card flat>
            <v-card-text>
              <div class="form-group mb-0">
                <v-text-field class="mt-0" label="Name" v-model="certificate.title"></v-text-field>
              </div>
              <div class="form-group mb-0">
                <v-text-field class="mt-0" label="Issued By" v-model="certificate.university"></v-text-field>
              </div>
              <v-row>
                <v-col cols="6">
                  <div class="form-group mb-0">
                    <v-text-field class="mt-0" label="Issued Date" v-model="certificate.startDate"></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="form-group mb-0">
                    <v-text-field
                      class="mt-0"
                      label="Expiry Date(Optional)"
                      v-model="certificate.endDate"
                    ></v-text-field>
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
  props: ["certificate"],
  data: () => ({
    skillList: [],
    list: []
  }),
  methods: {
    onSave() {
      this.$emit("saveCertificate", this.certificate);
    }
  },
  created() {
    console.log("Certificate from home page", this.certificate);
  }
};
</script>>
        