import React from "react";
import moment from "moment";
import axios from "axios";
import { isEmpty } from "lodash";
import Animate from "rc-animate";
import PropType from "./propTypes";
import { Context } from "./context";

import "./Calendar.css";

import Datepicker from "./Datepicker.jsx";
import DatepickerMask from "./DatepickerMask.jsx";

const CACHE = "REACT_CALENDAR_DATA_CACHE";

function defaultProps(cClass) {
  cClass.defaultProps = {
    calendarType: 1,
    dayConfig: {},
    dayStyle: {},
    festivalCover: true,
    fullScreen: false,
    isBareShell: true,
    isGMT08: false,
    isInland: true,
    selectType: 1,
    selectedDate: null,
    selectedDates: [],
    showFestival: true,
    showHolidayInfo: true,
    showToday: true,
    tip: "",
    title: "请选择日期",
    toRoof: "2rem"
  };
}

function propTypes(cClass) {
  cClass.propTypes = PropType;
}

@defaultProps
@propTypes
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: {},
      selectedDate: this.props.selectedDate,
      selectedDates: this.props.selectedDates
    };

    this.opt = {
      onCancel: this.onCancel,
      onSelect: this.onSelect
    };
    window.moment = moment;
  }

  componentWillMount() {
    this.initData();
  }

  componentDidMount() {
    if (this.props.showFestival || this.props.showHolidayInfo) {
      this.getHolidayData().then(res => {
        this.setState({
          holidays: res
        });
      });
    }
  }

  onCancel = () => {
    const { selectType, onConfirm, onCancel } = this.props;
    const { selectedDate, selectedDates } = this.state;
    switch (selectType) {
      case 1:
        if (onConfirm) {
          onConfirm({
            date: selectedDate,
            std: moment(selectedDate).format("YYYY-MM-DD")
          });
        }
        break;
      case 2:
        if (onConfirm) {
          onConfirm(
            {
              date: selectedDates[0],
              std: moment(selectedDates[0]).format("YYYY-MM-DD")
            },
            {
              date: selectedDates[1],
              std: moment(selectedDates[1]).format("YYYY-MM-DD")
            }
          );
        }
        break;
    }
    if (onCancel) {
      onCancel();
    }
  };

  initData = () => {
    let {
      endDate,
      isGMT08,
      dayStyle,
      isInland,
      dayConfig,
      startDate,
      showToday,
      fullScreen,
      selectType,
      isBareShell,
      calendarType,
      showFestival,
      festivalCover,
      festivalStyle,
      showHolidayInfo
    } = this.props;

    this.conf = {
      calendarType: calendarType,
      dayStyle: dayStyle,
      festivalCover: festivalCover,
      festivalStyle: festivalStyle,
      fullScreen: fullScreen,
      isBareShell: isBareShell,
      isGMT08: isGMT08,
      isInland: isInland,
      needTitle: JSON.stringify(dayConfig) !== "{}",
      selectType: selectType,
      showFestival: showFestival,
      showHolidayInfo: showHolidayInfo,
      showToday: showToday
    };
    this.months = this.enumerateBetweenDates(startDate, endDate, "month");
  };

  onSelect = tick => {
    let newState = {};
    const { selectType, onSelect } = this.props;
    const oldDate =
      selectType === 1 ? this.state.selectedDate : this.state.selectedDates;
    let newDate = {
      date: new Date(tick),
      std: moment(tick).format("YYYY-MM-DD")
    };

    switch (selectType) {
      case 1:
        newState.selectedDate = new Date(tick);
        if (onSelect) {
          onSelect(newDate);
        }
        break;
      case 2:
        if (!oldDate[0] || oldDate[1]) {
          newState.selectedDates = [new Date(tick), null];
          if (onSelect) {
            onSelect(newDate);
          }
        } else {
          newState.selectedDates =
            +tick < +oldDate[0]
              ? [new Date(tick), oldDate[0]]
              : [oldDate[0], new Date(tick)];
        }
        break;
    }
    this.setState(newState);
    // console.time("- - - - - - - - - click -> render");
  };

  enumerateBetweenDates = (startDate, endDate, type) => {
    let format;
    let dates = [];
    let currDate = moment(startDate)
      .clone()
      .startOf(type);
    let lastDate = moment(endDate)
      .clone()
      .startOf(type);
    if (type === "month") {
      format = "YYYY-MM";
    } else {
      format = "YYYYMMDD";
    }
    while (currDate.diff(lastDate, type) <= 0) {
      let m = moment(currDate.clone().toDate()).format(format);
      if (!dates.includes(m)) {
        dates.push(m);
      }
      currDate.add(1, type);
    }
    return dates;
  };

  getHolidayData = () => {
    let holidayCache = window.localStorage.getItem(CACHE);
    if (
      !holidayCache ||
      JSON.parse(holidayCache).queryYear !== moment().year()
    ) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "http://m.ctrip.com/restapi/soa2/12378/json/getGeneralConfigData",
            {
              key: "Holiday"
            }
          )
          .then(({ data }) => {
            if (data.rspJsonStr) {
              let holidays;
              try {
                holidays = JSON.parse(
                  JSON.parse(data.rspJsonStr).configList[0].configContent
                ).Holiday;
              } catch (e) {
                reject(e);
              }
              let originHolidays = {};
              holidays.map((it, idx) => {
                originHolidays[it.Year] = it.HolidayList;
              });

              window.localStorage.setItem(
                CACHE,
                JSON.stringify({
                  data: originHolidays,
                  queryYear: moment().year()
                })
              );
              resolve(this.holidayConvert(originHolidays));
            } else {
              reject(data.errMsg);
            }
          });
      });
    } else {
      return new Promise(resolve => {
        resolve(this.holidayConvert(JSON.parse(holidayCache).data));
      });
    }
  };

  holidayConvert = obj => {
    let h = {};
    Object.keys(obj).forEach(year => {
      h[year] = {};
      obj[year].forEach(holiday => {
        let { HolidayCount } = holiday;
        let workDay = holiday.WorkDay.split(",");
        let noWorkDay = holiday.NoWorkDay.split(",");

        h[year][year + holiday.HolidayDay] = holiday;

        if (!Number.isNaN(Number(HolidayCount)) && HolidayCount > 0) {
          // 节中
          for (let i = 0; i <= HolidayCount; i++) {
            if (
              !moment(year + holiday.StartDay.trim())
                .add(i, "day")
                .isAfter(moment(year + holiday.EndDay.trim()))
            ) {
              h[year][
                moment(year + holiday.StartDay.trim())
                  .add(i, "day")
                  .format("YYYYMMDD")
              ] = { ...holiday, isDayOfRest: true };
            }
          }
        }
        if (workDay.length && !isEmpty(workDay[0])) {
          // 节补班
          workDay.forEach((it, idx) => {
            h[year][year + workDay[idx]] = { ...holiday, isDayOfRest: false };
          });
        }
        if (noWorkDay.length && !isEmpty(noWorkDay[0])) {
          // 休工作日
          noWorkDay.forEach((it, idx) => {
            h[year][year + noWorkDay[idx]] = { ...holiday, isDayOfRest: true };
          });
        }
      });
    });
    return h;
  };

  getDatepicker = () => {
    const {
      tip,
      title,
      toRoof,
      endDate,
      visible,
      startDate,
      dayConfig
    } = this.props;
    const { holidays, selectedDate, selectedDates } = this.state;

    if (visible) {
      return (
        <Context.Provider value={this.opt} visible={visible}>
          <Datepicker
            conf={this.conf}
            months={this.months}
            tip={tip}
            title={title}
            toRoof={toRoof}
            visible={visible}
            holidays={holidays}
            dayConfig={dayConfig}
            maxDate={moment(endDate)}
            minDate={moment(startDate)}
            selectedDate={selectedDate ? moment(selectedDate) : null}
            selectedDates={[
              selectedDates[0] ? moment(selectedDates[0]) : null,
              selectedDates[1] ? moment(selectedDates[1]) : null
            ]}
          />
        </Context.Provider>
      );
    } else {
      return null;
    }
  };

  render() {
    const { visible, isBareShell } = this.props;

    return (
      <React.Fragment>
        {isBareShell ? (
          <React.Fragment>
            <Animate showProp='visible' transitionName='slideV'>
              {this.getDatepicker()}
            </Animate>
            <Animate showProp='visible' transitionName='fade'>
              <DatepickerMask visible={visible} onCancel={this.onCancel} />
            </Animate>
          </React.Fragment>
        ) : (
          this.getDatepicker()
        )}
      </React.Fragment>
    );
  }
}

export default Calendar;
