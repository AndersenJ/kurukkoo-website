<template>
    <div class="websitenav">
        <router-link to="/">Home</router-link>
        <router-link to="/archive">Archive</router-link>
        <router-link to="/about">About</router-link>
        <a href="https://www.patreon.com/kadew">Patreon</a>
    </div>
</template>

<script>
export default {
    name: 'WebsiteNav',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.websitenav a {
    padding: 15px;
    padding-bottom: 11px;
    margin: 18px;
    background-color: #505050;
    color: #dcdcdc;
    text-decoration: none;
}
</style>
