<template>
  <v-app>
    <div class="toolbarWrapper">
      <v-toolbar class="mainHeader" v-if="currentUser" :dark="true">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Visual CV</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items class="tabs">
          <router-link to="/">
            <v-btn text class="text-none">My Profile</v-btn>
          </router-link>
          <router-link to="/employees">
            <v-btn text class="text-none">Employee Directory</v-btn>
          </router-link>
          <router-link to="/skills">
            <v-btn v-if="isBUHead" text class="text-none">Skills</v-btn>
          </router-link>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>
        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn @click="logout" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>&nbsp;Log Out
        </template>
      </v-toolbar>
    </div>
    <v-content class="backColor">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { authenticationService } from "./_services/authenticationService.js";
import { Role } from "./_helpers/role.js";

export default {
  name: "app",
  data() {
    return {
      currentUser: null
    };
  },
  computed: {
    isBUHead() {
      return this.currentUser && this.currentUser.role.includes(Role.BUHead);
    }
  },
  created() {
    authenticationService.currentUser.subscribe(x => (this.currentUser = x));
  },
  methods: {
    logout() {
      authenticationService.logout();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
  .tabs {
    height: auto;
  }
  .tabs a {
    height: inherit;
  }
  .router-link-exact-active {
    border-bottom: 2px solid yellow;
  }
  .tabs a {
    padding-bottom: 9px;
    padding-top: 17px;
  }
  .mainHeader {
    background-color: #0c1e35 !important;
  }
  .backColor {
    background: #e5e5e5;
  }

  @media print {
    .mainHeader{
      visibility:hidden;
    }
    .toolbarWrapper{
      background: white;
      padding-top: 12px;      
    }
    
  }
</style>
