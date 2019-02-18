import styled from "styled-components";
import Calender from "./Calendar";

/** individual */
export default styled(Calender)`
  /** iconfont */
  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /** common */
  .il-flx {
    display: inline-flex;
  }

  .flx {
    display: flex;
    width: 100%;
  }

  .flx-1 {
    flex: 1;
  }
  .flx-3 {
    flex: 3;
  }
  .flx-4 {
    flex: 4;
  }
  .flx-row {
    -webkit-box-orient: horizontal;
    flex-flow: row nowrap;
  } /*flex 居中*/
  .flx-ard {
    justify-content: space-around;
  }
  /*flex 四边居中 [flex~= "center" ]*/ /*flex 水平居中*/
  .flx-hct,
  .flx-ct {
    justify-content: center;
  }
  /*flex 垂直居中*/
  .flx-vct,
  .flx-ct {
    align-items: center;
  }
  /*flex 列-垂直往下,行-水平往右*/
  .flx-col.flx-vbtm,
  .flx-row.flx-h-rgt {
    justify-content: flex-end;
  }
  /*flex 行-垂直往下,列-水平往右*/
  .flx-row.flx-vbtm,
  .flx-col.flx-hrgt {
    align-items: flex-end;
  }

  .stc {
    position: static;
  }
  .rlt {
    position: relative;
  }
  .abs {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .hide {
    display: none !important;
  }
  .placeholder {
    visibility: hidden !important;
  }
  .hidden {
    display: none !important;
    visibility: hidden !important;
  }
`;
