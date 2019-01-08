import React from "react";
import { CalendarType } from "./propTypes";
import { CancelFuncType } from "./context";
import styled from "styled-components";

interface HeaderType {
  title: CalendarType["title"];
  onCancel: CancelFuncType;
  className?: string;
}

class Header extends React.PureComponent<HeaderType, any> {
  render() {
    return (
      <header
        className={`${
          this.props.className
        } flx srlt flx-ct rlt`} /* datepicker-header */
      >
        {this.props.title}
        <div className="close" onClick={this.props.onCancel}>
          <i className="iconfont">&#xe608;</i>
        </div>
      </header>
    );
  }
}

export default styled(Header)`
  font-size: 0.4rem;
  line-height: 0.82rem;
  color: #333;
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 0.35rem;
    .iconfont {
      transform: rotate(45deg);
      display: block;
    }
  }
`;
