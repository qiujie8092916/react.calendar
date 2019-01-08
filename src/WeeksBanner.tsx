import React from "react";
import styled from "styled-components";

interface WeeksBannerType {
  hasTip: boolean;
  weeks: string[];
  weekHeight: number;
  className?: string;
}

class WeeksBanner extends React.PureComponent<WeeksBannerType, any> {
  render() {
    const { weekHeight, weeks } = this.props;
    return (
      <div
        className={`${this.props.className} weeks flx`}
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
export default styled(WeeksBanner)`
  font-size: 0.34rem;
  background-color: #fff;
  z-index: 999;
  box-sizing: border-box;
  padding: 0 0.26rem;
`;
