import React from "react";
import { CalendarType } from "./propTypes";
import { CancelFuncType } from "./context";

import "./commonStyle.css";

interface HeaderType {
  title: CalendarType["title"];
  onCancel: CancelFuncType;
}

class Header extends React.PureComponent<HeaderType, any> {
  render() {
    return (
      <header className="datepicker-header flx srlt flx-ct">
        {this.props.title}
        <div className="close" onClick={this.props.onCancel}>
          <i className="iconfont___Zy2_S2sEs7">&#xe608;</i>
        </div>
      </header>
    );
  }
}

export default Header;
