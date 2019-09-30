import Vue from "vue";
import App from "./App.vue";
import { authenticationService } from "./_services/authenticationService.js";
import vuetify from "./plugins/vuetify";
import { Role } from "./_helpers/role.js";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import EmployeeDirectory from "./components/EmployeeDirectory";
import SkillsOverview from "./components/SkillsOverview";
import ViewProfile from "./components/ViewProfile";

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;
var roles = [Role.Emp, Role.BUHead, Role.HR, Role.Admin];
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
      meta: { authorize: roles }
    },
    {
      path: "/employees",
      component: EmployeeDirectory,
      meta: { authorize: roles }
    },
    {
      path: "/skills",
      component: SkillsOverview,
      meta: { authorize: [Role.BUHead, Role.Admin] }
    },
    {
      path: "/viewProfile",
      component: ViewProfile
    },
    {
      path: "/login",
      component: LoginPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted pagecd
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }

    //check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role[0])) {
        // role not authorised so redirect to home page
        return next({ path: '/#' });
    }
  }
  next();
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
