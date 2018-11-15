import React from "react";

export default class Loading extends React.Component {
  render() {
    return (
      <div
        className="datepicker-load abs"
        style={{ display: this.props.isShow ? "block" : "none" }}
      >
        <div className="datepicker-load-container">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }
}
