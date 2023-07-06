<template>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-btn text large @click="navigateTo('/login')">Login</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-btn text large @click="navigateTo('/register')">Register</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false
      };
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      }
    }
  };
  </script>
  
