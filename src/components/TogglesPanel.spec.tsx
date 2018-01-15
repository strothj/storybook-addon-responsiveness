import * as React from "react";
import * as renderer from "react-test-renderer";
import TogglesPanel from "./TogglesPanel";

jest.mock("../settings");

it("renders toggle switches", () => {
  const component = renderer.create(
    <TogglesPanel
      deviceList={["iPhone 5/SE"]}
      isEnabled
      orientation="vertical"
      selectedDevice="iPhone 5/SE"
      setIsEnabled={jest.fn()}
      setOrientation={jest.fn()}
      setSelectedDevice={jest.fn()}
    />,
  );

  expect(component.toJSON()).toMatchSnapshot();
});
