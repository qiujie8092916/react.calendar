import React from "react";

interface LoadingType {
  isShow: boolean;
}

export default class Loading extends React.Component<LoadingType, any> {
  render() {
    return (
      <div
        className="datepicker-load abs"
        style={{ display: this.props.isShow ? "block" : "none" }}
      >
        <div className="datepicker-load-container">
          <i className="dot" />
          <i className="dot" />
          <i className="dot" />
        </div>
      </div>
    );
  }
}
