import * as React from "react";
import { Renderable } from "@storybook/react";
import { StorybookAPI } from "../addons";
import { getSettings, Settings } from "../settings";
import * as constants from "../constants";

export interface TogglesProps {
  getQueryParam: StorybookAPI["getQueryParam"];
  setQueryParams: StorybookAPI["setQueryParams"];
  render: (api: TogglesApi) => Renderable;
}

export interface TogglesState {
  isEnabled: boolean;
  selectedDevice: string;
  orientation: "vertical" | "horizontal";
}

export interface TogglesApi extends TogglesState {
  deviceList: string[];
  width: number;
  height: number;
  setIsEnabled: (isEnabled: boolean) => any;
  setSelectedDevice: (device: string) => any;
  setOrientation: (orientation: "vertical" | "horizontal") => any;
}

class Toggles extends React.Component<TogglesProps, TogglesState> {
  private settings: Settings;
  private deviceList: string[];

  constructor(props: TogglesProps) {
    super(props);

    this.settings = getSettings();
    this.deviceList = this.settings.deviceList.extensions
      .filter(d => d.device["show-by-default"])
      .map(d => d.device.title);

    // Read state from query parameters to preserve state between page refreshes
    const isEnabled = props.getQueryParam(constants.queryEnabled);
    const selectedDevice = props.getQueryParam(constants.queryDevice);
    const orientation = props.getQueryParam(constants.queryOrientation) as
      | "vertical"
      | "horizontal"
      | undefined;

    // Replace unset query parameters with setting defaults
    this.state = {
      isEnabled:
        isEnabled === undefined
          ? this.settings.startEnabled
          : isEnabled === "1",
      selectedDevice:
        selectedDevice === undefined
          ? this.settings.startingDeviceTitle
          : selectedDevice,
      orientation: orientation === undefined ? "vertical" : orientation,
    };
  }

  componentDidMount() {
    this.setQueryParams();
  }

  private setQueryParams = () => {
    this.props.setQueryParams({
      [constants.queryEnabled]: this.state.isEnabled ? "1" : "0",
      [constants.queryDevice]: this.state.selectedDevice,
      [constants.queryOrientation]: this.state.orientation,
    });
  };

  private handleSetIsEnabled = (isEnabled: boolean) => {
    this.setState({ isEnabled }, () => {
      this.setQueryParams();
    });
  };

  private handleSetSelectedDevice = (selectedDevice: string) => {
    this.setState({ selectedDevice }, () => {
      this.setQueryParams();
    });
  };

  private handleSetOrientation = (orientation: "vertical" | "horizontal") => {
    this.setState({ orientation }, () => {
      this.setQueryParams();
    });
  };

  render() {
    const device = this.settings.deviceList.extensions.find(
      d => d.device.title === this.state.selectedDevice,
    )!;
    const screen = device.device.screen[this.state.orientation];
    const { width, height } = screen;

    const api: TogglesApi = {
      width,
      height,
      isEnabled: this.state.isEnabled,
      selectedDevice: this.state.selectedDevice,
      orientation: this.state.orientation,
      setIsEnabled: this.handleSetIsEnabled,
      setSelectedDevice: this.handleSetSelectedDevice,
      setOrientation: this.handleSetOrientation,
      deviceList: this.deviceList,
    };

    return this.props.render(api);
  }
}

export default Toggles;
