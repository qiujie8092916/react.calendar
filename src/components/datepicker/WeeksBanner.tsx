import React from "react";

interface WeeksBannerType {
  hasTip: boolean;
  weeks: string[];
  weekHeight: number;
}

class WeeksBanner extends React.PureComponent<WeeksBannerType, any> {
  render() {
    const { weekHeight, weeks } = this.props;
    return (
      <div
        className="weeks flx"
        style={{
          height: `${weekHeight}rem`
        }}
      >
        {weeks.map((it, idx) => {
          return (
            <span
              key={idx}
              className="flx flx-1 flx-vct flx-ard"
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
