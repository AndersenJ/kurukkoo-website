const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
    dest: '../public/pages/',
    limits: {
        fileSize: 10000000
    }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const pageSchema = new mongoose.Schema({
    path: String,
    title: String,
    sortTitle: String,
    description: String,
    chapter: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Page = mongoose.model('Page', pageSchema);

// upload page
router.post("/", validUser, upload.single('page'), async (req, res) => {
    // check parameters
    if (!req.file)
        return res.status(400).send({
            message: "Must upload a file."
        });

        const page = new Page({
            path: "/pages/" + req.file.filename,
            title: req.body.title,
            sortTitle: req.body.sortTitle,
            description: req.body.description,
        });
        try {
            await page.save();
            return res.sendStatus(200);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
});

// get all pages
router.get("/all", async (req, res) => {
  try {
    let pages = await Page.find().sort({
      sortTitle: 1
    });
    return res.send(pages);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get one page
router.get("/single", async (req, res) => {
  try {
    let page = await Page.findById(req.query.id);
    return res.send(page);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
    model: Page,
    routes: router,
}
