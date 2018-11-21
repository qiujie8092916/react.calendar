import React from "react";

interface AnimateFrameType {
  isBareShell: boolean;
  fullScreen: boolean;
  toRoof: string;
  visible: boolean;
}

class AnimateFrame extends React.Component<AnimateFrameType> {
  render() {
    const { toRoof, visible, fullScreen, isBareShell } = this.props;
    return (
      <div
        className="animated fixed"
        style={Object.assign(
          {
            background: "#fff",
            display: visible ? "block" : "none",
            height: "100%",
            width: "100%",
            zIndex: 1111
          },
          isBareShell ? { top: !fullScreen ? toRoof : 0 } : {}
        )}
      >
        {this.props.children}
      </div>
    );
  }
}

export default AnimateFrame;
