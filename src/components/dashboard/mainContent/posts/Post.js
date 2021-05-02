import React, { Component } from "react";
import classes from "./Post.module.css";

class Post extends Component {
  onDeletePostHandler = (postId) => {
    this.props.onDeletePost(postId);
  };

  renderPosts = () => {
    const posts = this.props.posts;
    if (posts && posts.length > 0) {
      return posts.map((post) => {
        return (
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item" key={post._id}>
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
                class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div class="accordion-body">
                  <div className="mb-3">
                    <label>Title</label>
                    <div>{post.title}</div>
                  </div>
                </div>

                <div class="accordion-body">
                  <div className="mb-3">
                    <label>Date</label>
                    <div>{post.date}</div>
                  </div>
                </div>

                <div class="accordion-body">
                  <div className={"mb-3 " + classes.imagePreview}>
                    {/* <label style={{display:"inline-block"}}>Image</label> */}
                    <img src={post.imagePath} alt="" />
                  </div>
                </div>
                <div class="accordion-body">
                  <div className={"mb-3 "}>
                    <button>edit</button>
                    <button onClick={() => this.onDeletePostHandler(post._id)}>delete</button>
                  </div>
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
