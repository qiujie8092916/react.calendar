import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Rem extends Component {
  state = {
    docElement: null,
    originFontSize: ""
  };
  static propTypes = {
    vw: PropTypes.string.isRequired
  };
  componentDidMount() {
    /**
     * documentElement
     */
    const docElement = document.documentElement;
    this.setState(
      {
        docElement,
        originFontSize: docElement.style["font-size"]
      },
      () => {
        window.addEventListener("resize", this.setDocFontSize);
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
    const winWidth = parseFloat(
      getComputedStyle(this.state.docElement, null).width
    );
    this.setWithVal(`${winWidth / (100 / vwNumber)}px`);
  };
  render() {
    return this.props.children;
  }
}
