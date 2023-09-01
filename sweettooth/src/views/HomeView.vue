<template>
    <div class="home-container">
        <h1>Desserts</h1>
    
<div v-for="recipe in recipes" :key="recipe.id">
    <h2>{{ recipe.name }}</h2>
    <p>{{ recipe.ingredients }}</p>
    <p>{{ recipe.description }}</p>
    <img :src="recipe.imageUrl" alt="Recipe" />
</div>
    </div>
</template>
<script>
import { db } from '../firebase.js'
import { collection, getDocs } from 'firebase/firestore/lite';

export default {
    name:"HomeView",
    data() {
        return {
            recipes: [],
        };
    },
    methods: {
        async fetchRecipes () {
            const recipesCollection = collection(db, "recipes");
            const querySnapshot = await getDocs (recipesCollection);

            this.recipe = querySnapshot.docs.map((doc) => doc.data());
        },
    },
    created () {
        this.fetchRecipes();
    },
};
</script>

<style scoped>
.home-container{
   padding: 20px;
}
</style>
