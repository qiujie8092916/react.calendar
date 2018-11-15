import React from "react";
import moment from "moment";
import { isNull, isUndefined } from "lodash";
import { Context } from "./context";
import { SelectedType } from "./selectedType";

import MonthDays from "./MonthDays.jsx";

function EnumStyleComputed(cClass) {
  cClass.prototype.SELECTEDTYPE = SelectedType;
}

@EnumStyleComputed
class Month extends React.Component {
  els = {
    _self: React.createRef()
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.timeEnd("prepare map month -> should update Month");
    // console.timeEnd("did update Datepicker -> should update Month");
    let shouldUpdate = false;
    const curSelected =
        this.props.conf.selectType === 1
          ? this.props.selectedDate.clone()
          : [
              this.props.selectedDates[0].clone(),
              this.props.selectedDates[1]
                ? this.props.selectedDates[1].clone()
                : null
            ],
      nextSelected =
        this.props.conf.selectType === 1
          ? nextProps.selectedDate.clone()
          : [
              nextProps.selectedDates[0].clone(),
              nextProps.selectedDates[1]
                ? nextProps.selectedDates[1].clone()
                : null
            ];

    switch (this.props.conf.selectType) {
      case 1:
        if (
          !curSelected.isSame(nextSelected) &&
          curSelected.format("YYYY-MM") === this.props.month &&
          nextSelected.format("YYYY-MM") === this.props.month
        ) {
          shouldUpdate = true;
        }
        break;
      case 2:
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
    if (
      JSON.stringify(nextProps.holidays) !== JSON.stringify(this.props.holidays)
    ) {
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  getPosition = () => this.els._self.getBoundingClientRect();

  leftPad = val => (val.length === 1 ? `0${val}` : val);

  genCurStyle = timestamp => {
    const { conf } = this.props,
      { SELECTEDTYPE } = this,
      ts = moment(timestamp),
      oldSelectDate =
        conf.selectType === 1
          ? this.props.selectedDate
          : this.props.selectedDates;
    let curStyle = SELECTEDTYPE.None;

    if (conf.selectType === 1) {
      if (ts.isSame(oldSelectDate)) {
        curStyle = SELECTEDTYPE.Single;
      }
    } else {
      if (
        (ts.isSame(oldSelectDate[0]) && isNull(oldSelectDate[1])) ||
        (ts.isSame(oldSelectDate[0]) && ts.isSame(oldSelectDate[1]))
      ) {
        curStyle = SELECTEDTYPE.Single;
      } else if (ts.isSame(oldSelectDate[0])) {
        curStyle = SELECTEDTYPE.Start;
      } else if (ts.isSame(oldSelectDate[1])) {
        curStyle = SELECTEDTYPE.End;
      } else if (ts.isBetween(oldSelectDate[0], oldSelectDate[1])) {
        curStyle = SELECTEDTYPE.Middle;
      }
    }
    return curStyle;
  };

  getMonthDay = (timestamp, isEmpty = false) => {
    if (!isEmpty) {
      // console.time("render Month -> will update MonthOfDays");
      const dayfrmat = moment(timestamp).format("YYYYMMDD");
      const { conf, minDate, maxDate, dayConfig, holidays } = this.props;
      const _minDate = minDate.clone(),
        _maxDate = maxDate.clone();

      return (
        <MonthDays
          conf={conf}
          id={timestamp}
          key={timestamp}
          dayConfig={dayConfig[dayfrmat]}
          selectedType={this.genCurStyle(timestamp)}
          holiday={holidays[moment(timestamp).format("YYYYMMDD")]}
          isDisabled={
            !moment(timestamp).isAfter(_minDate.subtract(1, "day")) ||
            !moment(timestamp).isBefore(_maxDate.add(1, "day")) ||
            (dayConfig && dayConfig[dayfrmat] && dayConfig[dayfrmat].disable)
          }
        />
      );
    } else {
      return <MonthDays key={timestamp} isDisabled />;
    }
  };

  componentWillUpdate(nextProps) {
    // console.timeEnd("render Datepicker -> will update Month");
  }

  componentDidUpdate(prevProps) {
    // console.timeEnd("did update MonthOfDays -> did update Month");
    // console.time("did update Month -> did update Datepicker");
  }

  render() {
    const { month, banner, conf, monthRef } = this.props,
      curMonth = moment(month), //当前月
      dayOfMonth = curMonth.daysInMonth(), //当前月总共多少天
      everyDayOfMonth = [...Array(dayOfMonth + 1).keys()];

    return (
      <div className="months" ref={el => (this.els._self = el)}>
        {conf.calendarType === 1 && (
          <div
            className="month-banner flex stc"
            style={{
              top: 0
            }}
            flex="center"
          >
            {curMonth.format("YYYY年MM月")}
          </div>
        )}
        <div className="month-cont flex" flex="">
          {everyDayOfMonth.slice(1).map((it, idx) => {
            let curDay = moment(`${month}-${this.leftPad(String(it))}`), //当前月当前天
              dayOfWeek = curDay.day(),
              timestamp = curDay.valueOf();
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
