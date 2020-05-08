<template>
    <div class="comicnav">
        <router-link :to="firstPageUrl">&lt;&lt;</router-link>
        <router-link :to="prevPageUrl">&lt;</router-link>
        <router-link :to="nextPageUrl">&gt;</router-link>
        <router-link :to="latestPageUrl">&gt;&gt;</router-link>
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
.comicnav {
    display: flex;
    max-width: 320px;
    justify-content: space-evenly;
    margin: auto;
    flex-wrap: wrap;
}

.comicnav a {
    padding: 15px;
    padding-bottom: 13px;
    background-color: #505050;
    color: #dcdcdc;
    text-decoration: none;
}
</style>
