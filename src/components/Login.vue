<template>
    <div>
        <form>
                <input placeholder="email" v-model="email">
                <div style="display: none"><input type="text" name="Name" v-model="honeypot1" /></div>
                <input placeholder="username" v-model="username">
                <input type="password" placeholder="password" v-model="password">
                <button type="submit" @click.prevent="register">Register</button>
        </form>
        <p v-if="error" class="error">{{error}}</p>
        <form>
                <div style="display: none"><input type="text" name="Name" v-model="honeypot2" /></div>
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
            honeypot1: '',
            honeypot2: '',
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
            if (this.honeypot1 === '' && this.honeypot1 === '') {
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
                    this.$emit('check-user');
                } catch (error) {
                    this.error = error.response.data.message;
                    this.$root.$data.user = null;
                }
            }
        },
        async login() {
            if (this.honeypot1 === '' && this.honeypot1 === '') {
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
                    this.$emit('check-user');
                } catch (error) {
                    this.errorLogin = "Error: " + error.response.data.message;
                    this.$root.$data.user = null;
                }
            }
        },
    },
}
</script>



<style scoped>

input {
    background-color: #f8f8f8;
}

form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
    border: solid 3px #606060;
    margin-top: 18px;
    margin-bottom: 8px;
}

form * {
    padding: 4px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
}

button {
    border: 0;
    cursor: pointer;
}

.account-link, button {
    padding: 15px;
    padding-bottom: 13px;
    background-color: #505050;
    color: #dcdcdc;
    text-decoration: none;
    width: max-content;
    margin: auto;
    margin-top: 13px;
    margin-bottom: 13px;
}

</style>
