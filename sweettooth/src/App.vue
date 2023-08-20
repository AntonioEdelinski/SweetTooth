<template>
  <v-app>
    <v-app-bar
      app
      color="pink"
      dark
    >
      <div class="d-flex align-center">
        <v-img
       
        />

        <img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/set-in-salden-titling.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn v-show="false && !isAuthenticated" text to="/profile">Profile</v-btn>
      <v-btn v-show="!isAuthenticated" text to="/login">Login</v-btn>
      <v-btn v-show="!isAuthenticated"  text to="/register">Register</v-btn>


    </v-app-bar>


    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {auth, getAuth, onAuthStateChanged, signOut} from "../firebase.js";
export default{
  name: "App",
  data() {
    return{
      isAuthenticated : false,
      isAuthorized: false,
      email: null,
      showRequest: false,
      showAdd: false,
    };
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("signed out");
        })
        .catch((error)=> {

        })
    },
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) =>{
      if(user) {
        console.log("Authenticated");
        this.isAuthenticated = true;
      } else {
        console.log("Not authenticated");
        this.isAuthenticated = false;
      }
    });
  },
};
</script>
<style scoped></style>
