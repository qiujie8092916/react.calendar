import React from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import { Context } from "./context";
import BScroll from "better-scroll";
import Carousel from "nuka-carousel";
import styled from "styled-components";
import { Config, DayConfig, defaultSelectedMoment } from "./propTypes";

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

const BOUNCETIME = 500;

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
  className?: string;
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
    if (this.props.conf.calendarType === 2) {
      setTimeout(this.initScrollMonthBanner, 0);
    }
    this.setPosition();
  }

  componentDidUpdate(prevProps: DatepickerType) {
    if (prevProps.months !== this.props.months) {
      this.initScrollMonthBanner();
    }
  }

  setPosition = () => {
    let index = 0;
    const { conf, selectedDate, months } = this.props;
    switch (conf.selectType) {
      case 1:
        index = months.findIndex(
          it => it === selectedDate[0].format("YYYY-MM")
        );
        break;
      case 2:
        index = months.findIndex(
          it => it === selectedDate[0].format("YYYY-MM")
        );
        break;
    }

    switch (conf.calendarType) {
      case 1:
        setTimeout(() => {
          const scrollWrapper = this.els.scrollWrapper as HTMLDivElement;
          const monthPosition = this.els.monthRef[index].getPosition();
          const selfPosition = scrollWrapper.getBoundingClientRect();
          scrollWrapper.scrollTop =
            (monthPosition && monthPosition.top ? monthPosition.top : 0) -
            (selfPosition && selfPosition.top ? selfPosition.top : 0);
          this.setState({
            isLoading: !this.props.visible
          });
        }, 0);
        break;
      case 2:
        if (index === 0 && this.state.isLoading) {
          setTimeout(() => {
            this.setState({
              isLoading: !this.props.visible
            });
          }, 0);
        }
        this.setState({
          slideIndex: index
        });
        break;
    }
  };

  initScrollMonthBanner = () => {
    const ElsviewScroll = this.els.viewScroll as HTMLDivElement;
    const ElsScrollMonthBanner = this.els.scrollMonthBanner as HTMLDivElement;
    const firstMonthBanner = ElsScrollMonthBanner.children[0];
    const firstMonthBannerWidth = getComputedStyle(firstMonthBanner, null)
      .width as string;
    ElsScrollMonthBanner.style.width = `${
      ElsScrollMonthBanner.children && ElsScrollMonthBanner.children.length
        ? parseFloat(firstMonthBannerWidth) *
          ElsScrollMonthBanner.children.length
        : 0
    }px`;
    if (!this.bScroll) {
      this.bScroll = new BScroll(ElsviewScroll, {
        click: true,
        scrollX: true,
        scrollY: false,
        stopPropagation: true,
        tap: true
      });
    }
  };

  switchTab = (idx: number) => {
    this.setState({
      slideIndex: idx
    });
    this.correctionScrollMonthBanner(idx);
  };

  correctionScrollMonthBanner = (idx: number): void => {
    const scrollMonthBanner = this.els.scrollMonthBanner as HTMLDivElement;
    const clientWidth = document.documentElement.clientWidth;
    const leftBorder = 0;
    const rightBorder =
      -1 * (parseFloat(scrollMonthBanner.style.width as string) - clientWidth);
    const curItem = this.els.eachMonth[idx].getBoundingClientRect();
    const correctionOffset = (clientWidth - curItem.width) / 2;
    const scrollwrapperAbsDistance = scrollMonthBanner.getBoundingClientRect()
      .left;
    const scrollRltDistance = correctionOffset - curItem.left;
    // debugger;
    if (leftBorder < scrollwrapperAbsDistance + scrollRltDistance) {
      // 到达左边界
      console.log("arrive left border");
      this.bScroll.scrollTo(leftBorder, 0, BOUNCETIME);
    } else if (scrollwrapperAbsDistance + scrollRltDistance < rightBorder) {
      // 到达右边界
      console.log("arrive right border");
      this.bScroll.scrollTo(rightBorder, 0, BOUNCETIME);
    } else {
      // 正常
      console.log("normally scroll");
      this.bScroll.scrollBy(scrollRltDistance, 0, BOUNCETIME);
    }
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
              ref={(el: any) => (this.els.monthRef[idx] = el)}
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
      <div
        className={`${this.props.className}${
          isBareShell ? "" : " rlt" /* datepicker bare-shell */
        }`}
      >
        <Loading isShow={this.state.isLoading} />
        {isBareShell && (
          <React.Fragment>
            <Context.Consumer>
              {({ onCancel }) => <Header title={title} onCancel={onCancel} />}
            </Context.Consumer>
            <React.Fragment>
              {hasTip && <RenderTips tipHeight={this.tipHeight} tip={tip} />}
            </React.Fragment>
          </React.Fragment>
        )}
        <div
          className={`datepicker-container ${
            calendarType === 1 ? "vertical" : "horizontal"
          }`}
        >
          {calendarType === 2 && (
            <div className="view-scroll" ref={el => (this.els.viewScroll = el)}>
              <div
                className="scroll-monthBanner"
                ref={el => (this.els.scrollMonthBanner = el)}
              >
                {months.map((it, idx) => (
                  <div
                    key={idx}
                    ref={el => (this.els.eachMonth[idx] = el)}
                    onClick={() => {
                      this.switchTab(idx);
                    }}
                    className={`s-month il-flx flx-ct rlt${
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
            className="month-wrapper"
            style={
              calendarType === 1
                ? {
                    height: `calc(${
                      document.documentElement.clientHeight
                    }px - ${!fullScreen ? toRoof : "0px"} - ${(hasTip
                      ? this.tipHeight
                      : 0) +
                      (isBareShell
                        ? this.weekHeight + this.titleHeight
                        : 0)}rem)`
                  }
                : {}
            }
          >
            {calendarType === 2 ? (
              <Carousel
                className="carousel"
                withoutControls
                heightMode="current"
                slideIndex={this.state.slideIndex}
                afterSlide={(idx: number) => {
                  if (!Number.isNaN(idx) && idx !== this.state.slideIndex) {
                    this.switchTab(idx);
                  }
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

export default styled(Datepicker)`
  /* background: #fff; */
  overflow: auto;
  width: 10rem;
  bottom: 0;
  .datepicker-container {
    &.vertical {
      .month-wrapper {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    }
    &.horizontal {
      overflow: hidden;
      .scroll-monthBanner {
        height: 0.7rem;
        white-space: nowrap;
        font-size: 14px;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .s-month {
        height: 100%;
        width: 2.5rem;
        font-size: 0.37rem;
        &.active {
          color: #1a9fef;
          &:after {
            content: "";
            width: 100%;
            height: 0.04rem;
            background-color: #1a9fef;
            position: absolute;
            left: 0;
            bottom: 0;
          }
        }
      }
    }
  }
`;
