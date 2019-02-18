import React from "react";
import moment from "moment";
import { isNull, isEqual, isEmpty } from "lodash";
import styled from "styled-components";
import { Config, DayConfig, defaultSelectedMoment } from "./propTypes";
import { SELECTEDTYPE } from "./selectedType";

import MonthDays from "./MonthDays";

interface MonthType {
  month: string;
  conf: Config;
  minDate: moment.Moment;
  maxDate: moment.Moment;
  dayConfig: DayConfig;
  selectedDate: defaultSelectedMoment;
  holidays: object;
  className?: string;
}

interface MonthState {
  needMonthDaysTitle: boolean;
}

class Month extends React.Component<MonthType, MonthState> {
  state = {
    needMonthDaysTitle: !isEmpty(this.props.dayConfig)
  };

  els: {
    monthRef: HTMLDivElement | null;
  } = {
    monthRef: null
  };

  componentWillReceiveProps(nextProps: MonthType) {
    if (!isEqual(this.props.dayConfig, nextProps.dayConfig)) {
      this.setState({
        needMonthDaysTitle: !isEmpty(nextProps.dayConfig)
      });
    }
  }

  shouldComponentUpdate(nextProps: Readonly<MonthType>) {
    let shouldUpdate = false;
    let curSelected: defaultSelectedMoment;
    let nextSelected: defaultSelectedMoment;

    switch (this.props.conf.selectType) {
      case 1:
        curSelected = [this.props.selectedDate[0].clone()];
        nextSelected = [nextProps.selectedDate[0].clone()];
        if (
          !curSelected[0].isSame(nextSelected[0]) &&
          (curSelected[0].format("YYYY-MM") === this.props.month ||
            nextSelected[0].format("YYYY-MM") === this.props.month)
        ) {
          shouldUpdate = true;
        }
        break;
      case 2:
        curSelected = [
          this.props.selectedDate[0].clone(),
          this.props.selectedDate[1] ? this.props.selectedDate[1].clone() : null
        ];
        nextSelected = [
          nextProps.selectedDate[0].clone(),
          nextProps.selectedDate[1] ? nextProps.selectedDate[1].clone() : null
        ];
        if (
          (!curSelected[0].isSame(nextSelected[0]) ||
            (curSelected[1] && nextSelected[1]
              ? !curSelected[1].isSame(nextSelected[1])
              : !curSelected[1] && !nextSelected[1]
              ? false
              : true)) &&
          ((curSelected[1]
            ? moment(this.props.month).isBetween(
                curSelected[0].subtract(1, "M"),
                curSelected[1].add(1, "M"),
                "month"
              )
            : moment(this.props.month).isSame(curSelected[0], "month")) ||
            (nextSelected[1]
              ? moment(this.props.month).isBetween(
                  nextSelected[0].subtract(1, "M"),
                  nextSelected[1].add(1, "M"),
                  "month"
                )
              : moment(this.props.month).isSame(nextSelected[0], "month")))
        ) {
          shouldUpdate = true;
        }
        break;
    }

    if (!isEqual(this.props.holidays, nextProps.holidays)) {
      shouldUpdate = true;
    }
    if (!isEqual(this.props.dayConfig, nextProps.dayConfig)) {
      shouldUpdate = true;
    }
    if (!isEqual(this.props.conf, nextProps.conf)) {
      shouldUpdate = true;
    }
    return shouldUpdate;
  }

  getPosition = () => {
    const ElsMonthRef = this.els.monthRef as HTMLDivElement;
    return ElsMonthRef.getBoundingClientRect();
  };

  leftPad = (val: string) => (val.length === 1 ? `0${val}` : val);

  genCurStyle = (timestamp: number): number => {
    const { conf, selectedDate } = this.props;
    const ts = moment(timestamp);
    let curStyle = SELECTEDTYPE.None;

    if (conf.selectType === 1) {
      if (ts.isSame(selectedDate[0], "day")) {
        curStyle = SELECTEDTYPE.Single;
      }
    } else {
      if (
        (isNull(selectedDate[1]) && ts.isSame(selectedDate[0], "day")) ||
        (!isNull(selectedDate[1]) &&
          ts.isSame(selectedDate[0], "day") &&
          ts.isSame(selectedDate[1] as moment.Moment, "day"))
      ) {
        curStyle = SELECTEDTYPE.Single;
      } else if (ts.isSame(selectedDate[0], "day")) {
        curStyle = SELECTEDTYPE.Start;
      } else if (selectedDate[1] && ts.isSame(selectedDate[1], "day")) {
        curStyle = SELECTEDTYPE.End;
      } else if (
        selectedDate[1] &&
        ts.isBetween(selectedDate[0], selectedDate[1])
      ) {
        curStyle = SELECTEDTYPE.Middle;
      }
    }
    return curStyle;
  };

  getMonthDay = (timestamp: number, isEmpty = false) => {
    if (!isEmpty) {
      const dayfrmat = moment(timestamp).format("YYYYMMDD");
      const { needMonthDaysTitle } = this.state;
      const { conf, minDate, maxDate, dayConfig, holidays } = this.props;
      const minDateClone = minDate.clone();
      const maxDateClone = maxDate.clone();

      return (
        <MonthDays
          conf={conf}
          id={timestamp}
          key={timestamp}
          needTitle={needMonthDaysTitle}
          dayConfig={dayConfig[dayfrmat]}
          selectedType={this.genCurStyle(timestamp)}
          holiday={holidays[moment(timestamp).format("YYYYMMDD")]}
          isDisabled={
            !moment(timestamp).isAfter(minDateClone.subtract(1, "day")) ||
            !moment(timestamp).isBefore(maxDateClone.add(1, "day")) ||
            (dayConfig && dayConfig[dayfrmat] && dayConfig[dayfrmat].disable)
          }
        />
      );
    } else {
      return <MonthDays key={timestamp} isDisabled={true} />;
    }
  };

  render() {
    const { conf, month } = this.props;
    const curMonth = moment(month); // 当前月
    const dayOfMonth = curMonth.daysInMonth(); // 当前月总共多少天
    const everyDayOfMonth = [...Array(dayOfMonth + 1).keys()];

    return (
      <div
        className={this.props.className}
        ref={el => (this.els.monthRef = el)}
      >
        {conf.calendarType === 1 && (
          <div
            className="month-banner stc flx flx-ct"
            style={{
              top: 0
            }}
          >
            {curMonth.format("YYYY年MM月")}
          </div>
        )}
        <div className="month-cont flx">
          {everyDayOfMonth.slice(1).map((it, idx) => {
            const curDay = moment(`${month}-${this.leftPad(String(it))}`); // 当前月当前天
            const dayOfWeek = curDay.day();
            const timestamp = curDay.valueOf();
            if (idx === 0 && dayOfWeek !== 0) {
              const emptyDay = [...Array(dayOfWeek).keys()].map((item, index) =>
                this.getMonthDay(index, true)
              );
              return (
                <React.Fragment key={idx + dayOfWeek}>
                  {emptyDay}
                  {this.getMonthDay(timestamp)}
                </React.Fragment>
              );
            } else {
              return this.getMonthDay(timestamp);
            }
          })}
        </div>
      </div>
    );
  }
}

export default styled(Month)`
  .month-banner {
    height: 0.7rem;
    font-size: 0.34rem;
    background: #ececec;
    color: #333;
    position: sticky;
    z-index: 1;
  }
  .month-cont {
    padding: 0 0.26rem;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
  }
`;
