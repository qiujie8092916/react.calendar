import React from "react";
import { isEmpty } from "lodash";

class RenderTips extends React.PureComponent {
  render() {
    let { tip, tipHeight } = this.props;
    return !isEmpty(tip) ? (
      <div className="datepicker-tips">
        <p style={{ height: `${tipHeight}rem` }}>{tip}</p>
      </div>
    ) : null;
  }
}

export default RenderTips;
