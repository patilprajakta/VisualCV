<template>
  <div class="login back">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-card-text>
                  <h5>Employee Login</h5>
                  <br />
                  <form @submit.prevent="onSubmit">
                    <div class="form-group">
                      <v-text-field
                        label="Username"
                        v-model="username"
                        :error-messages="nameErrors"
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                        required
                      ></v-text-field>
                    </div>
                    <div class="form-group">
                      <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        required
                      ></v-text-field>
                    </div>
                    <div class="form-group">
                      <button class="btn btn-primary" :disabled="loading">
                        <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                        <span>Login</span>
                      </button>
                    </div>
                    <div v-if="error" class="alert alert-danger">{{error}}</div>
                  </form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { authenticationService } from "../_services/authenticationService.js";
import { Role } from "../_helpers/role.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: ""
    };
  },
  validations: {
    username: { required },
    password: { required }
  },
  created() {
    // redirect to profile if already logged in
    if (authenticationService.currentUserValue) {
      return this.$router.push("/#/");
    }

    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.$route.query.returnUrl || '/';
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    }
  },
  methods: {
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      authenticationService.login(this.username, this.password).then(
        () => {
          var roles = authenticationService.currentUserValue.role
          if(roles.includes(Role.Emp))
            this.$router.push("/");
          else if(roles.includes(Role.BUHead))
            this.$router.push("/skills");
          else if(roles.includes(Role.HR))
            this.$router.push("/employees");
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }
};
</script>

<style scope>
.form-control {
  border: 0;
  margin-bottom: 30px;
}
.btn-primary {
  width: 100%;
}
.back {
  background-image: url(../assets/login.png?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
  background-size: cover;
}
#inspire {
  background: none;
}
</style>