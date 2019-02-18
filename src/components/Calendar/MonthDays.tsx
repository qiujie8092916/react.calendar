import React from "react";
import { Context } from "./context";
import { isUndefined } from "lodash";
import { SELECTEDTYPE } from "./selectedType";
import styled from "styled-components";
import { DayConfig, Config, HolidayFormat, SELECTTYPE } from "./propTypes";

import EachDate from "./EachDate";

interface MonthDaysType {
  conf?: Config;
  id?: number;
  dayConfig?: DayConfig;
  selectedType?: SELECTTYPE;
  holiday?: HolidayFormat;
  isDisabled: boolean;
  className?: string;
  needTitle?: boolean;
}

class MonthDays extends React.PureComponent<MonthDaysType, any> {
  render() {
    const {
      id,
      conf,
      holiday,
      dayConfig,
      isDisabled,
      needTitle,
      selectedType
    } = this.props;
    const defaultStyle = `${isDisabled ? " disabled" : ""}`;
    const restStyle = `${
      holiday && !isUndefined(holiday.isDayOfRest)
        ? holiday.isDayOfRest
          ? " day-of-rest"
          : " day-of-work"
        : ""
    }`;
    let cssStyle = `${this.props.className}${defaultStyle}${restStyle}`; // dayOfMonth

    switch (selectedType) {
      case SELECTEDTYPE.Single:
        cssStyle += " selected-start selected-end";
        break;
      case SELECTEDTYPE.Start:
        cssStyle += " selected-start";
        break;
      case SELECTEDTYPE.Middle:
        cssStyle += " selected";
        break;
      case SELECTEDTYPE.End:
        cssStyle += " selected-end";
        break;
    }

    if (id) {
      return (
        <Context.Consumer>
          {({ onSelect }) => {
            return (
              <div
                className={cssStyle}
                onClick={() => {
                  if (this.props.isDisabled) {
                    return;
                  }
                  if (onSelect) {
                    onSelect(this.props.id as number);
                  }
                }}
              >
                <EachDate
                  id={id}
                  needTitle={needTitle}
                  conf={conf as Config}
                  holiday={holiday}
                  dayConfig={dayConfig}
                />
              </div>
            );
          }}
        </Context.Consumer>
      );
    } else {
      return <div className={`${this.props.className}`} />; /* emptyDay */
    }
  }
}

export default styled(MonthDays)`
  display: flex;
  flex: 0 0 calc(100% / 7);
  margin-top: 0.1rem;
  height: 1.35rem;
  position: relative;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  &.selected::after,
  &.selected-start::after,
  &.selected-end::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    border-radius: 0.1rem;
  }
  &.selected-start::after {
    background-color: #1a9fef;
  }
  &.selected::after {
    background-color: #dbf1fb;
  }
  &.selected-end::after {
    background-color: #1a9fef;
  }
  &.selected-start .calendarFestival,
  &.selected-start .calendarDay,
  &.selected-start .tit,
  &.selected-end .calendarFestival,
  &.selected-end .calendarDay,
  &.selected-end .tit {
    color: #fff !important;
  }
  &.day-of-rest::before,
  &.day-of-work::before {
    position: absolute;
    top: 0;
    right: 0;
    padding: 1px;
    border-radius: 2px;
    font-size: 0.245rem;
    color: #ff5722;
    border: 1px solid #ff5722;
    line-height: 0.3rem;
  }
  &.disabled.day-of-rest::before,
  &.disabled.day-of-work::before {
    border: 1px solid #cccc;
    color: #ccc;
  }
  &.disabled .calendarFestival,
  &.disabled .calendarDay,
  &.disabled .tit {
    color: #ccc !important;
  }
  &.day-of-rest::before {
    content: "休";
  }
  &.day-of-work::before {
    content: "班";
  }
  .calendarFestival {
    font-size: 0.32rem;
    color: #666;
    &.festivalCover {
      font-size: 0.42rem;
    }
  }
  .calendarDay {
    font-size: 0.43rem;
    color: #333;
  }
  .placeholder {
    height: 0.6rem;
  }
  .tit {
    color: #444;
    font-size: 0.3rem;
  }
`;
