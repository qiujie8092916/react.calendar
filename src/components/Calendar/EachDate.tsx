import React from "react";
import moment from "moment";
import { isEqual, isEmpty } from "lodash";
import { Config, DayConfig, HolidayFormat } from "./propTypes";

interface EachDateType {
  id: number;
  conf: Config;
  holiday?: HolidayFormat;
  dayConfig?: DayConfig;
  needTitle?: boolean;
}

interface EachDateState {
  needTitle?: boolean;
}

class EachDate extends React.PureComponent<EachDateType, EachDateState> {
  toDay = moment();

  state = {
    needTitle: this.props.needTitle || !isEmpty(this.props.dayConfig)
  };

  componentWillReceiveProps(nextProps: EachDateType) {
    if (!isEqual(this.props.dayConfig, nextProps.dayConfig)) {
      // debugger;
      this.setState({
        needTitle: !isEmpty(nextProps.dayConfig)
      });
    }
    if (this.props.needTitle !== nextProps.needTitle) {
      this.setState({
        needTitle: nextProps.needTitle
      });
    }
  }

  calendarFestival = () => {
    const { conf, holiday } = this.props;
    return (
      <div
        className={`calendarFestival flx flx-4 flx-row flx-ct ${
          conf.festivalCover && this.state.needTitle ? "flx-vbtm" : "flx-vct"
        }${conf.festivalCover ? " festivalCover" : ""}`}
        style={conf.festivalStyle}
      >
        {holiday && holiday.HolidayName}
      </div>
    );
  };

  placeholder = () => {
    // console.timeEnd(
    //   "prepare render eachDate -> prepare render calendarDesc/placeholder"
    // );
    return <div className="placeholder flx-3" />;
  };

  calendarDay = () => {
    // console.timeEnd("prepare render eachDate -> prepare render calendarDay");
    const { conf, id, holiday } = this.props;
    return holiday &&
      conf.festivalCover &&
      moment(id).format("MMDD") === holiday.HolidayDay ? null : (
      <div
        className={`calendarDay flx flx-4 flx-row flx-hct ${
          this.state.needTitle ? "flx-vbtm" : "flx-vct"
        }`}
        style={Object.assign(
          {
            color:
              moment(id).days() === 0 || moment(id).days() === 6
                ? "#ff5722"
                : "#333"
          },
          conf.dayStyle
        )}
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
        className="tit flx flx-3 flx-row flx-hct"
        style={(dayConfig && dayConfig.titleStyle) || {}}
      >
        {(dayConfig && dayConfig.title) || ""}
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
        {this.state.needTitle
          ? dayConfig
            ? this.calendarDesc()
            : this.placeholder()
          : null}
      </React.Fragment>
    );
  }
}

export default EachDate;
