import React from "react";
import { CalendarType } from "./propTypes";
import { CancelFuncType } from "./context";

import "./icon/iconfont.css";
import "./Calendar.css";

interface HeaderType {
  title: CalendarType["title"];
  onCancel: CancelFuncType;
}

class Header extends React.PureComponent<HeaderType, any> {
  render() {
    return (
      <header className="datepicker-header flex rlt" flex="center">
        {this.props.title}
        <div className="close" onClick={this.props.onCancel}>
          <i className="iconfont">&#xe608;</i>
        </div>
      </header>
    );
  }
}

export default Header;
