const Post = require("../models/post");

const Comment = require("../models/comment");
const { CountMinSketch } = require('bloom-filters')

const sketch = new CountMinSketch(0.001, 0.99);

exports.createPost = (req, res, next) => {

  const url = req.protocol + "://" + req.get("host");

  today = new Date();
  img = null
  if (!(req.file == null)) {
    img = url + "/images/" + req.file.filename;
  }
  sketch.update('create');

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: img,
    creator: req.userData.userId,
    userName: req.userData.email.split('@')[0],
    postDate: new Date().toLocaleString(),
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a post failed!"
      });
    });
};

exports.updatePost = (req, res, next) => {

  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId,
    userName: req.userData.email.split('@')[0],
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  Post.updateOne({
      _id: req.params.id,
      creator: req.userData.userId
    }, post).then(result => {
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
        message: "Couldn't update post!"
      });
    });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({
    _id: req.params.id,
    creator: req.userData.userId
  }).then(result => {
    if (result.n > 0) {
      sketch.update('delete');
      res.status(200).json({
        message: "Post successful!"
      });
    } else {
      res.status(401).json({
        message: "Not authorized!"
      });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });

  Comment.deleteMany({
    postId: req.params.id,
  }).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Comment successful!"
      });
    }
  }).catch(error => {});
};

exports.getpostTitleD3 = (req, res, next) => {
  Post.aggregate([{
    "$group": {
      _id: "$title",
      count: {
        $sum: 1
      }
    }
  }]).then(docs => {
    return res.status(200).json({
      docs
    });
  })
};

exports.getAllPosts = (req, res, next) => {
  const postQuery = Post.find();
  let fetchedPosts;
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.getCMS = (req, res, next) => {

  doc = [sketch.count('create'), doc = sketch.count('delete')];

  return res.status(200).json({
    doc
  });
};


exports.mapRed = (req, res, next) => {

  //const postQuery = Post.find({ userName: "meitarc" });
  //console.log(postQuery);

}
