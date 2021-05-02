import React, { Component } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";
import classes from "./PostModel.module.css";

export default class PostModel extends Component {
  state = {
    title: "",
    date: "",
    image: "",
    imagePreview: "",
  };

  imageReader = (imageFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        ...this.state,
        imagePreview: reader.result,
      });
    };

    reader.readAsDataURL(imageFile);
  };

  onChangeHandler = (e, key) => {
    console.log();
    let value = "";
    switch (key) {
      case "title":
        value = e.target.value;
        break;
      case "date":
        value = e.format("YYYY-MM-DD HH:mm");
        break;
      case "image":
        value = e.target.files[0];
        this.imageReader(value);
        break;
    }

    this.setState(
      {
        [key]: value,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  onSaveHandler = () => {
    const { title, date, image } = this.state;
    const data = {
      title: title,
      date: date,
      image: image,
    };
    this.props.onSavePost(data);
  };

  render() {
    const { title, date, image, imagePreview } = this.state;

    return (
      <div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
              </div>
              <div class="modal-body">
                <form onSubmit={(event) => this.onSubmitHandler(event)}>
                  <div className="mb-3">
                    {/* <label className={classes.header}>Sign Up</label> */}

                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        // className={
                        //   formValidation.isEmpty(error["name"].value)
                        //     ? "form-control"
                        //     : this.getCssClasses("form-control", classes.error)
                        // }
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => {
                          this.onChangeHandler(e, "title");
                        }}
                      />
                      {/* {this.renderInvalid("name")} */}
                    </div>

                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Date
                      </label>
                      <Datetime
                        onChange={(e) => {
                          this.onChangeHandler(e, "date");
                        }}
                        value={moment(date)}
                      />
                    </div>

                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Choose Event Image :
                      </label>
                      <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        onChange={(e) => {
                          this.onChangeHandler(e, "image");
                        }}
                      />
                    </div>
                    {(imagePreview !== "" || imagePreview) && (
                      <div className={classes.imagePreview}>
                        <img src={imagePreview} />
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.onSaveHandler}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
