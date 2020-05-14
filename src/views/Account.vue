<template>
    <div class="main">
        <div v-if="loggedIn">
            <p>Logged in as <b>{{username}}</b></p>
            <div class="avatar">
                <img :src="user.avatar">
            </div>
            <form class="new-avatar" @submit.prevent="upload">
                <div @click="chooseImage">
                    <img class="preview" v-if="url" :src="url" />
                    <div v-if="!url">
                        Upload a new Avatar
                    </div>
                    <input class="fileInput" ref="fileInput" type="file" @input="fileChanged"/>
                </div>
                <button type="submit">Upload</button>
            </form>
            <button v-on:click="logout">Logout</button>
            <router-link v-if="$route.query.page" :to="'/?page=' + $route.query.page">
                Return to page {{$route.query.page}}
            </router-link>
        </div>
        <Login v-on:check-user="checkUser();" v-show="!loggedIn" />
    </div>
</template>


<script>
import axios from 'axios';
import Login from '../components/Login.vue'

export default {
    name: 'Admin',
    computed: {
        loggedIn() {
            if (this.user)
                return true;
            else
                return false;
        },
        username() {
            if (this.loggedIn) {
                return this.user.username;
            } else {
                return "null";
            }
        },
    },
    components: {
        Login: Login
    },
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
        this.checkUser();
    },
    methods: {
        async upload() {
            try {
                const formData = new FormData();
                formData.append('avatar', this.file, this.file.name);
                await axios.put("/api/users/avatar", formData);
                this.file = null;
                this.url = "";
                this.title = "";
                this.description = "";
                this.$emit('uploadFinished');
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
            }
        },
        async logout() {
            try {
                await axios.delete('/api/users');
                this.$root.$data.user = null;
                this.user = null
            } catch (error) {
                this.$root.$data.user = null;
            }
            this.checkUser();
        },
        async checkUser() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
                this.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
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
    }
}
</script>

<style scoped>

img {
    max-width: 80px;
    max-height: 80px;
    margin: auto;
}

button, a {
    border: 0;
    cursor: pointer;
    padding: 15px;
    padding-bottom: 13px;
    background-color: #505050;
    color: #dcdcdc;
    text-decoration: none;
    width: max-content;
    margin: auto;
    margin-top: 23px;
    margin-bottom: 23px;
}

form.new-avatar {
    margin-top: 15px;
}

</style>
