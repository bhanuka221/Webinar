import React, { Component } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";
import classes from "./PostModel.module.css";
import * as constants from "../../../util/constant";
import * as formValidation from "../../../util/formValidation";

export default class PostModel extends Component {
  state = {
    title: "",
    date: "",
    image: "",
    imagePreview: "",
    modelState: "",
    imagePath: "",
    chooseImagePath: false,
    validForm: false,
  };

  modelClose = false;

  isObjEmpty = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  setModelState = () => {
    let modelState;
    if (this.isObjEmpty(this.props.post)) {
      modelState = constants.NEW;
    } else {
      modelState = constants.EDIT;
    }

    this.setState({
      modelState: modelState,
    });
  };

  componentDidMount() {
    this.setModelState();
    this.modelClose = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== prevProps.post || this.modelClose) {
      this.modelClose = false;
      if (this.isObjEmpty(this.props.post)) {
        this.setState({
          ...this.state,
          title: "",
          date: "",
          image: "",
          imagePreview: "",
          imagePath: "",
          modelState: constants.NEW,
          chooseImagePath: false,
        });
      } else {
        this.setState({
          ...this.state,
          modelState: constants.EDIT,
          title: this.props.post.title,
          date: this.props.post.date,
          imagePath: this.props.post.imagePath,
          chooseImagePath: true,
        });
      }
    }
  }

  imageReader = (imageFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        ...this.state,
        imagePreview: reader.result,
        chooseImagePath: false,
      });
    };

    reader.readAsDataURL(imageFile);
  };

  renderImageTag = () => {
    if (!this.state.chooseImagePath) {
      if (this.state.imagePreview !== "" || this.state.imagePreview) {
        return (
          <div className={classes.imagePreview}>
            <img src={this.state.imagePreview} />
          </div>
        );
      } else {
        return null;
      }
    } else {
      return (
        <div className="mb-3">
          {/* <label style={{display:"inline-block"}}>Image</label> */}
          <img src={this.state.imagePath} alt="" />
        </div>
      );
    }
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
        if (e.target.files[0]) {
          value = e.target.files[0];
          this.imageReader(value);
        }
        break;
    }

    this.setState({
      ...this.state,
      [key]: value,
      validForm: this.isValidForm(key, value),
    });
  };

  isValidForm = (currentKey, currentValue) => {
    let stateCopy = { ...this.state };
    stateCopy[currentKey] = currentValue;
    if (formValidation.isEmpty(stateCopy["title"])) {
      return false;
    }
    if (formValidation.isEmpty(stateCopy["date"])) {
      return false;
    }
    if (
      formValidation.isEmpty(stateCopy["imagePath"]) &&
      stateCopy["image"] === ""
    ) {
      return false;
    }

    return true;
  };

  onSaveHandler = () => {
    const { title, date, image } = this.state;
    const data = {
      title: title,
      date: date,
      image: image,
    };
    this.props.onSavePost(data);
    this.resetState();
    this.modelClose = true;
  };

  onUpdatePostHandler = () => {
    const {
      title,
      date,
      image,
      imagePath,
      chooseImagePath,
      validForm,
    } = this.state;
    let data = {
      _id: this.props.post._id,
      title: title,
      date: date,
      chooseImagePath: chooseImagePath,
    };
    if (chooseImagePath) {
      data = {
        ...data,
        imagePath: imagePath,
      };
    } else {
      data = {
        ...data,
        image: image,
      };
    }

    this.props.onUpdatePost(data);
    this.resetState();
    this.modelClose = true;
  };

  onCloseHandler = () => {
    this.resetState();
    this.modelClose = true;
  };

  resetState = () => {
    this.setState({
      title: "",
      date: "",
      image: "",
      imagePreview: "",
      modelState: "",
      imagePath: "",
      chooseImagePath: false,
    });
  };

  render() {
    const { title, date, modelState, validForm } = this.state;

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
                  {modelState === constants.NEW ? "Add Post" : "Edit Post"}
                </h5>
              </div>
              <div class={`modal-body ${classes.modelBody}`}>
                <form onSubmit={(event) => this.onSubmitHandler(event)}>
                  {/* <div className="mb-3"> */}
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

                  <div className={"mb-3 "+classes.imageContainer}>
                    {/* <label for="exampleInputPassword1" className="form-label">
                      Choose Event Image :
                    </label> */}
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      onChange={(e) => {
                        this.onChangeHandler(e, "image");
                      }}
                      style={{ display: "none" }}
                      ref={(imageInput) => (this.imageInput = imageInput)}
                    />
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      onClick={() => this.imageInput.click()}
                    >
                      Pick Image
                    </button>
                  </div>

                  {this.renderImageTag()}

                  {/* </div> */}
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={this.onCloseHandler}
                  data-bs-toggle="collapse"
                  data-bs-target={
                    this.props.post._id &&
                    "#flush-collapseOne" + this.props.post._id
                  }
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={
                    modelState === constants.NEW
                      ? this.onSaveHandler
                      : this.onUpdatePostHandler
                  }
                  data-bs-dismiss="modal"
                  data-bs-toggle="collapse"
                  data-bs-target={
                    this.props.post._id &&
                    "#flush-collapseOne" + this.props.post._id
                  }
                  disabled={!validForm}
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
