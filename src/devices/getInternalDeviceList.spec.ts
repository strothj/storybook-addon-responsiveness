import getInternalDeviceList from "./getInternalDeviceList";

it("returns device list from module", () => {
  const devices = getInternalDeviceList();
  const iPhone5 = devices.extensions.find(d =>
    d.device.title.includes("iPhone 5"),
  );

  expect(iPhone5).toMatchSnapshot();
});
