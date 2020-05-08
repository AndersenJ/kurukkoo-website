<template>
    <div class="comicnav">
        <a :href="firstPageUrl">&lt;&lt;</a>
        <a :href="prevPageUrl">&lt;</a>
        <a :href="nextPageUrl">&gt;</a>
        <a :href="latestPageUrl">&gt;&gt;</a>
    </div>
</template>

<script>
export default {
    name: 'ComicNav',
    props: {
        firstPageUrl: {
            type: String,
            required: true
        },
        prevPageUrl: {
            type: String,
            required: true
        },
        nextPageUrl: {
            type: String,
            required: true
        },
        latestPageUrl: {
            type: String,
            required: true
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comicnav a {
    padding: 15px;
    padding-bottom: 13px;
    margin: 18px;
    background-color: #505050;
    color: #dcdcdc;
    text-decoration: none;
}
</style>
