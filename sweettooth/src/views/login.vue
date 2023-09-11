<template>
	<v-container fill-height fluid class="background">
	  <v-row align="center" justify="center">
		<v-col align="center" justify="center" cols="12">
		  <v-card class="card-border" width="600px" outlined>
			<img src="@/assets/preuzmi.png" alt="Your Image" class="center-image" />
			<v-card-title align="left">LOGIN</v-card-title>
			<v-card-text class="card-text-border">
			  <v-form v-model="valid">
				<v-text-field
				  v-model="email"
				  dense
				  label="Email"
				  clearable
				  type="text"
				  :rules="[rules.required, rules.email]"
				  outlined
				  class="custom-text-field"
				></v-text-field>
				<v-text-field
				  v-model="password"
				  dense
				  color="black"
				  label="Password"
				  clearable
				  :append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
				  :rules="[rules.required, rules.min]"
				  :type="showIcon ? 'text' : 'password'"
				  @click:append="showIcon = !showIcon"
				  outlined
				  class="custom-text-field"
				></v-text-field>
			  </v-form>
			  <v-btn
				@click="openDialog"
				class="link-left"
				text
				x-small
				color="blue"
			  >
				Forgot password?
			  </v-btn>
			</v-card-text>
			<v-card-actions class="card-actions">
			  <v-btn @click="login" :disabled="isButtonDisabled" outlined>
				OK
			  </v-btn>
			</v-card-actions>
		  </v-card>
		  <v-dialog
			width="300px"
			outlined
			persistent
			v-model="passwordIssuesDialog"
		  >
			<v-card class="card-border">
			  <v-card-title>E-mail</v-card-title>
			  <v-card-subtitle>
				Please enter your email
			  </v-card-subtitle>
			  <v-card-text>
				<v-text-field
				  v-model="emailForPassword"
				  dense
				  label="Email"
				  clearable
				  color="black"
				  type="text"
				  :rules="[rules.required, rules.email]"
				  outlined
				  class="custom-text-field"
				></v-text-field>
			  </v-card-text>
			  <v-card-actions class="card-actions">
				<v-btn
				  class="btn-right-margin"
				  color="red darken-3"
				  outlined
				  text
				  small
				  @click="closeDialog"
				>
				  CLOSE
				</v-btn>
				<v-btn outlined text @click="resetPassword(emailForPassword)">
				  SEND
				</v-btn>
			  </v-card-actions>
			</v-card>
		  </v-dialog>
		</v-col>
	  </v-row>
	</v-container>
  </template>
  
  <script>
  import { auth, sendPasswordResetEmail, signInWithEmailAndPassword } from "../firebase.js";
  
  export default {
	name: "LoginView",
	data() {
	  return {
		emailForPassword: null,
		passwordIssuesDialog: false,
		isButtonDisabled: false,
		valid: true,
		email: null,
		password: null,
		showIcon: false,
		rules: {
		  required: (value) => !!value || "Required.",
		  min: (v) => v?.length >= 6 || "Min 6 characters",
		  email: (v) =>
			!v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
			"E-mail must be valid",
		},
	  };
	},
	methods: {
	  login() {
		signInWithEmailAndPassword(auth, this.email, this.password)
		  .then(() => {
			this.$router.push("/");
		  })
		  .catch((error) => {
			alert(error.message);
		  });
	  },
	  resetPassword(email) {
		sendPasswordResetEmail(auth, email)
		  .then(() => {
			console.log("Email sent");
		  })
		  .catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// Handle error if needed
		  });
		this.closeDialog();
	  },
	  closeDialog() {
		this.passwordIssuesDialog = false;
	  },
	  openDialog() {
		this.passwordIssuesDialog = true;
	  },
	},
  };
  </script>
  
  <style>
  .custom-text-field input {
	color: black;
  }
  </style>
  
