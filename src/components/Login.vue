<template>
    <div>
        <form>
                <legend>Register for an account</legend>
                <input placeholder="email" v-model="email">
                <input placeholder="username" v-model="username">
                <input type="password" placeholder="password" v-model="password">
                <button type="submit" @click.prevent="register">Register</button>
        </form>
        <p v-if="error" class="error">{{error}}</p>
        <form>
                <legend>Login</legend>
                <input placeholder="username" v-model="usernameLogin">
                <input type="password" placeholder="password" v-model="passwordLogin">
                <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
        </form>
        <p v-if="errorLogin" class="error">{{errorLogin}}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            username: '',
            password: '',
            usernameLogin: '',
            passwordLogin: '',
            error: '',
            errorLogin: '',
        }
    },
    methods: {
        async register() {
            this.error = '';
            this.errorLogin = '';
            if (!this.email || !this.username || !this.password)
                return;
            try {
                let response = await axios.post('/api/users', {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.error = error.response.data.message;
                this.$root.$data.user = null;
            }
        },
        async login() {
            this.error = '';
            this.errorLogin = '';
            if (!this.usernameLogin || !this.passwordLogin)
                return;
            try {
                let response = await axios.post('/api/users/login', {
                    username: this.usernameLogin,
                    password: this.passwordLogin,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.errorLogin = "Error: " + error.response.data.message;
                this.$root.$data.user = null;
            }
        },
    },
}
</script>



<style scoped>
</style>
