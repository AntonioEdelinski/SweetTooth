<template>
  <v-container fill-height fluid class="background">
    <v-row align="center" justify="center">
      <v-col align="center" justify="center" cols="12">
        <v-card class="card-border" width="600px" outlined>
          <v-card-title align="left">New Recipe</v-card-title>
          <v-card-subtitle align="left"></v-card-subtitle>
          <v-card-text class="card-text-border">
            <image-picker @generate="generateBlob"></image-picker>

            <v-text-field v-model="name" label="Dessert name"></v-text-field>
            <v-textarea v-model="ingredients" label="Ingredients"></v-textarea>
            <v-textarea v-mode="description" label="Description"></v-textarea>
          </v-card-text>
          <v-card-actions class="card-actions">
            <v-btn @click="submit" color="primary">Add Recipe</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImagePicker from "../components/ImagePicker.vue";
import {
	storage,
	ref,
	doc,
	getDownloadURL,
	addDoc,
	uploadBytes,
	db,
} from "../firebase";
import { collection, updateDoc } from "firebase/firestore/lite";

export default {
	name: "New-Recipe-View",
	components: {
		ImagePicker,
	},
	data() {
		return {
			imageBinary: null,
			name: null,
      ingredients: null,
      description: null,
			user: null,
			email: null,
			downloadedImageUrl: null,
			recipeDocReference: null,
			isLoading: null,
		};
	},
	methods: {
		async generateBlob(croppaModel) {
			let blob = await croppaModel.promisedBlob();
			this.imageBinary = blob;
			console.log("Blob: ", blob);
		},
		clear() {
			this.imageBinary = null;
			this.type = null;
			this.name = null;
			this.ingredients = null;
      this.description = null;
		},
		async submit() {
			if (this.imageBinary == null) {
				console.log("No image");
				return;
			}
			this.isLoading = true;
			await this.createRecipe();
			this.uploadRecipeImage();
		},
		postActionMoveToView() {
			this.$router.push({ path: "/recipe" });
		},
		uploadRecipeImage() {
			const imageName = "images/" + this.email + Date.now();
			const imageRef = ref(storage, imageName);
			const file = this.imageBinary;
			uploadBytes(imageRef, file).then((snapshot) => {
				console.log("Uploaded a blob or a file ", snapshot);
				getDownloadURL(imageRef)
					.then((url) => {
						this.downloadedImageUrl = url;
						this.updateRecipePickerReference(url);
						console.log("File saved successfully at ", url);
						this.postActionMoveToView();
					})
					.catch((error) => {
						switch (error.code) {
							case "storage/object-not-found":
								break;
							case "storage/unauthorized":
								break;
							case "storage/canceled":
								break;
						}
					});
			});
		},
		async updateRecipePickerReference() {
			let docReference = this.recipeDocReference;
			let imageUrl = this.downloadedImageUrl;
			let response = await updateDoc(
				doc(db, "recipe", docReference.id),
				{
					ImageUrl: imageUrl,
				}
			);
			this.isLoading = false;
		},
		async createRecipe() {
			let recipeDocReference = await addDoc(collection(db, "recipe"), {
				Type: this.type,
				Name: this.name,
				Ingredients: this.ingredients,
        Description: this.description,
				ImageUrl: null,
			});
			this.recipeDocReference = recipeDocReference;
		},
	},
	mounted() {
		debugger;
	},
};
</script>
<style></style>
