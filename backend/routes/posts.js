const express = require("express");
const multer = require("multer");
const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

// Use POST request
router.post(
  "/post",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      date: req.body.date,
      userId: req.decodedUserData.userId,
      imagePath: url + "/images/" + req.file.filename,
    });

    post
      .save()
      .then((createdPost) => {
        res.status(201).json({
          message: "Post saved successfully",
          post: createdPost,
        });
      })
      .catch((error) => {
        res.status(401).json({
          message: "Fail to save post",
          error: error,
        });
      });
  }
);

// Delete post
router.delete("/post/:id",checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
  });
  res.status(200).json({
    message: "Successfully Deleted!",
  });
});

// Update post
router.put(
  "/post/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;

    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
      console.log(req.body._id);
    }

    const updatedPost = new Post({
      _id: req.body._id,
      title: req.body.title,
      date: req.body.date,
      imagePath: imagePath,
      userId: req.decodedUserData.userId,
    });

    Post.findOneAndUpdate({ _id: req.body._id }, updatedPost, {
      new: true,
    }).then((updatedPost) => {
      console.log(updatedPost);
      res.status("200").json({
        message: "Post Updated Successfully!",
        post: updatedPost,
      });
    });
  }
);

// get a post by id
router.get("/post/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status("200").json({
        message: "Retrieve successfull !",
        data: post,
      });
    } else {
      res.status("404").json({
        message: "Post not found!",
        data: null,
      });
    }
  });
});

// All reques that comes as localhost:3000/posts will come here
router.get("", (req, res, next) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "Posts fetched succesfully!",
        posts: documents,
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Fail to fetch the Post",
      });
    });
});

module.exports = router;
