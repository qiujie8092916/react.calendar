import React from "react";
import { isEmpty } from "lodash";
import { CalendarType } from "./propTypes";
import styled from "styled-components";

interface RenderTipsType {
  tip: CalendarType["tip"];
  tipHeight: number;
  className?: string;
}

class RenderTips extends React.PureComponent<RenderTipsType, any> {
  render() {
    const { tip, tipHeight } = this.props;
    return !isEmpty(tip) ? (
      <div className={`${this.props.className} datepicker-tips`}>
        <p className="tip-txt" style={{ height: `${tipHeight}rem` }}>
          {tip}
        </p>
      </div>
    ) : null;
  }
}

export default styled(RenderTips)`
  width: 100%;
  z-index: 999;
  .tip-txt {
    margin: 0;
    background-color: #f9eece;
    color: #999;
    font-size: 0.32rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
