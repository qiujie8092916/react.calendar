import React from "react";

import "./Calendar.scss";

interface LoadingType {
  isShow: boolean;
}

export default class Loading extends React.Component<LoadingType, any> {
  render() {
    return (
      <div
        styleName="datepicker-load abs"
        style={{ display: this.props.isShow ? "block" : "none" }}
      >
        <div styleName="datepicker-load-container">
          <i styleName="dot" />
          <i styleName="dot" />
          <i styleName="dot" />
        </div>
      </div>
    );
  }
}
