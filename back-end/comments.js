const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const pages = require("./pages.js");
const User = users.model;
const Page = pages.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    page: {
        type: mongoose.Schema.ObjectId,
        ref: 'Page'
    },
    text: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', commentSchema);

// post comment
router.post("/", validUser, async (req, res) => {
    const comment = new Comment({
        user: req.user,
        page: req.body.page,
        text: req.body.text,
    });
    try {
        await comment.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all comments for page
router.get("/", async (req, res) => {
    try {
        let comments = await Comment.find({
            //"page": req.query.id
        }).sort({
            created: -1
        }).populate('user');
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Comment,
    routes: router,
}
