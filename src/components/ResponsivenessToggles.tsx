import * as React from "react";
import { Renderable } from "@storybook/react";
import { StorybookAPI } from "../addons";
import { getSettings, Settings } from "../settings";
import * as constants from "../constants";

export interface ResponsivenessTogglesProps {
  getQueryParam: StorybookAPI["getQueryParam"];
  setQueryParams: StorybookAPI["setQueryParams"];
  render: (api: ResponsivenessTogglesApi) => Renderable;
}

export interface ResponsivenessTogglesState {
  isEnabled: boolean;
  selectedDevice: string;
  orientation: "vertical" | "horizontal";
}

export interface ResponsivenessTogglesApi extends ResponsivenessTogglesState {
  setIsEnabled: (isEnabled: boolean) => any;
  setSelectedDevice: (device: string) => any;
  setOrientation: (orientation: "vertical" | "horizontal") => any;
}

class ResponsivenessToggles extends React.Component<
  ResponsivenessTogglesProps,
  ResponsivenessTogglesState
> {
  private settings: Settings;

  constructor(props: ResponsivenessTogglesProps) {
    super(props);

    this.settings = getSettings();

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
    this.setState({ isEnabled });
    this.setQueryParams();
  };

  private handleSetSelectedDevice = (selectedDevice: string) => {
    this.setState({ selectedDevice });
    this.setQueryParams();
  };

  private handleSetOrientation = (orientation: "vertical" | "horizontal") => {
    this.setState({ orientation });
    this.setQueryParams();
  };

  render() {
    const api: ResponsivenessTogglesApi = {
      isEnabled: this.state.isEnabled,
      selectedDevice: this.state.selectedDevice,
      orientation: this.state.orientation,
      setIsEnabled: this.handleSetIsEnabled,
      setSelectedDevice: this.handleSetSelectedDevice,
      setOrientation: this.handleSetOrientation,
    };

    return this.props.render(api);
  }
}

export default ResponsivenessToggles;
