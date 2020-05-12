<template>
    <div class="main">
        <div v-if="loggedIn">
            <p>Logged in as {{username}}</p>
        </div>
        <Login v-show="!loggedIn" />
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
        }
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
