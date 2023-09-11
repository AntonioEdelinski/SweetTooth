<template>
	<v-container fill-height fluid class="background">
	  <v-row align="center" justify="center">
		<v-col cols="12">
		  <v-card class="card-border" outlined>
			<v-row>
			  <v-col cols="6">
				<v-card-title align="left">PROFILE</v-card-title>
				<v-card-subtitle align="left">
				  Here you can update your info
				</v-card-subtitle>
				<v-card-text class="card-text-border">
				  <v-form v-model="valid">
					<v-text-field
					  v-model="firstName"
					  dense
					  label="Name"
					  clearable
					  type="text"
					  outlined
					  @input="checkForChanges"
					></v-text-field>
					<v-text-field
					  v-model="lastName"
					  dense
					  label="Last Name"
					  clearable
					  type="text"
					  outlined
					  @input="checkForChanges"
					></v-text-field>
					<v-text-field
					  v-model="email"
					  dense
					  label="Email"
					  clearable
					  type="text"
					  outlined
					  @input="checkForChanges"
					></v-text-field>
				  </v-form>
				</v-card-text>
				<v-card-actions class="card-actions">
				  <v-btn
					:disabled="isUserDataSame || !isUserDataChanged"
					:loading="isSaving"
					outlined
					@click="updateUserData"
				  >
					OK
				  </v-btn>
				</v-card-actions>
			  </v-col>
			  
			  <v-col cols="6">
				<img
				  src="@/assets/daovr37-bb00b68e-5010-4ab6-a1c2-15231867a857.png"
				  alt="User Image"
				  class="profile-image"
				  style="width: 200px; height: auto;"
				/>
			  </v-col>
			</v-row>
		  </v-card>
		</v-col>
	  </v-row>
	</v-container>
  </template>
  
  <script>
import { doc, db, getDoc, auth, onAuthStateChanged, setDoc } from "../firebase";

export default {
  name: "ProfileView",
  data() {
    return {
      valid: null,
      user: null,
      firstName: null,
      lastName: null,
      email: null,
      rules: {
        required: (value) => !!value || "Required.",
      },
      isSaving: false,
      userData: null,
      isUserDataSame: false, 
    };
  },
  methods: {
    async updateUserData() {
      if (this.isUserDataChanged) {
        this.isSaving = true;

        const updatedUserData = {
          FirstName: this.firstName,
          LastName: this.lastName,
          Email: this.email,
        };

        const userDocRef = doc(db, "users", this.user.email);

        try {
          await setDoc(userDocRef, updatedUserData);

          this.isUserDataSame = true;
          this.isSaving = false;
          this.$router.push("/");
        } catch (error) {
          console.error("Error updating user data:", error);
          this.isSaving = false;
        }
      }
    },
    checkForChanges() {
      this.isUserDataSame =
        this.firstName === this.userData?.FirstName &&
        this.lastName === this.userData?.LastName &&
        this.email === this.userData?.Email;
    },
    async getUserData(email) {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.userData = docSnap.data();
        this.firstName = this.userData.FirstName;
        this.lastName = this.userData.LastName;
        this.email = this.userData.Email;
      }
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.getUserData(user.email);
      } else {
      }
    });
  },
  computed: {
    isUserDataChanged() {
      return (
        this.firstName !== this.userData?.FirstName ||
        this.lastName !== this.userData?.LastName ||
        this.email !== this.userData?.Email
      );
    },
  },
};
</script>
  
  <style></style>
  
