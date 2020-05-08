<template>
    <div class="page">
        <h1>{{this.page}}</h1>
        <ComicNav :firstPageUrl="firstPageUrl" :prevPageUrl="prevPageUrl" :nextPageUrl="nextPageUrl" :latestPageUrl="latestPageUrl" />
        <a :href="nextPageUrl">
            <img :src="imgUrl">
        </a>
        <ComicNav :firstPageUrl="firstPageUrl" :prevPageUrl="prevPageUrl" :nextPageUrl="nextPageUrl" :latestPageUrl="latestPageUrl" />
    </div>
</template>

<script>
import files from '@/pages';
import ComicNav from '../components/ComicNav.vue';

export default {
    name: 'Page',
    components : {
        ComicNav: ComicNav
    },
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
        imgUrl() {
            return "/comic/" + this.chapter + "/" + this.page + ".png";
        },
        chapters() {
            return files.filter(file => file.filename.length === 2);
        },
        allPages() {
            return files.filter(file => file.filename.length > 2);
        },
        firstPageUrl() {
            return "/?chapter=00&page=000";
        },
        nextPageUrl() {
            for (let p in this.allPages) {
                if (this.allPages[p].filename === this.page + ".png") {
                    let nextPage = this.allPages[parseInt(p)+1];
                    if (nextPage !== undefined) {
                        return "/?chapter=" + this.chapterFromPage(nextPage) + "&page=" + nextPage.filename.substr(0, nextPage.filename.length-4);
                    }
                }
            }
            return "/?chapter=" + this.chapter + "&page=" + this.page;
        },
        prevPageUrl() {
            for (let p in this.allPages) {
                if (this.allPages[p].filename === this.page + ".png") {
                    let prevPage = this.allPages[parseInt(p)-1];
                    if (parseInt(p)-1 >= 0) {
                        return "/?chapter=" + this.chapterFromPage(prevPage) + "&page=" + prevPage.filename.substr(0, prevPage.filename.length-4);
                    }
                }
            }
            return "/?chapter=" + this.chapter + "&page=" + this.page;
        },
        latestPageUrl() {
            let latestPage = this.allPages[this.allPages.length-1];
            return "/?chapter=" + this.chapterFromPage(latestPage) + "&page=" + latestPage.filename.substr(0, latestPage.filename.length-4);
        },
    },
    methods: {
        chapterFromPage(p) {
            return p.parent.substr(-2);
        },
        pages(chapter) {
            return files.filter(file => file.parent === "public/comic/" + chapter);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
