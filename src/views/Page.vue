<template>
    <div class="page">
        <h1>{{this.page}}</h1>
        <ComicNav :firstPageUrl="firstPageUrl" :prevPageUrl="prevPageUrl" :nextPageUrl="nextPageUrl" :latestPageUrl="latestPageUrl" />
        <router-link :to="nextPageUrl">
            <img :src="imgUrl" id="comic-page">
        </router-link>
        <ComicNav :firstPageUrl="firstPageUrl" :prevPageUrl="prevPageUrl" :nextPageUrl="nextPageUrl" :latestPageUrl="latestPageUrl" />
        <Comments :page="page" />
    </div>
</template>

<script>
import axios from 'axios';
import files from '@/pages';
import ComicNav from '../components/ComicNav.vue';
import Comments from '../components/Comments.vue';

export default {
    name: 'Page',
    components : {
        ComicNav: ComicNav,
        Comments: Comments
    },
    data() {
        return {
            pages: [],
            page: {},
        }
    },
    computed: {
        chapter() {
            if (this.$route.query.chapter == null) {
                let latestPage = this.allPages[this.allPages.length-1];
                return this.chapterFromPage(latestPage);
            } else {
                return this.$route.query.chapter;
            }
        },
        imgUrl() {
            return "/comic/" + this.page.title + ".png";
        },
        chapters() {
            return files.filter(file => file.filename.length === 2);
        },
        firstPageUrl() {
            return "/?page=000";
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
        async getPages() {
            try {
                this.response = await axios.get("/api/pages/all");
                this.pages = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        pagesFromChapter(chapter) {
            return files.filter(file => file.parent === "public/comic/" + chapter);
        },
    },
    mounted() {
        this.getPages();
        document.onkeydown = (event) => {
            switch (event.keyCode) {
                case 37:
                    window.location.href = this.prevPageUrl;
                break;
                case 39:
                    window.location.href = this.nextPageUrl;
                break;
            }
        };
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#comic-page {
    margin-top: 10px;
    padding-top: 8px;
    padding-bottom: 15px;
    width: 100%;
    max-width: 800px;
}
</style>
