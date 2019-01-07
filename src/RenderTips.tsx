import React from "react";
import { isEmpty } from "lodash";
import { CalendarType } from "./propTypes";

interface RenderTipsType {
  tip: CalendarType["tip"];
  tipHeight: number;
}

class RenderTips extends React.PureComponent<RenderTipsType, any> {
  render() {
    const { tip, tipHeight } = this.props;
    return !isEmpty(tip) ? (
      <div className="datepicker-tips">
        <p className="tip-txt" style={{ height: `${tipHeight}rem` }}>
          {tip}
        </p>
      </div>
    ) : null;
  }
}

export default RenderTips;
