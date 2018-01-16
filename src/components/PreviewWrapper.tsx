import * as React from "react";
import { style } from "typestyle";
import { fontStyle, boxShadow } from "../css";

export interface PreviewWrapperProps {
  isEnabled: boolean;
  width: number;
  height: number;
}

const PreviewWrapper: React.SFC<PreviewWrapperProps> = props => (
  <div className={backgroundStyle + (props.isEnabled ? " enabled" : "")}>
    <div className={containerStyle + (props.isEnabled ? " enabled" : "")}>
      <div
        className={
          dimensionsContainerStyle + (props.isEnabled ? " enabled" : "")
        }
      >
        {props.width} x {props.height}
      </div>
      {props.children}
    </div>
  </div>
);

export default PreviewWrapper;

const backgroundStyle = style({
  boxSizing: "border-box",
  display: "flex",
  width: "100%",
  height: "100%",

  // Checkerboard background
  background: `
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.0380392) 25%,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 0.0380392) 75%,
      rgba(0, 0, 0, 0.0380392) 0
    ),
    linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.0380392) 25%,
      rgba(0, 0, 0, 0) 25%,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 0.0380392) 75%,
      rgba(0, 0, 0, 0.0380392) 0
    ),
    rgb(255, 255, 255)`,
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 10px 10px",

  $nest: {
    "& *": {
      boxSizing: "border-box",
    },

    "&.enabled": { overflow: "scroll" },
  },
});

const containerStyle = style({
  width: "100%",
  height: "100%",

  $nest: {
    "&.enabled": {
      flexShrink: 0,
      width: "auto",
      height: "auto",
      padding: 24,
      margin: "auto",
    },
  },
});

const dimensionsContainerStyle = style({
  display: "none",

  $nest: {
    "&.enabled": {
      display: "block",
      width: "100%",
      padding: 4,
      marginBottom: 12,
      backgroundColor: "#fff",
      textAlign: "center",
      ...fontStyle,
      ...boxShadow,
    },
  },
});
