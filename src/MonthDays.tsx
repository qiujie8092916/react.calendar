import React from "react";
import { Context } from "./context";
import { isUndefined } from "lodash";
import { SELECTEDTYPE } from "./selectedType";
import {
  DayConfig,
  ConfigExtend,
  HolidayFormat,
  SELECTTYPE
} from "./propTypes";

import EachDate from "./EachDate";

interface MonthDaysType {
  conf?: ConfigExtend;
  id?: number;
  dayConfig?: DayConfig;
  selectedType?: SELECTTYPE;
  holiday?: HolidayFormat;
  isDisabled: boolean;
}

class MonthDays extends React.PureComponent<MonthDaysType, any> {
  render() {
    const {
      id,
      conf,
      holiday,
      dayConfig,
      isDisabled,
      selectedType
    } = this.props;
    const defaultStyle = `${isDisabled ? " disabled" : ""}`;
    const EConf = conf as ConfigExtend;
    const restStyle = `${
      holiday && !isUndefined(holiday.isDayOfRest)
        ? holiday.isDayOfRest
          ? " day-of-rest"
          : " day-of-work"
        : ""
    }`;
    let cssStyle = `dayOfMonth${defaultStyle}${restStyle}`;

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
                  conf={EConf}
                  holiday={holiday}
                  dayConfig={dayConfig}
                />
              </div>
            );
          }}
        </Context.Consumer>
      );
    } else {
      return <div className="dayOfMonth emptyDay" />;
    }
  }
}

export default MonthDays;
