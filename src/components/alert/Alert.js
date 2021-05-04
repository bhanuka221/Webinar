import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

class Alert extends Component {

    state = {}

    renderSweetAlert = (type, message, shouldRender) => {
        setTimeout(() => {
          this.setState({ showAlert: false });
        }, 2000);
      };

  render() {
    return (
      <SweetAlert
        title={"Uses props.show"}
        onConfirm={this.renderSweetAlert()}
        show={this.state.showAlert}
      />
    );
  }
}

export default Alert;
