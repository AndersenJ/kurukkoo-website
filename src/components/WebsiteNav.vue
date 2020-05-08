<template>
    <div class="websitenav">
        <a href="/">Home</a>
        <a href="/archive">Archive</a>
        <a href="/about">About</a>
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
    padding-bottom: 13px;
    margin: 18px;
    background-color: #505050;
    color: #dcdcdc;
    text-decoration: none;
}
</style>
