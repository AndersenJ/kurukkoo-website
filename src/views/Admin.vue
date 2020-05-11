<template>
    <div class="main">
        <h1>Page Upload</h1>
        <form @submit.prevent="upload">
            <input v-model="title" placeholder="Title">
            <input v-model="sortTitle" placeholder="Title for sorting">
            <textarea v-model="description" placeholder="Description"></textarea>
            <input v-model="chapter" placeholder="Chapter">
            <div @click="chooseImage">
                <img v-if="url" :src="url" />
                <div v-if="!url">
                    Choose an Image
                </div>
                <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
            </div>
            <p v-if="error" class="error">{{error}}</p>
            <fieldset class="buttons">
                <button type="button" @click="close" class="pure-button">Close</button>
                <button type="submit" class="pure-button pure-button-primary right">Upload</button>
            </fieldset>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'Admin',
    computed: {
        user() {
            return this.$root.$data.user;
        },
    },
    data() {
        return {
            title: '',
            sortTitle: '',
            description: '',
            chapter: '',
            url: '',
            file: null,
            error: '',
        }
    },
    methods: {
        fileChanged(event) {
            this.file = event.target.files[0];
            this.url = URL.createObjectURL(this.file);
        },
        close() {
            this.$emit('close');
        },
        chooseImage() {
            this.$refs.fileInput.click()
        },
        async upload() {
            try {
                const formData = new FormData();
                formData.append('page', this.file, this.file.name);
                formData.append('title', this.title);
                formData.append('sortTitle', this.sortTitle);
                formData.append('description', this.description);
                formData.append('chapter', this.chapter);
                await axios.post("/api/pages", formData);
                this.file = null;
                this.url = "";
                this.title = "";
                this.description = "";
                this.$emit('uploadFinished');
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
            }
        }
    }
}
</script>
