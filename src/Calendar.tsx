import React from "react";
import axios from "axios";
import moment from "moment";
import { isEmpty } from "lodash";
import Animate from "rc-animate";
import { Context } from "./context";
import {
  CalendarType,
  Config,
  HolidayOrigin,
  defaultSelectedDate
} from "./propTypes";

import "./extensions";
import AnimateFrame from "./AnimateFrame";
import Datepicker from "./Datepicker";
import DatepickerMask from "./DatepickerMask";

const CACHE = "REACT_CALENDAR_DATA_CACHE";

interface HolidayDrill {
  [propName: string]: HolidayOrigin;
}

interface HolidayStruct {
  [propName: string]: HolidayDrill;
}

interface CalendarState {
  holidays: HolidayStruct | object;
  selectedDate: defaultSelectedDate;
}

class Calendar extends React.Component<CalendarType, CalendarState> {
  static defaultProps = {
    calendarType: 1,
    dayConfig: {} as React.CSSProperties,
    dayStyle: {} as React.CSSProperties,
    festivalCover: true,
    festivalStyle: {} as React.CSSProperties,
    fullScreen: false,
    isBareShell: true,
    isGMT08: false,
    isInland: true,
    selectType: 1,
    showFestival: true,
    showHolidayInfo: true,
    showToday: true,
    tip: "",
    title: "请选择日期",
    toRoof: "2rem"
  };

  private months: string[];
  private opt: { onCancel: () => void; onSelect: (tick: number) => void };
  private conf: Config;

  constructor(props: CalendarType) {
    super(props);
    this.state = {
      holidays: {},
      selectedDate: props.selectedDate
    };
  }

  componentWillMount() {
    this.initData();
  }

  componentDidMount() {
    if (this.props.showFestival || this.props.showHolidayInfo) {
      this.getHolidayData().then((res: HolidayOrigin) => {
        this.setState({
          holidays: res
        });
      });
    }
  }

  onCancel = (): void => {
    const { selectType, onConfirm, onCancel } = this.props;
    const { selectedDate } = this.state;
    switch (selectType) {
      case 1:
        if (onConfirm) {
          onConfirm({
            date: selectedDate[0],
            std: moment(selectedDate[0]).format("YYYY-MM-DD")
          });
        }
        break;
      case 2:
        if (onConfirm) {
          onConfirm(
            {
              date: selectedDate[0],
              std: moment(selectedDate[0]).format("YYYY-MM-DD")
            },
            {
              date: selectedDate[1],
              std: moment(selectedDate[1] as Date).format("YYYY-MM-DD")
            }
          );
        }
        break;
    }
    if (onCancel) {
      onCancel();
    }
  };

  initData = (): void => {
    const {
      endDate,
      isGMT08,
      dayStyle,
      isInland,
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
      calendarType,
      dayStyle,
      festivalCover,
      festivalStyle,
      fullScreen,
      isBareShell,
      isGMT08,
      isInland,
      selectType,
      showFestival,
      showHolidayInfo,
      showToday
    };
    this.opt = {
      onCancel: this.onCancel,
      onSelect: this.onSelect
    };
    this.months = this.enumerateBetweenDates(startDate, endDate, "M");
  };

  onSelect: (tick: number) => void = tick => {
    const tickNow = new Date(tick);
    const newState: {
      selectedDate: defaultSelectedDate;
    } = {
      selectedDate: [tickNow]
    };
    const { selectType, onSelect } = this.props;
    const oldDate = this.state.selectedDate;
    const newDate = {
      date: tickNow,
      std: moment(tick).format("YYYY-MM-DD")
    };
    switch (selectType) {
      case 1:
        newState.selectedDate[0] = tickNow;
        if (onSelect) {
          onSelect(newDate);
        }
        break;
      case 2:
        if (oldDate[0] && oldDate[1]) {
          newState.selectedDate = [tickNow];
        } else {
          newState.selectedDate =
            +tick < +oldDate[0] ? [tickNow, oldDate[0]] : [oldDate[0], tickNow];
        }
        if (onSelect) {
          onSelect(newDate);
        }
        break;
    }
    this.setState(newState);
    // console.time("- - - - - - - - - click -> render");
  };

  enumerateBetweenDates = (
    startDate: Date,
    endDate: Date,
    type: moment.unitOfTime.Diff
  ): string[] => {
    let format;
    const dates: string[] = [];
    const currDate = moment(startDate)
      .clone()
      .startOf(type);
    const lastDate = moment(endDate)
      .clone()
      .startOf(type);
    if (type === "M") {
      format = "YYYY-MM";
    } else {
      format = "YYYYMMDD";
    }
    while (currDate.diff(lastDate, type) <= 0) {
      const m = moment(currDate.clone().toDate()).format(format);
      if (!dates.includes(m)) {
        dates.push(m);
      }
      currDate.add(1, type);
    }
    return dates;
  };

  getHolidayData: () => Promise<{}> = () => {
    const holidayCache = window.localStorage.getItem(CACHE);
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
              const originHolidays: object = {};
              holidays.map(
                (
                  it: {
                    Year: string;
                    HolidayList: string;
                  },
                  idx: number
                ) => {
                  originHolidays[it.Year] = it.HolidayList;
                }
              );

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

  holidayConvert = (obj: object): object => {
    const h = {};
    Object.keys(obj).forEach(year => {
      h[year] = {};
      obj[year].forEach((holiday: HolidayOrigin) => {
        const { HolidayCount } = holiday;
        const workDay = holiday.WorkDay.split(",");
        const noWorkDay = holiday.NoWorkDay.split(",");

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
            h[year][year + noWorkDay[idx]] = {
              ...holiday,
              isDayOfRest: true
            };
          });
        }
      });
    });
    return h;
  };

  getDatepicker = (): JSX.Element | null => {
    const {
      tip,
      title,
      toRoof,
      endDate,
      visible,
      startDate,
      dayConfig,
      fullScreen,
      isBareShell
    } = this.props;
    const { holidays, selectedDate } = this.state;

    if (visible) {
      return (
        <AnimateFrame
          visible={visible}
          isBareShell={isBareShell}
          fullScreen={fullScreen}
          toRoof={toRoof}
        >
          <Context.Provider value={this.opt}>
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
              selectedDate={
                selectedDate[1]
                  ? [moment(selectedDate[0]), moment(selectedDate[1])]
                  : [moment(selectedDate[0])]
              }
            />
          </Context.Provider>
        </AnimateFrame>
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
            <Animate showProp="visible" transitionName="slideV">
              {this.getDatepicker()}
            </Animate>
            <Animate showProp="visible" transitionName="fade">
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
