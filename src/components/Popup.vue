<template>
  <section>
    <v-dialog persistent no-click-animation :value="dialogFlag" @input="$emit('input')" width="60%">
      <v-card>
        <v-card-title class="title" primary-title>
          {{title}}
          <v-spacer></v-spacer>
          <v-btn small text @click="closeDialog" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <!-- Summary -->
          <div v-if="slotName=='summary'">
            <Summary :summary="model" @saveSummary="saveSummary" />
          </div>
          <!-- Skills -->
          <div v-if="slotName=='skill'">
            <Skills :skills="model" @saveSkills="saveSkills" />
          </div>
          <!-- Project -->
          <div v-if="slotName=='project'">
            <Project :project="model" @saveProject="saveProject" />
          </div>
          <!-- Certification -->
          <div v-if="slotName=='certificate'">
            <Certificate :certificate="model" @saveCertificate="saveCertificate" />
          </div>
          <!-- Articles -->
          <div v-if="slotName=='article'">
            <Article :article="model" @saveArticle="saveArticle" />
          </div>
          <!-- Achivement -->
          <div v-if="slotName=='achievement'">
            <Achievement :achievement="model" @saveAchievement="saveAchievement" />
          </div>

          <!-- Social Links -->
          <div v-if="slotName=='sociallinks'">
            <SocialLinks :socialLink="model" @saveSocialLink="saveSocialLink" />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>


<script>
import Summary from "../components/Summary";
import Skills from "../components/Skills";
import Project from "../components/Project";
import Certificate from "../components/Certificate";
import Article from "../components/Article";
import Achievement from "../components/Achievement";
import SocialLinks from "../components/SocialLink";
import ConfirmDialog from "../components/ConfirmDialog";

export default {
  components: {
    Summary,
    Skills,
    Project,
    Certificate,
    Article,
    Achievement,
    SocialLinks,
    ConfirmDialog
  },
  props: ["dialogFlag", "title", "slotName", "model"],
  data() {
    return {
      formValid: "",
      confirmFlag: false
    };
  },
  methods: {
    openDialog() {
      this.$emit("openDialog", "");
    },
    closeDialog(userImput) {
      this.$emit("closeDialog", "");
    },

    saveSummary(value) {
      this.$emit("saveSummary", value);
    },
    saveSkills(value) {
      this.$emit("saveSkills", value);
    },
    saveProject(value) {
      this.$emit("saveProject", value);
    },
    saveCertificate(value) {
 this.$emit("saveCertificate", value);
    },
    saveArticle(value) {
       this.$emit("saveArticle", value);
    },
    saveAchievement() {},
    saveSocialLink() {}
  }
};
</script>

<style scoped>
.icon-text {
  padding-right: 85px;
  color: #1976d2 !important;
}
</style>