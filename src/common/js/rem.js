import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Rem extends Component {
  state = {
    docElement: null,
    originFontSize: "",
    usePixel: false
  };
  static defaultProps = {
    pixel: false
  };
  static propTypes = {
    vw: PropTypes.string.isRequired,
    pixel: PropTypes.bool
  };
  componentDidMount() {
    /**
     * 判断浏览器是否支持vw
     */
    const isSupportVW = (() => {
      const element = document.createElement("div");
      const val = "1vw";
      element.style["width"] = val;
      return element.style["width"] === val;
    })();
    /**
     * documentElement
     */
    const docElement = document.documentElement;
    this.setState(
      {
        docElement,
        originFontSize: docElement.style["font-size"],
        usePixel: !isSupportVW || this.props.pixel
      },
      () => {
        if (this.state.usePixel) {
          window.addEventListener("resize", this.setDocFontSize);
        }
        this.setDocFontSize();
      }
    );
  }
  componentWillUnmount() {
    // 还原字体大小
    this.setWithVal(this.state.originFontSize);
    // 卸载resize监听
    window.removeEventListener("resize", this.setDocFontSize);
  }
  /**
   * 设置font-size
   */
  setWithVal = val => {
    this.state.docElement.style.fontSize = val;
  };
  /**
   * 计算font-size
   */
  setDocFontSize = () => {
    const vwNumber = parseInt(this.props.vw);
    if (this.state.usePixel) {
      const winWidth = parseFloat(
        getComputedStyle(this.state.docElement, null).width
      );
      this.setWithVal(`${winWidth / (100 / vwNumber)}px`);
    } else {
      this.setWithVal(`${vwNumber}vw`);
    }
  };
  render() {
    return this.props.children;
  }
}
