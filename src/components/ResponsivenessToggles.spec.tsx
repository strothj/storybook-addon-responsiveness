import * as React from "react";
import * as renderer from "react-test-renderer";
import { getSettings } from "../settings";
import * as constants from "../constants";

import ResponsivenessToggles, {
  ResponsivenessTogglesProps,
  ResponsivenessTogglesApi,
} from "./ResponsivenessToggles";

// ../__mocks__/settings.ts
jest.mock("../settings");

const mockProps = {
  getQueryParam: jest.fn(),
  setQueryParams: jest.fn(),
  render: jest.fn(() => <div>Child Component</div>),
};

const props = mockProps as ResponsivenessTogglesProps;

beforeEach(() => {
  require("../settings").__mockReset();
  mockProps.getQueryParam.mockReset();
  mockProps.setQueryParams.mockReset();
  mockProps.render.mockClear();
});

it("renders child component from render function", () => {
  const component = renderer.create(<ResponsivenessToggles {...props} />);
  expect(component.toJSON()).toMatchSnapshot();
});

it("uses defaults from settings", () => {
  const defaultSettings = getSettings();
  renderer.create(<ResponsivenessToggles {...props} />).toJSON();

  // render() { return this.props.render(api); }
  const api = mockProps.render.mock.calls[0][0] as ResponsivenessTogglesApi;

  expect(api.isEnabled).toBe(defaultSettings.startEnabled);
  expect(api.selectedDevice).toBe(defaultSettings.startingDeviceTitle);
  expect(api.orientation).toBe("vertical");
});

it("overrides defaults using query parameters", () => {
  mockProps.getQueryParam.mockImplementation((param: string) => {
    switch (param) {
      case constants.queryEnabled:
        return "0";
      case constants.queryDevice:
        return "Other Device Title";
      case constants.queryOrientation:
        return "horizontal";
      default:
        return undefined;
    }
  });

  renderer.create(<ResponsivenessToggles {...props} />).toJSON();
  const api = mockProps.render.mock.calls[0][0] as ResponsivenessTogglesApi;

  expect(api.isEnabled).toBe(false);
});

it("sets query parameters on mount", () => {
  renderer.create(<ResponsivenessToggles {...props} />).toJSON();

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
  let api: ResponsivenessTogglesApi;

  const component = renderer.create(<ResponsivenessToggles {...props} />);
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
