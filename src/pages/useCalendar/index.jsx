// vendor lib
import * as React from "react";

// common script
import "./index.scss";

// custom components
import Calendar from "../../components/datepicker/Calendar";

export default class UseCalendar extends React.Component {
  state = {
    toggleCalender: false,
    minDate: new Date(2018, 8, 21),
    maxDate: new Date(2018, 9, 2),
    singleDate: new Date(2018, 9, 15)
  };

  dayConfig = {
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
      title: "¥998",
      disable: true
    },
    20180618: {
      title: "¥123"
    },
    20180903: {
      title: "¥228"
    },
    20180910: {
      title: "¥998"
    }
  };

  componentDidMount() {
    this.toggleHandler(true);
  }

  selectedHandler = date => {
    // console.log(date.std);
  };

  confirmHandler = data => {
    // Array.isArray(data)
    //   ? console.log(`confirm: ${data[0].std}, ${data[1].std}`)
    //   : console.log(data.std);
    if (Array.isArray(data))
      this.setState({
        minDate: data[0].date,
        maxDate: data[1].date
      });
    else
      this.setState({
        singleDate: data.date
      });
  };

  toggleHandler = status => {
    this.setState({
      toggleCalender: status
    });
  };

  render() {
    const { singleDate, minDate, maxDate, toggleCalender } = this.state;
    return (
      <div>
        <button onClick={() => this.toggleHandler(true)}>选择日期</button>
        <Calendar
          tip={"价格变动频繁，以实际成交价为准"}
          startDate={new Date(2018, 5, 2)} /** 6月2日 */
          endDate={new Date(2019, 1, 10)} /** 12月10日 */
          selectType={2}
          selectedDate={singleDate}
          selectedDates={[minDate, maxDate]}
          festivalCover={true}
          visible={toggleCalender}
          calendarType={2}
          fullScreen={false}
          isBareShell={true}
          toRoof={"3rem"}
          title="请选择日期test"
          dayConfig={this.dayConfig}
          onSelect={this.selectedHandler}
          onConfirm={this.confirmHandler}
          onCancel={() => this.toggleHandler(false)}
        />
      </div>
    );
  }
}
