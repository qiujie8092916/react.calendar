/* tslint:disable: object-literal-sort-keys */
import React from "react";
import Calendar from "./../../src/index";
import moment from "moment";
import styled from "styled-components";
import { DateObject } from "../../src/propTypes";

import "./App.css";

class App extends React.Component<any> {
  state = {
    startDate: new Date(moment("2018-06-02").valueOf()),
    endDate: new Date(moment("2019-01-10").valueOf()),
    maxDate: new Date(2018, 9, 2),
    minDate: new Date(2018, 8, 21),
    singleDate: new Date(2018, 9, 15),
    toggleCalender: false,
    dayConfig: {}
  };

  selectedType = 2;

  componentDidMount() {
    setTimeout(() => {
      this.toggleHandler(true);
    }, 100);

    setTimeout(() => {
      this.setState({
        dayConfig: {
          20180601: {
            title: "¥1262"
          },
          20180602: {
            title: "¥99"
          },
          20180604: {
            title: "¥888"
          },
          20180605: {
            disable: true,
            title: "¥998"
          },
          20180618: {
            title: "¥123"
          },
          20180903: {
            title: "¥228"
          },
          20180910: {
            title: "¥999"
          }
        }
      });
    }, 2000);

    setTimeout(() => {
      this.setState({
        dayConfig: Object.assign({}, this.state.dayConfig, {
          20180905: {
            disable: true
          }
        })
      });
    }, 3000);

    setTimeout(() => {
      this.setState({
        dayConfig: Object.assign({}, this.state.dayConfig, {
          20180910: {
            title: "¥2002"
          }
        })
      });
    }, 4000);
  }

  selectedHandler = (date: DateObject) => {
    console.log(date.std);
  };

  confirmHandler = (...selected: DateObject[]) => {
    console.log(
      `confirm: ${selected[0].std}${selected[1] ? ` - ${selected[1].std}` : ""}`
    );

    if (selected[1]) {
      this.setState({
        maxDate: selected[1].date,
        minDate: selected[0].date
      });
    } else {
      this.setState({
        singleDate: selected[0].date
      });
    }
  };

  toggleHandler = (status: boolean) => {
    this.setState({
      toggleCalender: status
    });
  };

  render() {
    const {
      startDate,
      endDate,
      singleDate,
      minDate,
      maxDate,
      dayConfig,
      toggleCalender
    } = this.state;
    return (
      <div className={this.props.className}>
        <button onClick={() => this.toggleHandler(true)}>选择日期</button>
        <Calendar
          tip={"价格变动频繁，以实际成交价为准"}
          startDate={startDate}
          endDate={endDate}
          selectType={2}
          selectedDate={
            this.selectedType === 1 ? [singleDate] : [minDate, maxDate]
          }
          festivalCover
          visible={toggleCalender}
          calendarType={1}
          fullScreen={false}
          isBareShell={true}
          toRoof={"3rem"}
          title="请选择日期test"
          dayConfig={dayConfig}
          onSelect={this.selectedHandler}
          onConfirm={this.confirmHandler}
          onCancel={() => this.toggleHandler(false)}
        />
      </div>
    );
  }
}

export default styled(App)`
  overflow: hidden;
  button {
    border: 1px solid #666;
    background: #fff;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    margin: 1rem auto 0 !important;
    display: block;
    outline: none;
  }
  button:active {
    background-color: #d2e8fb;
  }
`;
