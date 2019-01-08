import React from "react";
import styled from "styled-components";
// import { cldFadeIn, cldFadeOut, cldSlideInUp, cldSlideInDown } from "./index";
import "./styles.css";

interface AnimateFrameType {
  fullScreen: boolean;
  toRoof: string;
  visible: boolean;
  className?: string;
}

class AnimateFrame extends React.Component<AnimateFrameType> {
  render() {
    const { toRoof, fullScreen } = this.props;
    return (
      <div
        className={`${this.props.className} animated fixed`}
        style={{ top: !fullScreen ? toRoof : 0 }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default styled(AnimateFrame)`
  background: #fff;
  display: ${(props: AnimateFrameType) => (props.visible ? "block" : "none")};
  height: 100%;
  width: 100%;
  z-index: 1111;
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
