import axios from "axios";
import React, { Component } from "react";
import * as constants from "../../../util/constant";
import classes from "./MainContent.module.css";
import PostModel from "./PostModel";
import Post from "./posts/Post";

class MainContent extends Component {
  state = {
    posts: [],
    selectedPost: {},
  };

  componentDidMount() {
    axios
      .get(constants.BASE_URL)
      .then((response) => {
        this.setState({
          ...this.state,
          posts: response.data.posts,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  onDeletePost = (postId) => {
    axios
      .delete(constants.BASE_URL + "/" + postId)
      .then((response) => {
        this.setState({
          ...this.state,
          posts: this.state.posts.filter((post) => post._id !== postId),
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSavePost = (postData) => {
    const data = new FormData();
    data.append("title", postData.title);
    data.append("date", postData.date);
    data.append("image", postData.image, postData.title);
    data.append("userId", "608c2435909bca5c8d23b665");

    axios
      .post(constants.BASE_URL, data)
      .then((response) => {
        this.setState({
          ...this.state,
          posts: this.state.posts.concat(response.data.post),
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <main>
        <div className={classes.postCard}>
          <div className={classes.postHeader}>
            <button
              type="button"
              class="btn btn-outline-light"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Add Post
            </button>
          </div>
          <div className={classes.postContent}>
            <Post posts={this.state.posts} onDeletePost={this.onDeletePost} />
          </div>
        </div>
        <PostModel
          onSavePost={this.onSavePost}
          post={this.state.selectedPost}
        />
      </main>
    );
  }
}

export default MainContent;
