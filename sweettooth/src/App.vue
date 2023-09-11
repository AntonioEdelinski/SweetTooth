<template>
  <v-app>
    <v-app-bar app color="pink" dark>
      <div class="d-flex align-center">
        <v-typography class="title">SweetTooth</v-typography>
      </div>

      <v-spacer></v-spacer>
      <v-btn text to="/">HOME</v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-btn
      v-if="isAuthenticated"
      fab
      dark
      bottom
      left
      fixed
      class="add-button"
      @click="$router.push('/addrecipe')"
    >
      Add
    </v-btn>

    <v-btn
      v-if="isAuthenticated"
      fab
      dark
      bottom
      right
      fixed
      class="profile-button"
      @click="$router.push('/profile')"
    >
     Profile
    </v-btn>
    <v-btn v-show="!isAuthenticated" text to="/login" class="colored-button">Login</v-btn>
    <v-btn v-show="!isAuthenticated" text to="/register" class="colored-button">Register</v-btn>
    <v-btn v-show="isAuthenticated" @click="signOut" text>Sign Out</v-btn>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth, getAuth, onAuthStateChanged, signOut } from "./firebase.js";

export default {
  name: "App",
  setup() {
    const isAuthenticated = ref(false);
    
    const handleSignOut = async () => {
      const authInstance = getAuth();
      try {
        await signOut(authInstance);
        console.log("Signed out");

        if (router.currentRoute.value.path !== '/') {
          router.push('/'); 
        }
      } catch (error) {
        console.error("Sign out error:", error);
      }
    };
    

    onAuthStateChanged(auth, (user) => {
      isAuthenticated.value = !!user; 
    });

    return {
      isAuthenticated,
      signOut: handleSignOut,
    };
  },
};
</script>

<style scoped>
.add-button, .profile-button {
  margin: 16px;
  border-radius: 0;
  min-width: 100px;
}

.colored-button {
  background-color: rosybrown; 
  color: antiquewhite; 
}
</style>
