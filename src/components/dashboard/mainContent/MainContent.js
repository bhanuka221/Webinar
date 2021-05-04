import axios from "axios";
import React, { Component } from "react";
import * as constants from "../../../util/constant";
import classes from "./MainContent.module.css";
import PostModel from "./PostModel";
import Post from "./posts/Post";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

class MainContent extends Component {
  state = {
    posts: [],
    selectedPost: {},
    showAlert: false,
    alertTiltle: "",
    alertType: "",
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
          showAlert: true,
          alertTiltle: response.data.message,
          alertType: constants.SUCCESS,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            ...this.state,
            showAlert: true,
            alertTiltle: error.response.data.message,
            alertType: constants.ERROR,
          });
        }
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

    axios
      .post(constants.BASE_URL + "/post/", data)
      .then((response) => {
        this.setState({
          ...this.state,
          posts: this.state.posts.concat(response.data.post),
          showAlert: true,
          alertTiltle: response.data.message,
          alertType: constants.SUCCESS,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            ...this.state,
            showAlert: true,
            alertTiltle: error.response.data.message,
            alertType: constants.ERROR,
          });
        }
      });
  };

  onUpdatePost = (post) => {
    let data;
    if (post.chooseImagePath) {
      data = {
        ...post,
      };
    } else {
      data = new FormData();
      data.append("_id", post._id);
      data.append("title", post.title);
      data.append("date", post.date);
      data.append("image", post.image, post.title);
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
          showAlert: true,
          alertTiltle: response.data.message,
          alertType: constants.SUCCESS,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            ...this.state,
            showAlert: true,
            alertTiltle: error.response.data.message,
            alertType: constants.ERROR,
          });
        }
      });
  };

  onAddPostHandler = () => {
    this.setState({
      ...this.state,
      selectedPost: {},
    });
  };

  renderAddPostBtn = () => {
    if (
      this.props.accessToken &&
      this.props.authData.user.role === constants.ADMIN
    ) {
      return (
        <button
          type="button"
          class="btn btn-outline-light"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={this.onAddPostHandler}
        >
          Add Post
        </button>
      );
    }
    return null;
  };

  alertTimeOut = () => {
    setTimeout(() => {
      this.setState({ ...this.state, showAlert: false });
    }, 3000);
  };

  renderAlert = () => {
    if (this.state.showAlert) {
      return (
        <SweetAlert
          type={this.state.alertType}
          title={this.state.alertTiltle}
          onConfirm={this.alertTimeOut()}
          show={this.state.showAlert}
          confirmBtnStyle={{display:'none'}}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <main>
        {this.renderAlert()}
        <div className={classes.postCard}>
          <div className={classes.postHeader}>
            <span></span>
            <span className={classes.postHeaderHeading}>Posted Webinars</span>
            <span>{this.renderAddPostBtn()}</span>
          </div>
          <div className={classes.postContent}>
            <Post
              posts={this.state.posts}
              onDeletePost={this.onDeletePost}
              onEditPost={this.onEditPost}
              authData={this.props.authData}
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
    authData: state.auth.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onSaveAuthData: (authData) => dispatch(actionTypes.saveAuthData(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
