<template>
  <div class="home-container">
    <h1>Desserts</h1>

    <!-- Loop through your recipes and display a card for each one -->
    <recipe-card
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
    ></recipe-card>
  </div>
</template>

<script>
import RecipeCard from "@/components/RecipeCarda.vue"; 
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore/lite';

export default {
  name: "HomeView",
  components: {
    RecipeCard,
  },
  data() {
    return {
      recipes: [],
    };
  },
  methods: {
    async fetchRecipes() {
      const recipesCollection = collection(db, "recipes");
      const querySnapshot = await getDocs(recipesCollection);

      this.recipes = querySnapshot.docs.map((doc) => doc.data());

      console.log("Fetched recipes:", this.recipes);
    },
  },
  created() {
    this.fetchRecipes();
  },
};
</script>

<style scoped>

</style>
