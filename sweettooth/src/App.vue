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

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
