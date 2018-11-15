import React from "react";
import moment from "moment";
import { Context } from "./context";
import { isUndefined } from "lodash";
import { SelectedType } from "./selectedType";

function EnumStyleComputed(cClass) {
  cClass.prototype.SELECTEDTYPE = SelectedType;
}

@EnumStyleComputed
class MonthDays extends React.PureComponent {
  componentWillUpdate(nextProps) {
    // console.timeEnd("render Month -> will update MonthOfDays");
  }

  componentDidUpdate(nextProps) {
    // console.timeEnd("render MonthOfDays -> did update MonthOfDays");
    // console.time("did update MonthOfDays -> did update Month");
  }

  render() {
    // console.time("render MonthOfDays -> did update MonthOfDays");
    const {
        id,
        conf,
        holiday,
        dayConfig,
        isDisabled,
        selectedType
      } = this.props,
      { SELECTEDTYPE } = this,
      defaultStyle = `${isDisabled ? " disabled" : ""}`,
      restStyle = `${
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
      // console.timeEnd("- - - - - - - - - click -> render");
      // console.log(moment(this.props.id).format("MM-DD"));
      return (
        <Context.Consumer>
          {({ onSelect }) => {
            return (
              <div
                className={cssStyle}
                onClick={() => {
                  if (this.props.isDisabled) return;
                  onSelect && onSelect(this.props.id);
                }}
              >
                <EachDate
                  conf={conf}
                  id={id}
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

class EachDate extends React.PureComponent {
  toDay = moment();

  calendarFestival = () => {
    const { conf, holiday } = this.props;
    return (
      <div
        className={`calendarFestival flex${
          conf.festivalCover ? " festivalCover" : ""
        }`}
        style={conf.festivalStyle}
        flex={`4 row h-center ${
          conf.festivalCover && conf.needTitle ? "v-bottom" : "v-center"
        }`}
      >
        {holiday && holiday.HolidayName}
      </div>
    );
  };

  placeholder = () => {
    // console.timeEnd(
    //   "prepare render eachDate -> prepare render calendarDesc/placeholder"
    // );
    return <div className="placeholder" flex="3" />;
  };

  calendarDay = () => {
    // console.timeEnd("prepare render eachDate -> prepare render calendarDay");
    const { conf, id, holiday } = this.props;
    return holiday &&
      conf.festivalCover &&
      moment(id).format("MMDD") === holiday.HolidayDay ? null : (
      <div
        className={`calendarDay flex`}
        style={conf.dayStyle}
        flex={`4 row h-center ${conf.needTitle ? "v-bottom" : "v-center"}`}
        style={{
          color:
            moment(id).days() === 0 || moment(id).days() === 6
              ? "#ff5722"
              : "#333"
        }}
      >
        {this.toDay.isSame(id, "day") && conf.showToday
          ? "今天"
          : moment(id).format("D")}
      </div>
    );
  };

  calendarDesc = () => {
    // console.timeEnd(
    //   "prepare render eachDate -> prepare render calendarDesc/placeholder"
    // );
    const { dayConfig } = this.props;
    return (
      <div
        className="tit flex"
        flex="3 row h-center"
        style={dayConfig.titleStyle}
      >
        {dayConfig.title}
      </div>
    );
  };

  render() {
    const { conf, id, holiday, dayConfig } = this.props;
    const shouldFestival =
      id &&
      conf.showFestival &&
      holiday &&
      moment(id).format("MMDD") === holiday.HolidayDay;

    return (
      <React.Fragment>
        {shouldFestival ? (
          <React.Fragment>{this.calendarFestival()}</React.Fragment>
        ) : !conf.festivalCover ? (
          this.placeholder()
        ) : null}
        {this.calendarDay()}
        {conf.needTitle
          ? dayConfig
            ? this.calendarDesc()
            : this.placeholder()
          : null}
      </React.Fragment>
    );
  }
}

export default MonthDays;
