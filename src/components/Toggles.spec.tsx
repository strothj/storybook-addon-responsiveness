import * as React from "react";
import * as renderer from "react-test-renderer";
import { getSettings } from "../settings";
import * as constants from "../constants";

import Toggles, { TogglesProps, TogglesApi } from "./Toggles";

// ../__mocks__/settings.ts
jest.mock("../settings");

const mockProps = {
  getQueryParam: jest.fn(),
  setQueryParams: jest.fn(),
  render: jest.fn(() => <div>Child Component</div>),
};

const props = mockProps as TogglesProps;

beforeEach(() => {
  require("../settings").__mockReset();
  mockProps.getQueryParam.mockReset();
  mockProps.setQueryParams.mockReset();
  mockProps.render.mockClear();
});

it("renders child component from render function", () => {
  const component = renderer.create(<Toggles {...props} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it("uses defaults from settings", () => {
  const defaultSettings = getSettings();
  renderer.create(<Toggles {...props} />).toJSON();

  // render() { return this.props.render(api); }
  const api = mockProps.render.mock.calls[0][0] as TogglesApi;

  expect(api.isEnabled).toBe(defaultSettings.startEnabled);
  expect(api.selectedDevice).toBe(defaultSettings.startingDeviceTitle);
  expect(api.orientation).toBe("vertical");

  expect(api.deviceList).toEqual(["Device Title"]);
});

it("overrides defaults using query parameters", () => {
  mockProps.getQueryParam.mockImplementation((param: string) => {
    switch (param) {
      case constants.queryEnabled:
        return "0";
      case constants.queryDevice:
        return "Another Device";
      case constants.queryOrientation:
        return "horizontal";
      default:
        return undefined;
    }
  });

  renderer.create(<Toggles {...props} />).toJSON();
  const api = mockProps.render.mock.calls[0][0] as TogglesApi;

  expect(api.isEnabled).toBe(false);
});

it("sets query parameters on mount", () => {
  renderer.create(<Toggles {...props} />).toJSON();

  // private setQueryParams = () => { this.props.setQueryParams(...); };
  const queryParams = mockProps.setQueryParams.mock.calls[0][0];
  expect(queryParams[constants.queryEnabled]).toBe("1");
  expect(queryParams[constants.queryDevice]).toBe("Device Title");
  expect(queryParams[constants.queryOrientation]).toBe("vertical");
});

it("updates toggles through api", () => {
  const getApi = () =>
    mockProps.render.mock.calls[mockProps.render.mock.calls.length - 1][0];
  const getSetQueryParams = () =>
    mockProps.setQueryParams.mock.calls[
      mockProps.setQueryParams.mock.calls.length - 1
    ][0];
  let api: TogglesApi;

  const component = renderer.create(<Toggles {...props} />);
  component.toJSON();

  // Expect query parameters to have been updated as well.

  // isEnabled / setIsEnabled
  api = getApi();
  api.setIsEnabled(false);
  component.toJSON(); // re-render
  api = getApi();
  expect(api.isEnabled).toBe(false);
  expect(getSetQueryParams()).toHaveProperty(constants.queryEnabled, "0");

  // selectedDevice / setSelectedDevice
  api.setSelectedDevice("Another Device");
  component.toJSON();
  api = getApi();
  expect(api.selectedDevice).toBe("Another Device");
  expect(getSetQueryParams()).toHaveProperty(
    constants.queryDevice,
    "Another Device",
  );

  // orientation / setOrientation
  api.setOrientation("horizontal");
  component.toJSON();
  api = getApi();
  expect(api.orientation).toBe("horizontal");
  expect(getSetQueryParams()).toHaveProperty(
    constants.queryOrientation,
    "horizontal",
  );
});
