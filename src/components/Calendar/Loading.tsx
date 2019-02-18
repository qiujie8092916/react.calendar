import React from "react";
import styled from "styled-components";
// import { cldFlashPop } from "./index";
import "./styles.css";
interface LoadingType {
  isShow: boolean;
  className?: string;
}

class Loading extends React.Component<LoadingType, any> {
  render() {
    return this.props.isShow ? (
      <div className={`${this.props.className} datepicker-load abs`}>
        <div className="datepicker-load-container">
          <i className="dot" />
          <i className="dot" />
          <i className="dot" />
        </div>
      </div>
    ) : null;
  }
}

export default styled(Loading)`
  width: 100%;
  height: 100%;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 1;
  .datepicker-load-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .dot {
      display: inline-block;
      width: 0.32rem;
      height: 0.32rem;
      border-radius: 0.32rem;
      background-color: #0076ff;
      margin: 0 0.1067rem;
      opacity: 0.1;
      animation: cldFlashPop 0.6s linear alternate infinite both;
      &:nth-of-type(2) {
        animation-delay: 0.2s;
      }
      &:last-child {
        animation-delay: 0.4s;
      }
    }
  }
`;
