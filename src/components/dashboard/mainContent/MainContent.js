import axios from "axios";
import React, { Component } from "react";
import * as constants from "../../../util/constant";
import classes from "./MainContent.module.css";
import PostModel from "./PostModel";
import Post from "./posts/Post";
import { connect } from "react-redux";


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
      .delete(constants.BASE_URL + "/post/" + postId)
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

  onEditPost = (post) => {
    this.setState({
      selectedPost: post,
    });
  };

  onSavePost = (postData) => {
    const data = new FormData();
    data.append("title", postData.title);
    data.append("date", postData.date);
    data.append("image", postData.image, postData.title);
    data.append("userId", "608c2435909bca5c8d23b665");

    axios
      .post(constants.BASE_URL + "/post/", data)
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

  onUpdatePost = (post) => {
    let data;
    if (post.chooseImagePath) {
      data = {
        ...post,
        userId: "608c2435909bca5c8d23b665",
      };
    } else {
      data = new FormData();
      data.append("_id", post._id);
      data.append("title", post.title);
      data.append("date", post.date);
      data.append("image", post.image, post.title);
      data.append("userId", "608c2435909bca5c8d23b665");
    }
    axios
      .put(constants.BASE_URL + "/post/" + post._id, data)
      .then((response) => {
        let updatedPosts = [...this.state.posts];
        let indexToUpdate = updatedPosts.findIndex((p) => post._id === p._id);
        console.log(response.data);
        updatedPosts[indexToUpdate] = response.data.post;
        this.setState({
          ...this.state,
          posts: updatedPosts,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  onAddPostHandler = () => {
    this.setState({
      ...this.state,
      selectedPost: {},
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
              onClick={this.onAddPostHandler}
            >
              Add Post
            </button>
          </div>
          <div className={classes.postContent}>
            <Post
              posts={this.state.posts}
              onDeletePost={this.onDeletePost}
              onEditPost={this.onEditPost}
            />
          </div>
        </div>
        <PostModel
          onSavePost={this.onSavePost}
          onUpdatePost={this.onUpdatePost}
          post={this.state.selectedPost}
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onSaveAuthData: (authData) => dispatch(actionTypes.saveAuthData(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
