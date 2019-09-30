<template>
  <section>
    <v-container>
      <v-layout row wrap class="mx-12">
        <v-flex xs12 sm12 md7 lg7 class="mt-5">
          <h6>Last Published On - 17th September 2019</h6>
        </v-flex>
        <v-flex
          xs12
          sm12
          md4
          lg4
          :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-9': $vuetify.breakpoint.mdAndUp , 'mt-5': $vuetify.breakpoint.mdAndUp , 'text-right': $vuetify.breakpoint.mdAndUp }"
          flat
        >
          <v-btn
            small
            v-if="UserProfileData.publishUuid"
            class="primary mr-1 text-none"
            text
            :to="`/viewProfile?id=${UserProfileData.publishUuid}`"
            target="_blank"
          >My Public Profile</v-btn>
          <v-btn small class="primary text-none" @click="publishProfile" text>Publish Profile</v-btn>
        </v-flex>

        <v-flex xs12 sm12 md8 lg8 class="mt-5">
          <v-card class="px-2 py-2">
            <v-list-item>
              <v-list-item-avatar color="grey" size="85">
                <v-img v-if="UserProfileData.userImg!=null" :src="UserProfileData.userImg"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  class="headline mb-2"
                  small
                >{{this.UserProfileData.firstName}} {{this.UserProfileData.lastName}}</v-list-item-title>
                <v-list-item-subtitle>{{this.UserProfileData.employeeNumber}} | {{this.UserProfileData.designation}} | {{this.UserProfileData.buName}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>

          <!-- Summary -->

          <v-row class="mt-3">
            <v-col>
              <v-card class="mx-auto px-2 py-2">
                <v-card-title>
                  <h4>Summary</h4>
                  <v-spacer></v-spacer>
                  <v-btn text icon>
                    <v-icon
                      medium
                      color="blue darken-2"
                      @click="openDialog('summary','Edit Summary', UserProfileData.userSummary)"
                    >mdi-pencil</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <p class="text-justify">{{this.UserProfileData.userSummary}}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- Skills -->
          <v-row>
            <v-col>
              <v-card class="mx-auto px-2 py-2">
                <v-card-title>
                  <h4>Skills</h4>
                  <v-spacer></v-spacer>
                  <v-btn text icon>
                    <v-icon
                      medium
                      color="blue darken-2"
                      @click="openDialog('skill','Edit Skills',UserProfileData.allSkills.secondary)"
                    >mdi-pencil</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text>
                  <p class="text-justify"></p>
                  <p class="text-left font-weight-black mt-n5">Primary Skills</p>
                  <v-chip
                    class="ma-1"
                    v-model="UserProfileData"
                    v-for="(primarySkills, i) in UserProfileData.allSkills.primary"
                    :key="i"
                  >{{primarySkills.name}}</v-chip>
                  <p class="text-justify"></p>
                  <p class="text-left font-weight-black mt-n2">All Skills</p>
                  <v-chip
                    class="ma-1"
                    v-model="UserProfileData"
                    v-for="(secondarySkills, i) in UserProfileData.allSkills.secondary"
                    :key="i.id"
                  >{{secondarySkills.name}}</v-chip>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Projects -->
          <v-row>
            <v-col>
              <v-card
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp ,  }"
              >
                <v-card-title>
                  <h4>Experience Details</h4>
                  <v-spacer></v-spacer>
                  <v-btn text icon>
                    <v-icon
                      medium
                      color="blue darken-2"
                      @click="openDialog('project','Add Project',projectModel)"
                    >mdi-plus</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card
                  class="mx-auto mt-n5"
                  flat
                  v-model="UserProfileData"
                  v-for="(expdetails, i) in UserProfileData.employeeEntity.expdetails"
                  :key="i"
                >
                  <v-card-title>
                    <h5 class="width-h">{{expdetails.projectName}}</h5>
                    <v-spacer></v-spacer>
                    <v-btn text icon>
                      <v-icon
                        medium
                        color="blue darken-2"
                        @click="openDialog('project','Edit Project',expdetails)"
                      >mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n4">{{expdetails.duration}}</p>
                    <v-chip
                      class="ma-1"
                      v-model="UserProfileData"
                      v-for="(expdetails, i) in expdetails.skills.split(',')"
                      :key="i"
                    >{{expdetails}}</v-chip>
                    <p class="text-justify">{{expdetails.projectDesc}}</p>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <!-- cerifications -->
          <v-row>
            <v-col>
              <v-card
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp ,  }"
              >
                <v-card-title>
                  <h4>Certifications</h4>
                  <v-spacer></v-spacer>
                  <v-btn text icon>
                    <v-icon
                      medium
                      color="blue darken-2"
                      @click="openDialog('certificate','Add Certification',UserProfileData.certification)"
                    >mdi-plus</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card
                  class="mx-auto mt-n5"
                  flat
                  model="UserProfileData"
                  v-for="(certification, i) in UserProfileData.certification"
                  :key="i"
                >
                  <v-card-title>
                    <h6 class="width-h">{{certification.title}}</h6>
                    <v-spacer></v-spacer>
                    <v-btn text icon>
                      <v-icon
                        medium
                        color="blue darken-2"
                        @click="openDialog('certificate','Edit Certification',UserProfileData.certification)"
                      >mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n3 font-weight-bold">{{certification.university}}</p>
                    <p
                      class="text-justify mt-n3"
                    >{{certification.startDate}} - {{certification.endDate ? certification.endDate : 'N/A'}}</p>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <!-- Article -->
          <v-row>
            <v-col>
              <v-card
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp , }"
              >
                <v-card-title>
                  <h4>Articles</h4>
                  <v-spacer></v-spacer>
                  <v-btn text icon>
                    <v-icon
                      medium
                      color="blue darken-2"
                      @click="openDialog('article','Add Article',UserProfileData.articles)"
                    >mdi-plus</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card
                  class="mx-auto"
                  flat
                  model="UserProfileData"
                  v-for="(articles, i) in UserProfileData.employeeEntity.articles"
                  :key="i"
                >
                  <v-card-title class="mt-n5">
                    <h6 class="width-h">
                      <a :href="articles.url" target="_blank">{{articles.title}}</a>
                    </h6>
                    <v-spacer></v-spacer>
                    <v-btn text icon>
                      <v-icon
                        medium
                        color="blue darken-2"
                        @click="openDialog('article','Edit Article',UserProfileData.employeeEntity.articles)"
                      >mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n3">Jan-2016-Oct-2019</p>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
          <!-- Achivements -->
          <v-row>
            <v-col>
              <v-card
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp , }"
              >
                <v-card-title>
                  <h4>Achievements</h4>
                  <v-spacer></v-spacer>
                  <v-btn text icon>
                    <v-icon
                      medium
                      color="blue darken-2"
                      @click="openDialog('achievement','Achievements',UserProfileData.achivements)"
                    >mdi-plus</v-icon>
                  </v-btn>
                </v-card-title>

                <v-card
                  class="mx-auto"
                  flat
                  model="UserProfileData"
                  v-for="(achivements, i) in UserProfileData.achivements"
                  :key="i"
                >
                  <v-card-title class="mt-n5">
                    <h6 class="width-h">{{achivements.title}}</h6>
                    <v-spacer></v-spacer>
                    <v-btn text icon>
                      <v-icon
                        medium
                        color="blue darken-2"
                        @click="openDialog('achievement','Achievements',UserProfileData.achivements)"
                      >mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n3">{{achivements.description}}</p>
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>

        <v-flex
          xs12
          sm12
          md4
          lg4
          :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-5': $vuetify.breakpoint.mdAndUp ,'mt-5': $vuetify.breakpoint.mdAndUp , }"
        >
          <v-card class="mx-auto px-2">
            <v-card-title>
              <h4>Social Links</h4>
              <v-spacer></v-spacer>
              <v-btn text icon>
                <v-icon
                  medium
                  color="blue darken-2"
                  @click="openDialog('sociallinks','Social Links',UserProfileData.socialLinks)"
                >mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list disabled class="mt-n7 mx-n3 mb-n4">
                <v-list-item-group color="primary" v-model="UserProfileData">
                  <v-list-item
                    v-for="(u, i) in UserProfileData.employeeEntity.socialLinks"
                    :key="i"
                  >
                    <v-list-item-icon>
                      <i :class="'fa fa-'+[u.linkType]+'-square icon-style'" class="social-icon"></i>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <a :href="u.url" target="_blank">{{u.url}}</a>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-snackbar
        :right="true"
        :top="true"
        v-model="snackbar"
        :timeout="timeout"
        color="primary"
      >{{ text }}</v-snackbar>
      <v-snackbar
        :right="true"
        :top="true"
        v-model="snackbarPublish"
        :timeout="timeout"
        color="primary"
      >{{ published }}</v-snackbar>
    </v-container>
    <section>
      <Popup
        :dialogFlag="dialogFlag"
        :title="title"
        :slotName="slotName"
        :model="modelData"
        @openDialog="openDialog"
        @closeDialog="closeDialog"
        @saveSummary="saveSummary"
        @saveSkills="saveSkills"
        @saveProject="saveProject"
        @saveCertificate="saveCertificate"
        @saveArticle="saveArticle"
      ></Popup>
    </section>
  </section>
</template>
<script>
import Popup from "../components/Popup";
import Summary from "../components/Summary";
import Skills from "../components/Skills";
import Project from "../components/Project";
import Certificate from "../components/Certificate";
import Article from "../components/Article";
import Achievement from "../components/Achievement";
import SocialLink from "../components/SocialLink";
import { apiService } from "../_services/apiSerivce.js";

export default {
  components: {
    Popup
  },
  data() {
    return {
      projectModel: {
        createdAt: "",
        updatedAt: "",
        projectName: "",
        duration: "",
        employeeInfo: "",
        skills: "",
        projectDesc: ""
      },
      UserProfileData: [],
      snackbar: false,
      text: "Data updated successfully!",
      timeout: 2000,
      dialogFlag: false,
      slotName: "",
      title: "",
      modelData: "",
      published: "",
      snackbarPublish: ""
    };
  },
  methods: {
    openDialog(sectionName, titleName, model) {
      this.dialogFlag = true;
      this.slotName = sectionName;
      this.title = titleName;
      this.modelData = model;
    },

    closeDialog() {
      this.dialogFlag = false;
    },

    // Save summary
    saveSummary(summary) {
      const summaryPayload = {
        summary,
        id: summary.id
      };
      apiService.updateSummary(summaryPayload).then(
        response => {
          this.UserProfileData.userSummary = response.summary;
          this.snackbar = true;
          this.closeDialog();
        },
        error => {
          this.error = error;
        }
      );
      this.closeDialog();
    },
    //save skills
    saveSkills(skills) {
      console.log("Save skills clicked", skills);
      if (skills.delete.length !== 0) {
        console.log("delete skills", skills.delete);
        const skillDeletePayload = {
          employeeInfo: this.UserProfileData.id,
          skills: skills.delete
        };
        apiService.deleteSkills(skillDeletePayload).then(
          response => {
            this.UserProfileData.skills = response.skills;
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      }
      if (skills.select.length !== 0) {
        const skillPostPayload = {
          employeeInfo: this.UserProfileData.id,
          skills: skills.select
        };
        apiService.saveSkills(skillPostPayload).then(
          response => {
            this.UserProfileData.skills = response.skills;
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      }
    },
    publishProfile() {
      const profilePublishPayload = {
        employeeNumber: this.UserProfileData.employeeNumber
      };
      apiService.publishProfile(profilePublishPayload).then(
        response => {
          this.snackbarPublish = true;
        },
        error => {
          this.error = error;
        }
      );
    },
    saveProject(project) {
      console.log("Save project clicked", project);
      const projectPayload = {
        duration: new Date().getFullYear(),
        description: project.projectDesc,
        projectName: project.projectName,
        skillSet: project.skills,
        employeeInfo: this.UserProfileData.id
      };
      //Update
      if (project.id) {
        apiService.updateExpDetails(projectPayload).then(
          response => {
            this.UserProfileData.expdetails = response;
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      } else {
        apiService.saveExpDetails(projectPayload).then(
          response => {
            // this.UserProfileData['expdetails'] = [];
            // this.UserProfileData['expdetails'].push(response);
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      }
    },
    saveCertificate(certificate) {
      console.log("Save certificate clicked", certificate);
      const certificatePayload = {
        title: certificate.title,
        startDate: certificate.univstartDateersity,
        endDate: certificate.endDate,
        employeeInfo: this.UserProfileData.id
      };
      if (certificate.employeeInfo) {
        apiService.updateCertificate(certificatePayload).then(
          response => {
            this.UserProfileData.certificate = response;
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      } else {
        apiService.saveCertificate(certificatePayload).then(
          response => {
            this.UserProfileData.article = response;
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      }
    },
    saveArticle(article) {
      console.log("Save article clicked", article);
      const articlePayload = {
        title: article.title,
        date: article.date,
        url: article.url,
        employeeInfo: 1
      };
      if (article.id) {
        apiService.updateArticle(articlePayload).then(
          response => {
            this.UserProfileData.article = response;
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      } else {
        apiService.saveArticle(articlePayload).then(
          response => {
            this.UserProfileData.article = response;
            this.snackbar = true;
            this.closeDialog();
          },
          error => {
            this.error = error;
          }
        );
      }
    },
    saveAchievement(achievement) {
      console.log("Save achievement clicked", achievement);
    },
    saveSocialLink(socialLink) {
      console.log("Save socialLink clicked", socialLink);
    }
  },
  created() {
    apiService.getProfileInfo().then(
      response => {
        // eslint-disable-next-line
        console.log("Object", response);
        this.UserProfileData = response;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
};
</script>

<style scoped>
.width-h {
  width: 70%;
}
.social-icon {
  font-size: 24px;
  color: #1976d2;
}
</style>