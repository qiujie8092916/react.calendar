import React from "react";
import ReactDOM from "react-dom";

class DatepickerMask extends React.PureComponent {
  render() {
    return this.props.visible
      ? ReactDOM.createPortal(
          <div
            className="_calendar-mask animated"
            onClick={this.props.onCancel}
          />,
          document.getElementsByTagName("body")[0]
        )
      : null;
  }
}

export default DatepickerMask;
