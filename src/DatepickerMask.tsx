import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { CalendarType } from "./propTypes";
import { CancelFuncType } from "./context";
// import { cldFadeIn, cldFadeOut, cldSlideInUp, cldSlideInDown } from "./index";
import "./styles.css";

interface DatepickerMaskType {
  onCancel: CancelFuncType;
  visible: CalendarType["visible"];
  className?: string;
}

class DatepickerMask extends React.PureComponent<DatepickerMaskType, any> {
  render() {
    return this.props.visible
      ? ReactDOM.createPortal(
          <div
            className={`${this.props.className} animated`} /* _calendar-mask */
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
  &.animated {
    animation-duration: 0.35s;
    animation-fill-mode: both;
    &.fade-enter {
      animation-name: cldFadeIn;
    }
    &.fade-leave {
      animation-name: cldFadeOut;
    }
    &.slideV-enter {
      animation-name: cldSlideInUp;
    }
    &.slideV-leave {
      animation-name: cldSlideInDown;
    }
  }
`;
