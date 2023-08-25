<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card outlined>
            <v-card-title>
              Profile
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="editedUsername"
                label="Username"
                outlined
                dense
              ></v-text-field>
              <p>Email: {{ user.email }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="updateUsername" outlined>
                Update Username
              </v-btn>
              <v-btn @click="logout" outlined>
                Logout
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { auth, db } from "../firebase";
  
  export default {
    name: "ProfileView",
    data() {
      return {
        user: null,
        editedUsername: "",
      };
    },
    async mounted() {
      this.user = auth.currentUser;
      this.editedUsername = this.user.displayName || "";
    },
    methods: {
      async updateUsername() {
        try {
          await this.user.updateProfile({
            displayName: this.editedUsername,
          });
  
          // Update username in the Firestore database if needed
          const userDocRef = db.collection("users").doc(this.user.uid);
          await userDocRef.update({
            displayName: this.editedUsername,
          });
  
          this.$toast.success("Username updated successfully");
        } catch (error) {
          console.error(error.message);
          this.$toast.error("Failed to update username");
        }
      },
      async logout() {
        try {
          await auth.signOut();
          this.$router.push("/login");
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  };
  </script>
  
