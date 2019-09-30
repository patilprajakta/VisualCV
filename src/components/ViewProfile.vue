<template>
  <div class="login back">
    <v-app id="inspire">
      <v-content>
        <v-container v-if="isLoading">
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 lg12>
              <v-row>
                <v-col>
                  <v-img height="30px" width="220px" :src="require('../assets/Profile.png')"/>
                </v-col>
                <v-col class="text-right">
                  <v-btn @click="downloadPDF" class="primary" text>Download as PDF</v-btn>
                </v-col>
              </v-row>
            </v-flex>

            <v-flex xs12 sm12 md7 lg7></v-flex>
            <v-flex
              xs12
              sm12
              md4
              lg4
              :class="{'ml-0': $vuetify.breakpoint.smAndDown, 'ml-9': $vuetify.breakpoint.mdAndUp , 'mt-5': $vuetify.breakpoint.mdAndUp ,  'text-right': $vuetify.breakpoint.mdAndUp  }"
              flat
            ></v-flex>

            <v-flex xs12 sm12 md2 lg2 class="mt-5"></v-flex>
            <v-flex xs12 sm12 md8 lg8 class="mt-5 cvPrint">
              <v-flex xs12 sm12 md12 lg12>
                <!-- Profile -->
                <v-card class="px-5">
                  <v-card-title class="justify-center">
                    <v-list-item-avatar class="avatar" color="grey" size="20%">
                      <v-img :src="UserProfileData.userImg"></v-img>
                    </v-list-item-avatar>
                  </v-card-title>
                  <v-card-text class="justify-center text-center">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          class="headline mb-2"
                          small
                        >{{this.UserProfileData.firstName}} {{this.UserProfileData.lastName}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{this.UserProfileData.designation}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-text>
                </v-card>

                <!-- Social Links -->
                <v-card class="mx-auto px-5 mt-1">
                  <v-card-text>
                    <v-row>
                      <div
                        :class="[ isSingleLink ? 'single-link' : 'link-width' ]"
                        v-for="(socialLink, i) in UserProfileData.socialLinks"
                        :key="i"
                      >
                        <v-col>
                          <i :class="'fa fa-'+[socialLink.linkType]+'-square icon-style mr-2'"></i>
                          {{socialLink.url}}
                        </v-col>
                      </div>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-flex>

              <!-- Summary -->
              <v-card class="mx-auto px-5 mt-1">
                <v-card-title>
                  <h4>Summary</h4>
                </v-card-title>
                <v-card-text>
                  <p class="text-justify">{{this.UserProfileData.userSummary}}</p>
                </v-card-text>
              </v-card>

              <!-- Skills -->
              <v-card class="mx-auto px-5 mt-1">
                <v-card-title>
                  <h4>Skills</h4>
                </v-card-title>
                <v-card-text>
                  <p class="text-left font-weight-black">Primary</p>
                  <v-chip
                    class="ma-1 mb-5"
                    v-model="UserProfileData"
                    v-for="(primarySkills, i) in  UserProfileData.allSkills.primary"
                    :key="i"
                  >{{primarySkills.name}}
                  </v-chip>
                  <p class="text-left font-weight-black">All Skills</p>
                  <v-chip
                    class="ma-1"
                    v-model="UserProfileData"
                    v-for="(secondarySkills, i) in  UserProfileData.allSkills.secondary"
                    :key="i.id"
                  >{{secondarySkills.name}}
                  </v-chip>
                </v-card-text>
              </v-card>

              <!-- Projects -->
              <v-card
                class="mt-1"
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp ,  }"
              >
                <v-card-title>
                  <h4>Experience Details</h4>
                </v-card-title>

                <v-card
                  class="mx-auto mt-n5"
                  flat
                  v-model="UserProfileData"
                  v-for="(expdetails, i) in UserProfileData.expdetails"
                  :key="i"
                >
                  <v-card-title>
                    <h5 class="width-h">{{expdetails.projectName}}</h5>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n4">{{expdetails.duration}}</p>
                    <v-chip
                      class="ma-1 mt-n2 mb-5"
                      v-model="UserProfileData"
                      v-for="(expdetails, i) in expdetails.skills.split(',')"
                      :key="i"
                    >{{expdetails}}
                    </v-chip>
                    <p class="text-justify">{{expdetails.projectDesc}}</p>
                  </v-card-text>
                </v-card>
              </v-card>

              <!-- cerifications -->
              <v-card
                class="mt-1"
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp ,  }"
              >
                <v-card-title class="mb-5">
                  <h4>Certifications</h4>
                </v-card-title>
                <v-card
                  class="mx-auto mt-n7"
                  flat
                  model="UserProfileData"
                  v-for="(certification, i) in UserProfileData.certification"
                  :key="i"
                >
                  <v-card-title>
                    <h6 class="width-h">{{certification.title}}</h6>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n3 font-weight-bold">{{certification.university}}</p>
                    <p
                      class="text-justify mt-n3"
                    >{{certification.startDate}} - {{certification.endDate ? certification.endDate : 'N/A'}}</p>
                  </v-card-text>
                </v-card>
              </v-card>

              <!-- Article -->
              <v-card
                class="mt-1"
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp , }"
              >
                <v-card-title class="mb-5">
                  <h4>Articles</h4>
                </v-card-title>

                <v-card
                  class="mx-auto mt-n7"
                  flat
                  model="UserProfileData"
                  v-for="(articles, i) in UserProfileData.articles"
                  :key="i"
                >
                  <v-card-title class="mt-n7">
                    <h6><a :href=articles.url>{{articles.title}}</a></h6>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n3">{{articles.date.year}}-{{articles.date.month}}</p>
                  </v-card-text>
                </v-card>
              </v-card>
              <!-- Achivements -->

              <v-card
                class="mt-1"
                :class="{'pl-0': $vuetify.breakpoint.smAndDown, ' pl-2': $vuetify.breakpoint.mdAndUp ,
            'pr-0': $vuetify.breakpoint.smAndDown, ' pr-2': $vuetify.breakpoint.mdAndUp ,
            'max-auto': $vuetify.breakpoint.mdAndUp , 'py-2': $vuetify.breakpoint.mdAndUp , }"
              >
                <v-card-title class="mb-5">
                  <h4>Achivements</h4>
                </v-card-title>

                <v-card
                  class="mx-auto"
                  flat
                  model="UserProfileData"
                  v-for="(achivements, i) in UserProfileData.achivements"
                  :key="i"
                >
                  <v-card-title class="mt-n7">
                    <h6>{{achivements.title}}</h6>
                  </v-card-title>
                  <v-card-text>
                    <p class="text-justify mt-n3">{{achivements.description}}</p>
                  </v-card-text>
                </v-card>
              </v-card>
              <p
                class="text-center footer mt-5"
              >©{{ new Date().getFullYear() }} Synerzip, LLC All Rights Reserved</p>
            </v-flex>
            <v-flex xs12 sm12 md2 lg2></v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
  import {apiService} from "../_services/apiSerivce.js";

  export default {
    data() {
      return {
        UserProfileData: {},
        isSingleLink: false,
        isLoading: false,
        SocialLinks: []
      };
    },
    created() {
      apiService.viewPublicProfile(this.$route.query.id).then(
        response => {
          this.UserProfileData = JSON.parse(response.publishedData);
          this.isLoading = true
          /*this.isSingleLink =
            this.UserProfileData.socialLinks.length == 1 ? true : false;*/
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    },
    methods: {
      downloadPDF() {
        window.print();
      }
    }
  };
</script>


<style scoped>
  .icon-style {
    font-size: 25px;
    color: rgb(81, 81, 218);
  }

  .width-h {
    width: 70%;
  }

  .back {
    background-image: url(../assets/login.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
    background-size: cover;
    height: 17%;
  }

  #inspire {
    background: none;
  }

  .avatar {
    position: relative;
    top: -100px;
    margin-bottom: -100px;
  }

  @media print {
    body * {
      visibility: hidden;
    }

    .cvPrint,
    .cvPrint * {
      visibility: visible;
    }

    .cvPrint {
      position: absolute;
      left: 0;
      top: 0;
      margin-top: 0 !important;
    }

    .mainHeader {
      visibility: hidden;
    }

    .footer {
      visibility: hidden;
    }

    @page {
      orphans: 0
    }
  }

  @media screen and (min-width: 960px) and (max-width: 1264px) {
    .avatar {
      position: relative;
      top: -100px;
      margin-bottom: -100px;
    }

    .back {
      background-image: url(../assets/login.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
      background-size: cover;
      height: 17%;
    }
  }

  @media screen and (max-width: 600px) {
    .avatar {
      position: relative;
      top: -60px;
      margin-bottom: -60px;
    }

    .back {
      background-image: url(../assets/login.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
      background-size: cover;
      height: 15%;
    }
  }

  .icon-style {
    font-size: 25px;
    color: #0077b5;
  }

  .link-width {
    width: 50%;
  }

  .single-link {
    width: 100%;
    text-align: center;
  }
</style>