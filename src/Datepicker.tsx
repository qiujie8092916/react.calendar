import React from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import { Context } from "./context";
import BScroll from "better-scroll";
import Carousel from "nuka-carousel";
import { Config, DayConfig, defaultSelectedMoment } from "./propTypes";

import "./Calendar.scss";

import Month from "./Month";
import Header from "./Header";
import Loading from "./Loading";
import RenderTips from "./RenderTips";
import WeeksBanner from "./WeeksBanner";

const LANG = {
  MONTH_POSTFIX: "月",
  WEEKS: ["日", "一", "二", "三", "四", "五", "六"],
  YEAR_POSTFIX: "年"
};

interface DatepickerType {
  conf: Config;
  visible: boolean;
  months: string[];
  minDate: moment.Moment;
  maxDate: moment.Moment;
  holidays: object;
  dayConfig: DayConfig;
  tip: string;
  title: string;
  toRoof: string;
  selectedDate: defaultSelectedMoment;
}

interface DatepickerState {
  isLoading: boolean;
  slideIndex: number;
}

class Datepicker extends React.Component<DatepickerType, DatepickerState> {
  bScroll: any;

  state = {
    isLoading: true,
    slideIndex: 0
  };

  els: {
    eachMonth: any[];
    monthRef: any[];
    scrollMonthBanner: HTMLDivElement | null;
    scrollWrapper: HTMLDivElement | null;
    viewScroll: HTMLDivElement | null;
  } = {
    eachMonth: new Array(this.props.months.length),
    monthRef: new Array(this.props.months.length),
    scrollMonthBanner: null,
    scrollWrapper: null,
    viewScroll: null
  };

  titleHeight = 0.82;
  tipHeight = 0.6;
  weekHeight = 0.6;

  componentDidMount() {
    setTimeout(() => {
      if (this.props.conf.calendarType === 2) {
        this.initScrollMonthBanner();
      }
      this.setPosition();
    }, 0);
  }

  setPosition = () => {
    const { conf, selectedDate, months } = this.props;
    const index = months.findIndex(
      it => it === selectedDate[0].format("YYYY-MM")
    );

    switch (conf.calendarType) {
      case 1:
        if (this.els.scrollWrapper) {
          const monthPosition = this.els.monthRef[index].getPosition();
          const selfPosition = this.els.scrollWrapper.getBoundingClientRect();
          this.els.scrollWrapper.scrollTop =
            monthPosition.top - selfPosition.top;
        }
        break;
      case 2:
        this.setState({
          slideIndex: index
        });
        break;
    }
  };

  initScrollMonthBanner = () => {
    const EScrollMonthBanner = this.els.scrollMonthBanner as HTMLDivElement;
    const EviewScroll = this.els.viewScroll as HTMLDivElement;
    const MonthBannerBlockWidth = getComputedStyle(
      EScrollMonthBanner.children[0],
      null
    ).width;
    EScrollMonthBanner.style.width = `${
      EScrollMonthBanner.children && EScrollMonthBanner.children.length
        ? parseFloat(MonthBannerBlockWidth as string) *
          EScrollMonthBanner.children.length
        : 0
    }px`;
    this.bScroll = new BScroll(EviewScroll, {
      bounceTime: 500,
      click: true,
      scrollX: true,
      scrollY: false
    });
  };

  correctionScrollMonthBanner = (idx: number): void => {
    const clientWidth = document.documentElement
      ? document.documentElement.clientWidth
      : 0;
    const curItem = this.els.eachMonth[idx].getBoundingClientRect();
    const correctionOffset = clientWidth / 2 - curItem.width / 2;
    this.bScroll.scrollBy(correctionOffset - curItem.left);
  };

  getItemMonth = () => {
    const {
      conf,
      months,
      minDate,
      maxDate,
      holidays,
      dayConfig,
      selectedDate
    } = this.props;

    return (
      <React.Fragment>
        {months.map((it, idx) => {
          // console.time("prepare map month -> should update Month");
          return (
            <Month
              ref={el => (this.els.monthRef[idx] = el)}
              key={idx}
              month={it}
              conf={conf}
              minDate={minDate}
              maxDate={maxDate}
              dayConfig={dayConfig}
              selectedDate={selectedDate}
              holidays={
                holidays[moment(it).year()] ? holidays[moment(it).year()] : {}
              }
            />
          );
        })}
      </React.Fragment>
    );
  };

  render() {
    const { tip, conf, title, months, toRoof } = this.props;
    const { fullScreen, calendarType, isBareShell } = conf;
    const hasTip = !isEmpty(tip);

    return (
      <div styleName={isBareShell ? "datepicker bare-shell" : "datepicker rlt"}>
        {isBareShell ? (
          <React.Fragment>
            <Context.Consumer>
              {({ onCancel }) => <Header title={title} onCancel={onCancel} />}
            </Context.Consumer>
            <React.Fragment>
              {hasTip && <RenderTips tipHeight={this.tipHeight} tip={tip} />}
            </React.Fragment>
          </React.Fragment>
        ) : (
          <Loading isShow={this.state.isLoading} />
        )}
        <div
          styleName={`datepicker-container ${
            calendarType === 1 ? "vertical" : "horizontal"
          }`}
        >
          {calendarType === 2 && (
            <div styleName="view-scroll" ref={el => (this.els.viewScroll = el)}>
              <div
                styleName="scroll-monthBanner"
                ref={el => (this.els.scrollMonthBanner = el)}
              >
                {months.map((it, idx) => (
                  <div
                    key={idx}
                    ref={el => (this.els.eachMonth[idx] = el)}
                    onClick={() => {
                      this.setState({
                        slideIndex: idx
                      });
                      this.correctionScrollMonthBanner(idx);
                    }}
                    styleName={`s-month il-flx flx-ct rlt${
                      this.state.slideIndex === idx ? " active" : ""
                    }`}
                  >
                    {moment(it).format("MM月")}
                  </div>
                ))}
              </div>
            </div>
          )}
          <WeeksBanner
            weeks={LANG.WEEKS}
            weekHeight={this.weekHeight}
            hasTip={hasTip}
          />
          <div
            ref={el => (this.els.scrollWrapper = el)}
            styleName="month-wrapper"
            style={
              calendarType === 1
                ? {
                    height: `calc(${
                      document.documentElement
                        ? document.documentElement.clientHeight
                        : 0
                    }px - ${!fullScreen ? toRoof : "0px"} - ${(hasTip
                      ? this.tipHeight
                      : 0) +
                      this.weekHeight +
                      this.titleHeight}rem)`
                  }
                : {}
              /* ) */
            }
          >
            {calendarType === 2 ? (
              <Carousel
                className="carousel"
                withoutControls={true}
                heightMode="current"
                slideIndex={this.state.slideIndex}
                afterSlide={(idx: number) => {
                  if (idx !== this.state.slideIndex) {
                    this.setState({ slideIndex: idx });
                  }
                  this.correctionScrollMonthBanner(idx);
                  if (this.state.isLoading) {
                    setTimeout(() => {
                      this.setState({
                        isLoading: !this.props.visible
                      });
                    }, 0);
                  }
                }}
              >
                {this.getItemMonth().props.children}
              </Carousel>
            ) : (
              this.getItemMonth().props.children
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Datepicker;
