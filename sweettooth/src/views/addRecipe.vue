<template>
	<v-container>
	  <v-card>
		<v-card-title>
		  Add Recipe
		</v-card-title>
		<v-card-text>
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
		</v-card-text>
		<v-card-actions>
		  <v-btn color="primary" @click="submitRecipe">Add Recipe</v-btn>
		</v-card-actions>
	  </v-card>
	</v-container>
  </template>
  
  <script>
  import {
	db,
	addDoc,
  } from "../firebase";
  import { collection } from "firebase/firestore/lite";
 
  
  export default {
	data() {
	  return {
		recipeName: "",
		recipeIngredients: "",
		recipeDescription: "",
	  };
	},
	methods: {
	  async submitRecipe() {
		if (!this.recipeName || !this.recipeIngredients || !this.recipeDescription) {
		  alert("Please fill in all fields.");
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
  
