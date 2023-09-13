<template>
  <v-app>
    <v-app-bar app color="pink" dark>
      <div class="d-flex align-center">
        SweetTooth
      </div>
      <v-spacer></v-spacer>
      <v-btn text to="/">HOME</v-btn>
      
      
      <search-bar @suggestion-selected="handleSuggestionSelected" />
      <v-btn v-show="!isAuthenticated" text to="/login" class="colored-button">Login</v-btn>
    <v-btn v-show="!isAuthenticated" text to="/register" class="colored-button">Register</v-btn>
    <v-btn v-show="isAuthenticated" @click="signOut" text>Sign Out</v-btn>
    </v-app-bar>

    <v-main>
      <div v-if="selectedSuggestion">
        <router-view :selectedSuggestion="selectedSuggestion" />
      </div>
      <router-view v-else />
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
  </v-app>
</template>

<script>
import { ref } from "vue";
import { auth, onAuthStateChanged, signOut } from "./firebase.js";
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  components: { SearchBar },
  setup() {
    const isAuthenticated = ref(false);
    const selectedSuggestion = ref(null);

    const handleSignOut = async () => {
      const authInstance = auth;
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

    const handleSuggestionSelected = (suggestion) => {
      selectedSuggestion.value = suggestion;
    };

    return {
      isAuthenticated,
      signOut: handleSignOut,
      selectedSuggestion,
      handleSuggestionSelected,
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
  background-color: white; 
  color: black; 
}
</style>
