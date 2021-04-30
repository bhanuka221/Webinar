const express = require("express");
const Post = require("../models/post");

const router = express.Router();

// Use POST request
router.post("", (req, res, next) => {
  // const post = new Post({
  //   title: req.body.title,
  //   content: req.body.content,
  // });

  // post
  //   .save()
  //   .then((createdPost) => {
  //     console.log("saved successfully!");
  //     res.status(201).json({
  //       message: "Post saved successfully",
  //       postId: createdPost._id,
  //     });
  //   })
  //   .catch(() => {
  //     console.log("error");
  //   });
  console.log(req.body);
});

// Delete post
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
  });
  res.status(200).json({
    message: "Successfully Deleted!",
  });
});

// Update post
router.put("", (req, res, next) => {
  const updatedPost = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.body.id }, updatedPost).then((result) => {
    console.log(result);
    res.status("200").json({
      message: "Updated Successfully !",
    });
  });
});

// get a post by id
router.get("/:id", (req, res, next) => {
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
router.use("", (req, res, next) => {
  // Post.find().then((documents) => {
    // res.status(200).json({
    //   message: "Posts fetched succesfully!",
    //   posts: documents,
    // });
  // });
  res.status(200).json({
    message: "Posts fetched succesfully!",
  });
});

module.exports = router;
