import React from "react";
import { isEmpty } from "lodash";

class RenderTips extends React.PureComponent {
  render() {
    let { tip, tipHeight } = this.props;
    if (!isEmpty(tip))
      return (
        <div className="datepicker-tips">
          <p style={{ height: `${tipHeight}rem` }}>{tip}</p>
        </div>
      );
    else return null;
  }
}

export default RenderTips;
