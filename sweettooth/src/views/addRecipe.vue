<template>
    <div class="add-recipe">
      <h1>Add Recipe</h1>
  
      <div class="form">
        <input type="file" accept="image/*" @change="handleImageChange" />
        <img v-if="imagePreview" :src="imagePreview" alt="Recipe Preview" />
  
        <label for="recipeName">Dessert Name:</label>
        <input v-model="recipeName" id="recipeName" />
  
        <label for="recipeIngredients">Recipe Ingredients:</label>
        <textarea v-model="recipeIngredients" id="recipeIngredients"></textarea>
  
        <label for="recipeDescription">Description:</label>
        <textarea v-model="recipeDescription" id="recipeDescription"></textarea>
  
        <button @click="addRecipe">Add Recipe</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { collection, addDoc } from 'firebase/firestore/lite';
  import { auth, db } from '../firebase'; // Replace with your actual import path
  
  export default {
    data() {
      return {
        imageFile: null,
        imagePreview: null,
        recipeName: '',
        recipeIngredients: '',
        recipeDescription: '',
      };
    },
    methods: {
      async handleImageChange(event) {
        this.imageFile = event.target.files[0];
        this.imagePreview = URL.createObjectURL(this.imageFile);
      },
      async addRecipe() {
        const storageRef = ref(storage, 'recipes/' + this.imageFile.name);
        await uploadBytes(storageRef, this.imageFile);
  
        const imageURL = await getDownloadURL(storageRef);
  
        await addDoc(collection(db, 'recipes'), {
          name: this.recipeName,
          ingredients: this.recipeIngredients,
          description: this.recipeDescription,
          imageUrl: imageURL,
          createdBy: auth.currentUser.uid,
          createdAt: new Date(),
        });
  
        this.imageFile = null;
        this.imagePreview = null;
        this.recipeName = '';
        this.recipeIngredients = '';
        this.recipeDescription = '';
  
         this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .add-recipe {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  </style>
  
