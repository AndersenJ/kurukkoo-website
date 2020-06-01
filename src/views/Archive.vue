<template>
    <div class="archive">
        <h1>Archive</h1>
        <div class="chapters">
            <div v-for="ch in chapters" :key="ch.filename">
                <div>
                    <img :src="'chapter_covers/' + ch + '.png'">
                </div>
                <div class="chapter-pages">
                    <div v-for="p in pagesInChapter(ch)" :key="p.sortTitle">
                        <a class="page-link" :href="'/?page=' + p.title">{{p.title}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Archive',
    data() {
        return {
            pages: [],
        }
    },
    computed: {
        chapters() {
            let c = new Set();
            for (let i = 0; i < this.pages.length; i++) {
                c.add(this.pages[i].chapter);
            }
            return Array.from(c);
        },
    },
    methods: {
        pagesInChapter(chapter) {
            return this.pages.filter(page => page.chapter === chapter);
        },
        async getPages() {
            try {
                this.response = await axios.get("/api/pages/all");
                this.pages = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
    },
    mounted() {
        this.getPages();
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chapter-pages, .chapters > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.chapters > div {
    max-width: 800px;
    margin: auto;
    padding-bottom: 50px;
}

.chapter-pages {
    flex-wrap: wrap;
    width: 500px;
}

.page-link {
    text-decoration: none;
    padding: 10px;
    font-weight: bold;
    color: #505050;
}
</style>
