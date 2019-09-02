const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const comment = new Comment({
    postId: req.body.postId,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
    userName: req.userData.email.split('@')[0],
    commentDate: new Date().toLocaleString()
  });
  comment.save().then(createdComment => {
      res.status(201).json({
        message: "Comment added successfully",
        comment: {
          ...createdComment,
          id: createdComment._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a comment failed!"
      });
    });
};

exports.updateComment = (req, res, next) => {
  const comment = new Comment({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
    userName: req.userData.email.split('@')[0],
  });
  Comment.updateOne({
      _id: req.params.id,
      creator: req.userData.userId
    }, comment).then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Update successful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update comment!"
      });
    });;

}

exports.getComments = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const commentQuery = Comment.find();
  let fetchedComments;
  if (pageSize && currentPage) {
    commentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  commentQuery
    .then(documents => {
      fetchedComments = documents;
      return Comment.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Comments fetched successfully!",
        comments: fetchedComments,
        maxComments: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching comments failed!"
      });
    });
};

exports.getComment = (req, res, next) => {
  Comment.findById(req.params.id).then(comment => {
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({
        message: "Comment not found!"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching comment failed!"
    });
  });
};

exports.deleteComment = (req, res, next) => {
  Comment.deleteOne({
    _id: req.params.id,
    creator: req.userData.userId
  }).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Comment successful!"
      });
    } else {
      res.status(401).json({
        message: "Not authorized!"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching comment failed!"
    });
  });
};
