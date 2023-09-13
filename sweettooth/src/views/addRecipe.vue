<template>
	<v-container>
	  <v-card>
		<v-card-title>
		  Add Recipe
		</v-card-title>
		<v-card-text>
		  <v-row>
			<v-col cols="6">
			  <ImagePicker @generate-blob="generateBlob"></ImagePicker>
  
			  <v-img
				v-if="imagePreview"
				:src="imagePreview"
				width="300"
				height="300"
				:lazy-src="imagePreview"
				@click="editImage"
			  ></v-img>
			</v-col>
			<v-col cols="6">
			  <!-- Recipe Details Form -->
			  <v-form>
				<v-text-field
				  v-model="recipeName"
				  label="Dessert Name"
				  required
				></v-text-field>
				<v-textarea
				  v-model="recipeIngredients"
				  label="Recipe Ingredients"
				  required
				></v-textarea>
				<v-textarea
				  v-model="recipeDescription"
				  label="Description"
				  required
				></v-textarea>
			  </v-form>
			</v-col>
		  </v-row>
		</v-card-text>
		<v-card-actions>
		  <v-btn color="primary" @click="submitRecipe">Add Recipe</v-btn>
		</v-card-actions>
	  </v-card>
	</v-container>
  </template>
  
  <script>
  import { db, addDoc } from "../firebase";
  import { collection } from "firebase/firestore/lite";
  import ImagePicker from "@/components/ImagePicker.vue";
  
  export default {
	components: {
		ImagePicker,
	},
	data() {
	  return {
		imageBinary: null,
		imagePreview: null,
		recipeName: "",
		recipeIngredients: "",
		recipeDescription: "",
	  };
	},
	methods: {
	  generateBlob(blob) {
		this.imageBinary = blob;
		this.imagePreview = URL.createObjectURL(blob);
	  },
	  editImage() {
		this.imageBinary = null;
		this.imagePreview = null;
	  },
	  async submitRecipe() {
		if (!this.recipeName || !this.recipeIngredients || !this.recipeDescription) {
		  alert("Please fill in all fields.");
		  return;
		}
  
		if (!this.imageBinary) {
		  alert("Please select an image.");
		  return;
		}
  
		try {
		  const recipeData = {
			name: this.recipeName,
			ingredients: this.recipeIngredients,
			description: this.recipeDescription,
			createdAt: new Date(),
		  };
  
		  const recipesCollection = collection(db, "recipes");
		  await addDoc(recipesCollection, recipeData);
  
		  alert("Recipe added successfully!");
		  this.$router.push("/");
		} catch (error) {
		  console.error("Error adding recipe: ", error);
		  alert("An error occurred while adding the recipe.");
		}
	  },
	},
  };
  </script>
  
  <style scoped>
  </style>
  
