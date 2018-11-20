import React from "react";
import ReactDOM from "react-dom";
import { CalendarType } from "./propTypes";
import { CancelFuncType } from "./context";

interface DatepickerMaskType {
  onCancel: CancelFuncType;
  visible: CalendarType["visible"];
}

class DatepickerMask extends React.PureComponent<DatepickerMaskType, any> {
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
