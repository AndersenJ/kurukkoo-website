<template>
    <div class="comments">
        <form v-on:submit.prevent="addComment" v-if="user">
            <textarea v-model="addedText"></textarea>
            <br />
            <button type="submit">Comment</button>
        </form>
        <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
            <div class="commentInfo">
                <p class="commentText">{{comment.text}}</p>
                <p class="commentUsername">{{comment.user.username}}</p>
            </div>
            <p class="commentDate">{{formatDate(comment.created)}}</p>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import axios from 'axios';

export default {
    name: 'Comments',
    data() {
        return {
            comments: [],
            addedText: "",
            addedDate: Date
        }
    },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
    created() {
        this.getComments();
    },
    props: {
        page: {
            type: Object
        }
    },
    methods: {
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
                return moment(date).fromNow();
            else
                return moment(date).format('d MMMM YYYY');
        },
        async getComments() {
            try {
                this.response = await axios.get("/api/comments?id=" + this.page._id);
                this.comments = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async addComment() {
            let addedText = this.addedText;
            let newComment =  {
                "text": addedText,
                "page": this.page
            };
            try {
                this.response = await axios.post("/api/comments", newComment);
                this.getComments();
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
    }
}
</script>

<style scoped>
</style>
