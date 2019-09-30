<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg12>
        <v-label class="caption">Skills & Technologies</v-label>
        <!-- <v-textarea v-model="skillList" rows="4"></v-textarea> -->
        <div>
          <v-chip
            close
            @click:close="deleteChip(skill, i)"
            class="ma-1"
            v-for="(skill, i) in list"
            :key="i"
          >{{skill.name}}</v-chip>
        </div>
        <v-autocomplete
        v-model="selectedList"
          :multiple="true"
          :deletable-chips="true"
          :items="skillList"
          item-value="id"
          item-text="name"
          :small-chips="true"
          :auto-select-first="false"
          v-on:change="onSelectSkill()"
        ></v-autocomplete>
        <v-btn class="primary float-right" @click="onSave">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { apiService } from "../_services/apiSerivce";
export default {
  props: ["skills"],
  data: () => ({
    list: "",
    skillList: [],
    selectedList: [],
    deleteList: []
  }),
  methods: {
    onSave() {
      this.$emit("saveSkills", {'select': this.selectedList, 'delete': this.deleteList});
    },
    deleteChip(skill, index) {
      console.log('deleted', skill, index)
      this.deleteList.push(skill.id)
      this.list.splice(index, 1);
    },
    onSelectSkill: function(e){
       console.log('selected', this.selectedList)
    }
  },
  created() {
    console.log("Skills in dialog", this.skills);
    this.list = this.skills;
    apiService.getSkills().then(response => {
      console.log("Skills in api call", response);
      this.skillList = response;
    });
  }
};
</script>