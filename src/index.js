import styled, { keyframes } from "styled-components";
import Calender from "./Calendar";
// import Animate from "rc-animate";

export const cldFlashPop = keyframes`
  0% {
    opacity: 1;
  }
  33% {
    opacity: 0.5;
  }
  66% {
    opacity: 0.1;
  }
`;

export const cldFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

/** animate */
export const cldFadeOut = keyframes`
  0% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const cldSlideInUp = keyframes`
  0% {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translateZ(0);
  }
`;

export const cldSlideInDown = keyframes`
  0% {
    transform: translateZ(0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 100%, 0);
  }
`;

/** individual */
export default styled(Calender)`
  .datepicker {
    z-index: 1111;
    background: #fff;
    overflow: auto;
    width: 10rem;
    bottom: 0;
    .datepicker-header {
      font-size: 0.4rem;
      line-height: 0.82rem;
      color: #333;
      .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 0.35rem;
        .iconfont {
          transform: rotate(45deg);
          display: block;
        }
      }
    }
    .datepicker-tips {
      width: 100%;
      z-index: 999;
      .tip-txt {
        margin: 0;
        background-color: #f9eece;
        color: #999;
        font-size: 0.32rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .weeks {
      font-size: 0.34rem;
      background-color: #fff;
      z-index: 999;
      box-sizing: border-box;
      padding: 0 0.26rem;
    }
    .datepicker-load {
      width: 100%;
      height: 100%;
      background: #fff;
      top: 0;
      left: 0;
      z-index: 1;
      .datepicker-load-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .dot {
          display: inline-block;
          width: 0.32rem;
          height: 0.32rem;
          border-radius: 0.32rem;
          background-color: #0076ff;
          margin: 0 0.1067rem;
          opacity: 0.1;
          animation: flashPop 0.6s linear alternate infinite both;
          &:nth-of-type(2) {
            animation-delay: 0.2s;
          }
          &:last-child {
            animation-delay: 0.4s;
          }
        }
      }
    }
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
          height: 1rem;
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
      .month-wrapper .months {
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
          .dayOfMonth {
            display: flex;
            flex: 0 0 calc(100% / 7);
            margin-top: 0.12rem;
            height: 1.5rem;
            position: relative;
            box-sizing: border-box;
            &.emptyDay {
              align-items: center;
              justify-content: center;
            }
            &:not(.empty) {
              flex-flow: column nowrap;
              justify-content: center;
            }
            &.selected::after,
            &.selected-start::after,
            &.selected-end::after {
              content: "";
              width: 100%;
              height: 100%;
              display: block;
              position: absolute;
              z-index: -1;
              left: 0;
              top: 0;
              border-radius: 0.1rem;
            }
            &.selected-start::after {
              background-color: #1a9fef;
            }
            &.selected::after {
              background-color: #dbf1fb;
            }
            &.selected-end::after {
              background-color: #1a9fef;
            }
            &.selected-start .calendarFestival,
            &.selected-start .calendarDay,
            &.selected-start .tit,
            &.selected-end .calendarFestival,
            &.selected-end .calendarDay,
            &.selected-end .tit {
              color: #fff !important;
            }
            &.day-of-rest::before,
            &.day-of-work::before {
              position: absolute;
              top: 0;
              right: 0;
              padding: 1px;
              border-radius: 2px;
              font-size: 0.245rem;
              color: #ff5722;
              border: 1px solid #ff5722;
              line-height: 0.3rem;
            }
            &.disabled.day-of-rest::before,
            &.disabled.day-of-work::before {
              border: 1px solid #cccc;
              color: #ccc;
            }
            &.disabled .calendarFestival,
            &.disabled .calendarDay,
            &.disabled .tit {
              color: #ccc !important;
            }
            &.day-of-rest::before {
              content: "休";
            }
            &.day-of-work::before {
              content: "班";
            }
            .calendarFestival {
              font-size: 0.32rem;
              color: #666;
              &.festivalCover {
                font-size: 0.42rem;
              }
            }
            .calendarDay {
              font-size: 0.43rem;
              color: #333;
            }
            .placeholder {
              height: 0.6rem;
            }
            .tit {
              color: #444;
              font-size: 0.3rem;
            }
          }
        }
      }
    }
  }
`;
