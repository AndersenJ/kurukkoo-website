<template>
    <div class="comicnav">
        <a :href="firstPageUrl">First</a>
        <a :href="prevPageUrl">Prev</a>
        <a :href="nextPageUrl">Next</a>
        <a :href="latestPageUrl">Latest</a>
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
    margin: 18px;
    background-color: #505050;
    color: #dcdcdc;
}
</style>
