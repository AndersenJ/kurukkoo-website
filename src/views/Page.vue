<template>
    <div class="page">
        <h1>{{this.page.title}}</h1>
        <ComicNav :firstPageUrl="firstPageUrl" :prevPageUrl="prevPageUrl" :nextPageUrl="nextPageUrl" :latestPageUrl="latestPageUrl" />
        <router-link :to="nextPageUrl">
            <img :src="page.path" id="comic-page">
        </router-link>
        <p>{{page.description}}</p>
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
            user: null,
        }
    },
    computed: {
        firstPageUrl() {
            return "/?page=000";
        },
        prevPageUrl() {
            for (let p in this.pages) {
                if (this.pages[p].title === this.$route.query.page && p != 0)
                    return "/?page=" + this.pages[parseInt(p)-1].title;
            }
            return this.firstPageUrl;
        },
        nextPageUrl() {
            for (let p in this.pages) {
                if (this.pages[p].title === this.$route.query.page && p != this.pages.length-1)
                    return "/?page=" + this.pages[parseInt(p)+1].title;
            }
            return this.latestPageUrl;
        },
        latestPageUrl() {
            return "/?page=" + this.pages[this.pages.length-1].title;
        },
        page() {
            for (let p in this.pages) {
                if (this.pages[p].title === this.$route.query.page)
                    return this.pages[p];
            }
            if (this.pages.length > 0)
                return this.pages[0];
            else {
                return null;
            }
        }
    },
    methods: {
        chapterFromPage(p) {
            return p.chapter;
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
    async beforeMount() {
        try {
            let response = await axios.get('/api/users');
            this.$root.$data.user = response.data.user;
            this.user = response.data.user;
        } catch (error) {
            this.$root.$data.user = null;
        }
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
