import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
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

export default styled(DatepickerMask)`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 999;
`;
