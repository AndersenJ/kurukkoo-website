<template>
    <div>
        <div class="main" v-show="user.role === 'admin'">
            <h1>Page Upload</h1>
            <form @submit.prevent="upload">
                <div class="fields">
                    <input v-model="title" placeholder="Title">
                    <input v-model="sortTitle" placeholder="Title for sorting">
                    <textarea v-model="description" placeholder="Description"></textarea>
                    <input v-model="chapter" placeholder="Chapter">
                </div>
                <div @click="chooseImage">
                    <img class="preview" v-if="url" :src="url" />
                    <div v-if="!url">
                        Choose an Image
                    </div>
                    <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
                </div>
                <p v-if="error" class="error">{{error}}</p>
                <button type="submit" class="pure-button pure-button-primary right">Upload</button>
            </form>
        </div>
        <div v-show="user.role !== 'admin'">
            <p>You must be an admin to use this page</p>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'Admin',
    data() {
        return {
            user: null,
            title: '',
            sortTitle: '',
            description: '',
            chapter: '',
            url: '',
            file: null,
            error: '',
        }
    },
    async beforeMount() {
        try {
            let response = await axios.get('/api/users');
            this.$root.$data.user = response.data.user;
            this.user = response.data.user;
        } catch (error) {
            this.$root.$data.user = null;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fields {
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: auto;
}
.fields * {
    padding: 4px;
    margin: 4px;
}

.preview {
    max-width: 100px;
    max-height: 300px;
}

</style>
