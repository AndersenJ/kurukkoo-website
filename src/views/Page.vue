<template>
    <div class="page">
        <h1>Page</h1>
        <img :src="url">
        <p>Page: {{this.page}} chapter: {{this.chapter}}</p>
    </div>
</template>

<script>
export default {
    name: 'Page',
    computed: {
        chapter() {
            if (this.$route.query.chapter == null) {
                return "00";
            } else {
                return this.$route.query.chapter;
            }
        },
        page() {
            if (this.$route.query.page == null) {
                return "000";
            } else {
                return this.$route.query.page;
            }
        },
        url() {
            return "/comic/" + this.chapter + "/" + this.page + ".png";
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
