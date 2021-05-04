import React, { Component, Fragment } from "react";
import classes from "./Post.module.css";
import * as constants from "../../../../util/constant";
import SweetAlert from "react-bootstrap-sweetalert";

class Post extends Component {
  state = {
    showAlert: false,
    selectedPostId: "",
  };

  renderAlert = () => {
    if (this.state.showAlert) {
      return (
        <SweetAlert
          type="warning"
          showCancel={true}
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={this.onDeletePost}
          onCancel={this.onCancelDeletePost}
          show={this.state.showAlert}
        >
          Do you want to delete the post permanently!
        </SweetAlert>
      );
    }
    return null;
  };

  onCancelDeletePost = () => {
    this.setState({
      ...this.state,
      showAlert: false,
      selectedPostId: '',
    })
  }

  onDeletePost = () => {
    this.setState({
      ...this.state,
      showAlert: false,
    }, () => {
      this.props.onDeletePost(this.state.selectedPostId);
    });
  };

  onDeletePostHandler = (postId) => {
    this.setState({
      ...this.state,
      showAlert: true,
      selectedPostId: postId,
    });
  };

  onEditPostHandler = (post) => {
    this.props.onEditPost(post);
  };

  renderButtons = (post) => {
    if (
      this.props.authData.token &&
      this.props.authData.user.role === constants.ADMIN
    ) {
      return (
        <Fragment>
          {this.renderAlert()}
          <button
            onClick={() => this.onEditPostHandler(post)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className={classes.edit}
          >
            Edit
          </button>
          <button
            onClick={() => this.onDeletePostHandler(post._id)}
            className={classes.delete}
          >
            Delete
          </button>
        </Fragment>
      );
    }

    return null;
  };

  renderPosts = () => {
    const posts = this.props.posts;
    if (posts && posts.length > 0) {
      return posts.map((post) => {
        return (
          <div
            class="accordion accordion-flush"
            id="accordionFlushExample"
            key={post._id}
          >
            <div class="accordion-item">
              <h2 class="accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#flush-collapseOne" + post._id}
                  aria-expanded="false"
                  aria-controls={"flush-collapseOne" + post._id}
                >
                  {post.title}
                </button>
              </h2>
              <div
                id={"flush-collapseOne" + post._id}
                class={"accordion-collapse collapse "}
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className={classes.contentBody}>
                  <span>
                    <div className="mb-3">
                      <label>
                        <strong>Title</strong>
                      </label>
                      <div>{post.title}</div>
                    </div>
                  </span>

                  <span>
                    <div className="mb-3">
                      <label>
                        <strong>Date</strong>
                      </label>
                      <div>{post.date}</div>
                    </div>
                  </span>
                </div>

                <div className={classes.imageBody}>
                  <div className={"mb-3 " + classes.imagePreview}>
                    {/* <label style={{display:"inline-block"}}>Image</label> */}
                    <img src={post.imagePath} alt="" />
                  </div>
                </div>
                <div className={classes.button}>
                  <div className={"mb-3 "}>{this.renderButtons(post)}</div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div>No Post Found!</div>;
    }
  };

  render() {
    return <div>{this.renderPosts()}</div>;
  }
}

export default Post;
