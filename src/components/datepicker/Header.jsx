import React from "react";

import "./icon/iconfont.css";
import "./Calendar.css";

class Header extends React.PureComponent {
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
