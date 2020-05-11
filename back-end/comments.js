const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const photos = require("./photos.js");
const User = users.model;
const Photo = photos.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photo'
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
        photo: req.body.photo,
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

// get all comments for photo
router.get("/", async (req, res) => {
    try {
        let comments = await Comment.find({
            "photo": req.query.id
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
