<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearchInput"
        placeholder="Search for recipes..."
      />
      <ul v-if="showSuggestions" class="suggestions">
        <li v-for="suggestion in searchSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)">
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { db, collection, query, where, getDocs } from "@/firebase.js";
  
  export default {
    data() {
      return {
        searchQuery: '',
        searchSuggestions: [],
        showSuggestions: false,
      };
    },
    methods: {
      async handleSearchInput() {
        if (this.searchQuery) {
          const recipesCollection = collection(db, "recipes");
          const q = query(recipesCollection, where("name", ">=", this.searchQuery));
          const querySnapshot = await getDocs(q);
          this.searchSuggestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
          this.searchSuggestions = [];
        }
        this.showSuggestions = this.searchSuggestions.length > 0;
      },
      selectSuggestion(suggestion) {
        this.searchQuery = suggestion.name;
        this.showSuggestions = false;
        this.$emit("suggestion-selected", suggestion);
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    position: relative;
    margin: 16px;
    background-color: white;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }
  
  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 150px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
  }
  
  .suggestions li {
    padding: 8px;
    cursor: pointer;
    color:black
  }
  
  .suggestions li:hover {
    background-color: #f0f0f0;
  }
  </style>
  
