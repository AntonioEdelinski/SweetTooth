<template>
  <div class="recipe-card">
    <div class="recipe-header">
    </div>
    <div class="recipe-content">
      <h2>Ime:</h2>
      <h3>{{ recipe.name }}</h3>
      <h2>Sastojci:</h2>
      <p>{{ recipe.ingredients }}</p>
      <h2>Opis:</h2>
      <p>{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase.js"
export default {
  props: {
    recipe: Object,
  },
  data() {
    return {
      user: null, 
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  mounted() {
  },
};
</script>

<style scoped>
.recipe-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px auto;
  max-width: 1200px;
  border-radius: 8px;
  background-color: #f2d49c; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
