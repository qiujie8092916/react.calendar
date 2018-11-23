import React from "react";
import { CalendarType } from "./propTypes";
import { CancelFuncType } from "./context";

import "./Calendar.scss";

interface HeaderType {
  title: CalendarType["title"];
  onCancel: CancelFuncType;
}

class Header extends React.PureComponent<HeaderType, any> {
  render() {
    return (
      <header styleName="datepicker-header flx rlt flx-ct">
        {this.props.title}
        <div styleName="close" onClick={this.props.onCancel}>
          <i className="iconfont___Zy2_S2sEs7">&#xe608;</i>
        </div>
      </header>
    );
  }
}

export default Header;
