import React from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import { Context } from "./context";
import BScroll from "better-scroll";
import Carousel from "nuka-carousel";

import Month from "./Month.jsx";
import Header from "./Header.jsx";
import Loading from "./Loading.jsx";
import RenderTips from "./RenderTips.jsx";
import WeeksBanner from "./WeeksBanner.jsx";

const LANG = {
  MONTH_POSTFIX: "月",
  WEEKS: ["日", "一", "二", "三", "四", "五", "六"],
  YEAR_POSTFIX: "年"
};

class Datepicker extends React.Component {
  state = {
    isLoading: true,
    slideIndex: 0
  };

  els = {
    eachMonth: new Array(this.props.months.length),
    monthRef: new Array(this.props.months.length),
    scrollMonthBanner: React.createRef(),
    scrollWrapper: null,
    viewScroll: React.createRef(),
    weeksRef: React.createRef()
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

  setPosition = () => {
    let index = 0;
    const { conf, selectedDate, selectedDates, months } = this.props;
    switch (conf.selectType) {
      case 1:
        index = months.findIndex(it => it === selectedDate.format("YYYY-MM"));
        break;
      case 2:
        index = months.findIndex(
          it => it === selectedDates[0].format("YYYY-MM")
        );
        break;
    }

    switch (conf.calendarType) {
      case 1:
        let monthPosition = this.els.monthRef[index].getPosition();
        let selfPosition = this.els.scrollWrapper.getBoundingClientRect();
        this.els.scrollWrapper.scrollTop =
          (monthPosition && monthPosition.top ? monthPosition.top : 0) -
          (selfPosition && selfPosition.top ? selfPosition.top : 0);
        break;
      case 2:
        this.setState({
          slideIndex: index
        });
        break;
    }
  };

  initScrollMonthBanner = () => {
    const { viewScroll, scrollMonthBanner } = this.els;
    scrollMonthBanner.current.style.width = `${
      scrollMonthBanner.current.children &&
      scrollMonthBanner.current.children.length
        ? parseFloat(
          window.getComputedStyle(scrollMonthBanner.current.children[0], null)
            .width
        ) * scrollMonthBanner.current.children.length
        : 0
    }px`;
    this.bScroll = new BScroll(viewScroll.current, {
      bounceTime: 500,
      click: true,
      scrollX: true,
      scrollY: false
    });
  };

  correctionScrollMonthBanner = idx => {
    const clientWidth = document.documentElement.clientWidth;
    const curItem = this.els.eachMonth[idx].getBoundingClientRect();
    const correctionOffset = clientWidth / 2 - curItem.width / 2;
    this.bScroll.scrollBy(correctionOffset - curItem.left);
  };

  getItemMonth = () => {
    let {
      conf,
      months,
      minDate,
      maxDate,
      holidays,
      dayConfig,
      selectedDate,
      selectedDates
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
              selectedDates={selectedDates}
              holidays={
                holidays[moment(it).year()] ? holidays[moment(it).year()] : {}
              }
            />
          );
        })}
      </React.Fragment>
    );
  };

  componentWillUpdate() {
    // console.log("\n- - - - - - - - - ");
    // console.time(
    //   "- - - - - - - - - will update Datepicker -> did update Datepicker"
    // );
  }

  componentDidUpdate() {
    // console.timeEnd("did update Month -> did update Datepicker");
    // console.timeEnd(
    //   "- - - - - - - - - will update Datepicker -> did update Datepicker"
    // );
  }

  render() {
    const { tip, conf, title, months, toRoof } = this.props;
    const { fullScreen, calendarType, isBareShell } = conf;
    const hasTip = !isEmpty(tip);
    return (
      <div
        className={`datepicker${
          isBareShell ? " bare-shell fixed animated" : " rlt"
        }`}
        style={isBareShell ? { top: !fullScreen ? toRoof : 0 } : {}}
      >
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
          className={`datepicker-container ${
            calendarType === 1 ? "vertical" : "horizontal"
          }`}
        >
          {calendarType === 2 && (
            <div className="view-scroll" ref={this.els.viewScroll}>
              <div
                className="scroll-monthBanner"
                ref={this.els.scrollMonthBanner}
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
                    className={`s-month inline-flex rlt${
                      this.state.slideIndex === idx ? " active" : ""
                    }`}
                    flex="center"
                  >
                    {moment(it).format("MM月")}
                  </div>
                ))}
              </div>
            </div>
          )}
          <WeeksBanner
            weeks={LANG.WEEKS}
            ref={this.els.weeksRef}
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
                withoutControls
                heightMode="current"
                slideIndex={this.state.slideIndex}
                afterSlide={idx => {
                  if (idx !== this.state.slideIndex) {
                    this.setState({ slideIndex: idx });
                    this.correctionScrollMonthBanner(idx);
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

export default Datepicker;
