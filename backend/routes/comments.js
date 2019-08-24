const express = require("express");

const CommentController = require("../controllers/comments");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, CommentController.createComment);

router.put("/:id",checkAuth , CommentController.updateComment);

router.get("", CommentController.getComments);

router.get("/:id", CommentController.getComment);

router.delete("/:id", checkAuth, CommentController.deleteComment);

module.exports = router;
