<template>
  <v-container class="mx-0 py-0">
    <v-layout row>
      <v-flex xs12 no-glutter>
        <v-row>
          <v-col>
            <form @submit.prevent="onSubmit">
              <v-flex xs12>
                <div class="form-group mb-0">
                  <v-text-field
                    v-model="project.projectName"
                    class="mt-0 py-0"
                    label="Project Title"
                  ></v-text-field>
                </div>
              </v-flex>
              <v-flex xs12 md12 class="py-0">
                <v-row>
                  <!-- Start Date Picker -->
                  <v-col cols="2" sm="5">
                    <v-dialog
                      ref="dialogStart"
                      v-model="modalStart"
                      :return-value.sync="startDate"
                      persistent
                      width="300px"
                      height="100px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="startDate"
                          label="Start Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="startDate" type="month" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modalStart = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialogStart.save(startDate)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <!-- End Date Picker -->
                  <v-spacer></v-spacer>
                  <v-col cols="2" sm="5">
                    <v-dialog
                      ref="dialogEnd"
                      v-model="modalEnd"
                      :return-value.sync="endDate"
                      persistent
                      width="300px"
                      height="100px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="endDate"
                          label="End Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="endDate" type="month" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modalEnd = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialogEnd.save(endDate)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-flex>

              <v-row class="py-0">
                <v-col cols="12">
                  <v-label class="caption py-0">Skills & Technologies</v-label>
                  <div>
                    <v-chip
                      close
                      @click:close="deleteChip(skill, i)"
                      class="ma-1"
                      v-for="(skill, i) in project.skills.split(',')"
                      :key="i"
                    >{{skill}}</v-chip>
                  </div>
                  <v-autocomplete
                    :multiple="true"
                    :deletable-chips="true"
                    :items="skillList"
                    item-value="id"
                    item-text="name"
                    :small-chips="true"
                    :auto-select-first="false"
                    class="py-0"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row class="py-0">
                <v-col cols="12">
                  <v-label class="caption mt-0">Description</v-label>
                  <v-textarea class="mt-0 py-0" v-model="project.projectDesc  "></v-textarea>
                </v-col>
              </v-row>
              <v-btn medium class="error mr-2 text-none float-left">Delete</v-btn>
              <v-btn medium class="primary text-none float-right" @click="onSave">Save</v-btn>
            </form>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { apiService } from "../_services/apiSerivce";

export default {
  props: ["project"],
  data: () => ({
    skillList: [],
    list: [],
    startDate: new Date().toISOString().substr(0, 7),
    endDate: new Date().toISOString().substr(0, 7),
    modalStart: false,
    modalEnd: false
  }),
  methods: {
    onSave() {
      this.$emit("saveProject", this.project);
    },
    // saveProject() {
    //   var date = this.startDate;
    //   var dateend = this.endDate;
    //   this.$emit('saveProject', value)
    // }
  },
  created() {
    console.log("clicked project", this.project);
    apiService.getSkills().then(response => {
      console.log("Skills in api call", response);
      this.skillList = response;
    });
  }
};
</script>