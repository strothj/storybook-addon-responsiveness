import * as React from "react";
import { style } from "typestyle";
import { boxShadow } from "../css";

export interface IframeProps {
  src: string;
  isEnabled: boolean;
  width: number;
  height: number;
}

const Iframe: React.SFC<IframeProps> = props => {
  let classes = iframeStyle;
  if (props.isEnabled) classes += " " + iframeBoxShadow;

  return (
    <iframe
      className={classes}
      id="storybook-preview-iframe"
      title="preview"
      allowFullScreen
      src={props.src}
      style={{
        width: props.isEnabled ? props.width : "100%",
        height: props.isEnabled ? props.height : "100%",
      }}
    />
  );
};

const iframeStyle = style({
  border: "none",
  backgroundColor: "#fff",
});

const iframeBoxShadow = style(boxShadow);

export default Iframe;
