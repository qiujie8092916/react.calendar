import React from "react";
import moment from "moment";
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
}

class Month extends React.Component<MonthType, any> {
  els: {
    monthRef: HTMLDivElement | null;
  } = {
    monthRef: null
  };

  shouldComponentUpdate(nextProps: Readonly<MonthType>) {
    let shouldUpdate = false;
    const curSelected = !this.props.selectedDate[1]
      ? [this.props.selectedDate[0].clone()]
      : [
          this.props.selectedDate[0].clone(),
          this.props.selectedDate[1].clone()
        ];
    const nextSelected = !nextProps.selectedDate[1]
      ? [nextProps.selectedDate[0].clone()]
      : [nextProps.selectedDate[0].clone(), nextProps.selectedDate[1].clone()];

    switch (this.props.conf.selectType) {
      case 1:
        if (
          !curSelected[0].isSame(nextSelected[0]) &&
          curSelected[0].format("YYYY-MM") === this.props.month &&
          nextSelected[0].format("YYYY-MM") === this.props.month
        ) {
          shouldUpdate = true;
        }
        break;
      case 2:
        if (
          (!curSelected[0].isSame(nextSelected[0]) ||
            (curSelected[1] && nextSelected[1]
              ? !curSelected[1].isSame(nextSelected[1])
              : !(!curSelected[1] && !nextSelected[1]))) &&
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
    if (
      JSON.stringify(nextProps.holidays) !== JSON.stringify(this.props.holidays)
    ) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  getPosition = () => {
    const EMonthRef = this.els.monthRef as HTMLDivElement;
    return EMonthRef.getBoundingClientRect();
  };

  leftPad = (val: string) => (val.length === 1 ? `0${val}` : val);

  genCurStyle = (timestamp: number): number => {
    const { conf, selectedDate } = this.props;
    const ts = moment(timestamp);
    let curStyle = SELECTEDTYPE.None;

    if (conf.selectType === 1) {
      if (ts.isSame(selectedDate[0])) {
        curStyle = SELECTEDTYPE.Single;
      }
    } else {
      if (
        (!selectedDate[1] && ts.isSame(selectedDate[0])) ||
        (selectedDate[1] &&
          ts.isSame(selectedDate[0]) &&
          ts.isSame(selectedDate[1]))
      ) {
        curStyle = SELECTEDTYPE.Single;
      } else if (ts.isSame(selectedDate[0])) {
        curStyle = SELECTEDTYPE.Start;
      } else if (selectedDate[1] && ts.isSame(selectedDate[1])) {
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
      const { conf, minDate, maxDate, dayConfig, holidays } = this.props;
      const minDateClone = minDate.clone();
      const maxDateClone = maxDate.clone();

      return (
        <MonthDays
          conf={{
            ...conf,
            needTitle: !!dayConfig && JSON.stringify(dayConfig) !== "{}"
          }}
          id={timestamp}
          key={timestamp}
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
      <div className="months" ref={el => (this.els.monthRef = el)}>
        {conf.calendarType === 1 && (
          <div
            className="month-banner flx stc flx-ct"
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

export default Month;
