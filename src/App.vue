<template>
    <div id="app">
        <WebsiteNav />
        <router-view/>
    </div>
</template>

<script>
import WebsiteNav from './components/WebsiteNav.vue';
export default {
    components : {
        WebsiteNav: WebsiteNav,
    },
}
</script>

<style>
* {
    background-color: #dcdcdc;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#app {
    text-align: center;
    color: #2c3e50;
}

body {
    margin: 0;
}

#banner, #banner img {
    width: 100%;
    max-width: 1400px;
    margin: auto;
    margin-bottom: 8px;
}

.footer-spacer {
    height: 70px;
}

h1 {
    margin-top: 13px;
    margin-bottom: 6px;
}

.footer, .footer a {
    width: 100%;
    margin: auto;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
    background-color: #000000;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #dcdcdc;
}
</style>
