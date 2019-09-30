<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12 class="mt-5">
        <v-row xs12 sm12 md12 lg12 >
          <v-flex md2 >
          <v-col xs12 sm12 md3 lg3 class="mr-10">
            <v-select
              v-on:change="buDropdown"
              :items="dropDownItems"
              menu-props="auto"
              label="ALL"
              hide-details
              single-line
              v-if="enableDropdown"
            ></v-select>
          </v-col>
          </v-flex>
          <v-col xs12 sm12 md3 lg3 class="mr-5">
            <v-text-field
              @keyup.enter.native="onClickName(name,$event)"
              v-model="name"
              label="Search By Name"
              single-line
              hide-details
              @focus="clearSkills"
            ></v-text-field>
          </v-col>
          <v-col xs12 sm12 md3 lg3 class="mr-5">
            <v-autocomplete
              v-model="selectedSkills"
              :multiple="true"
              :deletable-chips="true"
              :small-chips="true"
              :items="allEmpSkills"
              placeholder="Search By Skills"
              :auto-select-first="false"
              v-on:change="onClickSkill(item)"
              autocomplete="off"
              @focus="clearName"
              @formchange="clearName"
            ></v-autocomplete>
          </v-col>
          <v-col  xs12 sm12 md5 lg6 class="ml-5">
            <v-row xs12 sm12 md12 lg12  style="font-size: 13px;">
                <span class="mt-5">Must Include All Skills</span>
                <v-switch v-model="includeSkills" class="ml-5"></v-switch>
            </v-row>
          </v-col>
        </v-row>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="employees"
          :page.sync="page"
          :items-per-page="15"
          hide-default-footer
          class="elevation-1"
          @click:row="empRowClick"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">EDIT</v-icon>
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="totalPageCount"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { employeeDirectoryService } from "../_services/employeeDirectoryService";
import { authenticationService } from "../_services/authenticationService";
import { Role } from "../_helpers/role";
import { apiSerivce } from "../_services/apiSerivce.js";

export default {
  props: ["skills"],
  data() {
    return {
      empProfileId:"",
      totalPageCount: "",
      empName: "",
      buName: "",
      list: "",
      allEmpSkills: [],
      loading: false,
      isSkills: false,
      includeSkills:false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [],
      employees: [],
      selectedSkills: [],
      dropDownItems: [
        "BU-1","BU-2", "BU-3", "BU-4", "BU-5", "BU-6", "BU-7","BU-8","BU-9"
      ],
      dropDownValue: [
        "BU-1","BU-2", "BU-3", "BU-4", "BU-5", "BU-6", "BU-7","BU-8","BU-9"
      ],
      searchText: "",
      items: [],
      lastSelectItem: {},
      currentRole: "",
      defaultSkillCat: "ALL"
    };
  },
  created() {
    this.loading = true;
    //get all skills
     employeeDirectoryService.getAllEmpSkills().then(
        response => {
          this.loading = false;
          this.allEmpSkills = response;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    this.allEmpManipulation(0);
  },
  //watcher for pagination and skills switch
  watch: {
    page(newPage) {
      this.allEmpManipulation(newPage - 1);
    },
    includeSkills(newValue) {
      this.isSkills = newValue;
      this.allEmpManipulation();
    }
  },
  methods: {
    //get all employees
    allEmpManipulation(page) {
      this.loading=true;
      var empPayload = {
        role: authenticationService.currentUserValue.role.join(),
        nameTerm: this.empName,
        skillTerm: this.selectedSkills ? this.selectedSkills.join() : "",
        bu: this.buName,
        operator: this.isSkills ? "AND" : "OR",
        pageNumber: page
      };
      employeeDirectoryService.getAllEmployees(empPayload).then(
        response => {
          this.loading = false;
          this.rolewiseHeader();
          this.employees = response.employeeDirectories;
          this.empProfileId=response.employeeDirectories.profileId;
          this.totalPageCount = response.pageDetails.totalPages;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    },
    //on click of EDIT for actions column
    editItem(item) {
      this.$router.push("/myProfile?empid=" + item.employeeId);
    },
    clearName() {
      return (this.empName = null);
    },
    clearSkills() {
      return (this.selectedSkills = null);
    },
    empRowClick(itemId) {
      if(itemId.profileId)
      this.$router.push("/viewProfile?id="+itemId.profileId);
    },
    enableDropdown() {
      return currentRole == Role.BUHead;
    },
    buDropdown(bu) {
      this.buName = bu;
      this.allEmpManipulation(0);
    },
    rolewiseHeader() {
      var allHeaders = [];
      var currentRole = authenticationService.currentUserValue.role;
      if (currentRole.includes(Role.BUHead)) {
        allHeaders.push(
          { value: "bu", text: "BU" ,sortable: false},
          { value: "fullName", text: "Name" },
          { value: "designation", text: "Designation",sortable: false },
          { value: "email", text: "Comapany Email",sortable: false },
          { value: "skypeId", text: "Skype ID",sortable: false },
          { value: "skills", text: "Skills" ,sortable: false}
        );
      } else if (currentRole.includes(Role.Emp)) {
        allHeaders.push(
          { value: "fullName", text: "Name" },
          { value: "email", text: "Company Email",sortable: false },
          { value: "skypeId", text: "Skype ID",sortable: false, },
          { value: "skills", text: "Skills" ,sortable: false}
        );
      } else {
        allHeaders.push(
          { value: "employeeId", text: "Employee ID", sortable: false },
          { value: "fullName", text: "Name" },
          { value: "designation", text: "Designation", sortable: false },
          { value: "email", text: "Company Email", sortable: false },
          { value: "skypeId", text: "Skype ID", sortable: false },
          { value: "lastUpdated", text: "Last Updated", sortable: false },
          { text: "action", value: "Action", sortable: false }
        );
      }
      this.headers = allHeaders;
    },
    onClickSkill(skill) {
      this.name = null;
      this.allEmpManipulation(0);
    },
    onClickName(name, event) {
      this.empName = name;
      this.allEmpManipulation(0);
    }
  }
};
</script>
<style>
td.text-start {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
