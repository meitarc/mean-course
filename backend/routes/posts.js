const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createPost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("/mapRed", PostController.mapRed);

router.get("/sketch", PostController.getCMS);

router.get("/d3title", PostController.getpostTitleD3);

router.get("/d3Reduce", PostController.getpostSomethingD3);

router.get("/maps",PostController.getAllPosts);

router.get("", PostController.getPosts);

router.get("/:id", PostController.getPost);



router.delete("/:id", checkAuth, PostController.deletePost);


module.exports = router;
