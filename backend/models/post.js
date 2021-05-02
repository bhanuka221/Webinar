const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
