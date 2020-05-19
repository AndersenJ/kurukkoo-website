<template>
    <div class="comments">
        <form v-on:submit.prevent="addComment" v-if="user">
            <div class="comment">
                <div class="avatar">
                    <img :src="user.avatar">
                    <p class="commentUsername">{{user.username}}</p>
                </div>
                <textarea v-model="addedText" class="commentInfo"></textarea>
            </div>
            <button type="submit">Comment</button>
        </form>
        <router-link :to="'/account?page=' + page.title" v-else>
            <p class="account-link">Login or Register to comment</p>
        </router-link>
        <div class="comment" v-for="comment in pageComments" v-bind:key="comment._id">
            <div class="avatar">
                <img :src="comment.user.avatar">
                <p class="commentUsername">{{comment.user.username}}</p>
            </div>
            <div class="commentInfo">
                <p class="commentText">{{comment.text}}</p>
                <p class="commentDate">{{formatDate(comment.created)}}</p>
            </div>
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
        },
        pageComments() {
            return this.comments.filter((comment) => comment.page === this.page._id);
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
                this.addedText = '';
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
    }
}
</script>

<style scoped>

form, button {
    padding: 5px;
}

form {
    margin-top: 12px;
}

.avatar {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 15px;
}

.avatar img {
    max-width: 80px;
    max-height: 80px;
}

.comment {
    max-width: 500px;
    margin: auto;
    display: flex;
    margin-top: 10px;
    align-items: center;
}

.commentUsername {
    margin: 0;
}

.commentInfo {
    width: 100%;
    border: solid 3px #606060;
    height: min-content;
}

.commentInfo, .commentInfo * {
    background-color: #eeeeee;
}

.commentDate {
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 0.85em;
    text-align: left;
    padding-left: 1.15em;
    padding-right: 1.15em;
}

.commentText, textarea.commentInfo {
    text-align: left;
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 8px;
}

.account-link, button {
    padding: 15px;
    padding-bottom: 13px;
    background-color: #505050;
    color: #dcdcdc;
    text-decoration: none;
    width: max-content;
    margin: auto;
    margin-top: 13px;
}

a {
    text-decoration: none;
}

button {
    border: 0;
    cursor: pointer;
}

textarea.commentInfo {
    max-width: 500px;
    margin: auto;
    height: 100px;
    padding: 0.5em;
    box-sizing: border-box;
}

</style>
