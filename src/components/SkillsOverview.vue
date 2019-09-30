<template>
  <v-card class="skill-overview-back-color">
    <v-toolbar :dark="false" :dense="true" :extended="false" class="main-skill-tab">
      <template>
        <v-tabs
          :centered="true"
          :center-active="true"
          background-color="transparent"
          slider-color="white"
        >
          <v-tab class="skill-text-case"
            v-for="desgCat in desgCategory"
            :key="desgCat.value"
            :href="'#tab-' + desgCat.value"
            @click="getSkillsByDesg(desgCat.value)"
          >{{ desgCat.text }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-container>
      <v-layout row wrap class="mx-12">
        <v-flex xs12 sm12 md12 lg12 class="mt-5">
          <v-row xs12 sm12 md12 lg12>
            <v-col xs12 sm12 md6 lg6>
              <v-text-field append-icon="search" v-if="!isHidden" label="Search Skills" v-model="search" class="mx-4"></v-text-field>
            </v-col>
             <v-col xs12 sm12 md6 lg6>
            </v-col>
          </v-row>
          <v-row xs12 sm12 md12 lg12>
          <v-col xs12 sm12 md6 lg6>
            <v-data-table
              :loading="loading"
              :headers="headers"
              :items="skillMatrixResponse"
              item-key="name"
              :search="search"
              class="skill-matrix skill-datatable skill-overview-back-color"
              :items-per-page="15"
              :sort-by="['count']"
              :sort-desc="true"
              :hide-default-footer="true"
            >
              <template v-slot:top>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Employee List</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-data-table
                          :loading="empLoading"
                          :headers="employeeHeaders"
                          :items="empFilterData"
                          item-key="empname"
                          :search="search"
                          class="skill-matrix skill-datatable"
                          :items-per-page="15"
                        >
                        <template v-slot:item.name="{ item }">
                          <component :is="item.profileId?'a':'span'" :href="`/#/viewProfile?id=${item.profileId}` || ''">{{item.name}}
                            </component>
                       </template>
                        </v-data-table>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.count="{ item }">
                <a text
                  small
                  class="mr-2"
                  @click="openEmployeeListPopup(item.skill)"
                >{{ item.count }}</a>
              </template>
            </v-data-table>
          </v-col>
          <v-col xs12 sm12 md6 lg6>
            </v-col>
        </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { skillMatrixService } from "../_services/skillMatrixServices.js";
import { employeeDirectoryService } from "../_services/employeeDirectoryService.js";

export default {
  data() {
    return {
      dialog: false,
      editedItem: [],
      isHidden: false,
      search: "",
      employeelist: [],

       desgCategory: [
        { value: "ALL", text: "All Skills" },
        { value: "DEVELOPER", text: "Developer" },
        { value: "DESIGNER", text: "Designer" },
        { value: "QA", text: "QA" },
        { value: "PM", text: "PO/PM" }
       ],
      empFilterData: [],
      loading: false,
      empLoading:false,
      defaultSkillCat: "ALL",
      headers: [
        { text: "Skills", align: "left", sortable: false, value: "skill" },
        {
          text: "Count",
          value: "count",
          align: "left",
          sortable: true
        }
      ],
      employeeHeaders: [
        { text: "Name", align: "left", value: "name",sortable: true },
        { text: "Email", value: "email", align: "right", sortable: false }
      ],
      skillMatrixResponse: []
    };
  },
  created() {
    this.loading = true;

    skillMatrixService.getAllSkills(this.defaultSkillCat).then(response => {
    console.log(response);
      this.loading = false;
      this.skillMatrixResponse = response;
    });

   
  },

  methods: {
    
    getSkillsByDesg(type) {
      this.loading = true;
      if (type == this.defaultSkillCat) {
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }

      skillMatrixService.getAllSkills(type).then(response => {
        this.loading = false;
        this.skillMatrixResponse = response;
      });
    },
    openEmployeeListPopup(skill) {
      this.dialog = true;
      this.empLoading = true;
      console.log(skill);
      employeeDirectoryService.getAllEmployeeBySkill(skill).then(response => {
        console.log(response);
        
        for (var i = 0; i < response.length; i++) {
          console.log(response);
          this.empFilterData.push({
            name: response[i].firstName+' '+response[i].lastName,
            email: response[i].email,
            profileId: response[i].profileId
          });
        }
        this.empLoading = false;
         
      });
     
      this.empFilterData=[];
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style>
.skill-datatable table tbody tr td,
.skill-datatable table thead tr th,
.skill-datatable.v-data-table .v-data-footer {
  border-bottom: none !important;
}
.skill-overview-back-colora {
  background-color: #e5e5e5 !important;
}
.skill-text-case {
  text-transform: none !important;
}
.main-skill-tab a.v-tab--active {
  border-bottom: 4px solid #1976d2
}
</style>