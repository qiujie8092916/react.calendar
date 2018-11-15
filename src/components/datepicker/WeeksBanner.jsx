import React from "react";

class WeeksBanner extends React.PureComponent {
  render() {
    let { hasTip, weekHeight, weeks } = this.props;
    return (
      <div
        className="weeks flex"
        style={{
          height: `${weekHeight}rem`
        }}
      >
        {weeks.map((it, idx) => {
          return (
            <span
              key={idx}
              flex="1"
              className="flex"
              flex="v-center around"
              style={{
                color:
                  idx === 0 || idx === weeks.length - 1 ? "#ff5722" : "#333"
              }}
            >
              {it}
            </span>
          );
        })}
      </div>
    );
  }
}
export default WeeksBanner;
