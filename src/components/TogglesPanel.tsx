import * as React from "react";
import { style } from "typestyle";
import { fontStyle } from "../css";
import { TogglesApi } from "./Toggles";

export interface TogglesPanelProps extends TogglesApi {}

class TogglesPanel extends React.Component<TogglesPanelProps> {
  handleEnableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setIsEnabled(event.target.checked);
  };

  handleSelectedDeviceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    this.props.setSelectedDevice(event.target.value);
  };

  handleOrientationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setOrientation(event.target.checked ? "vertical" : "horizontal");
  };

  render() {
    return (
      <div className={togglesPanelStyle}>
        <div>Enable</div>
        <div>
          <input
            type="checkbox"
            checked={this.props.isEnabled}
            onChange={this.handleEnableChange}
          />
        </div>

        <div>Device</div>
        <div>
          <select
            value={this.props.selectedDevice}
            onChange={this.handleSelectedDeviceChange}
          >
            {this.props.deviceList.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>Vertical</div>
        <div>
          <input
            type="checkbox"
            checked={this.props.orientation === "vertical"}
            onChange={this.handleOrientationChange}
          />
        </div>
      </div>
    );
  }
}

const togglesPanelStyle = style(
  {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    width: "100%",
    padding: 5,

    $nest: {
      "&> *": {
        boxSizing: "border-box",
      },

      "div:nth-child(odd)": {
        width: 100,
        textAlign: "right",
        textTransform: "uppercase",
      },

      "div:nth-child(even)": {
        width: "calc(100% - 100px)",
      },

      div: {
        padding: 8,
      },
    },
  },
  fontStyle,
);

export default TogglesPanel;
