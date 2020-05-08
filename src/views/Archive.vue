<template>
    <div class="archive">
        <h1>Archive</h1>
        <div class="chapters">
            <div v-for="ch in chapters" :key="ch.filename">
                <div>
                    <img :src="'chapter_covers/' + ch.filename + '.png'">
                </div>
                <div class="chapter-pages">
                    <div v-for="p in pages(ch.filename)" :key="p.filename">
                        <a class="page-link" :href="'/?chapter=' + ch.filename + '&page=' + p.filename.substr(0, p.filename.length-4)">{{p.filename.substr(0, p.filename.length-4)}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import files from '@/pages';

export default {
    name: 'Archive',
    computed: {
        chapters() {
            return files.filter(file => file.filename.length === 2);
        },
    },
    methods: {
        chapterFromPage(p) {
            return p.parent.substr(-2);
        },
        pages(chapter) {
            return files.filter(file => file.parent === "public/comic/" + chapter);
        },
    },
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
    width: 800px;
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
