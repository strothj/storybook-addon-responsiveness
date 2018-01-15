import { getInternalDeviceList, DeviceList } from "./devices";

export interface Settings {
  startEnabled: boolean;
  deviceList: DeviceList;
  startingDeviceTitle: string;
}

const settings: Settings = {
  startEnabled: true,
  deviceList: getInternalDeviceList(),
  startingDeviceTitle: getInternalDeviceList().extensions.find(
    d => d.device["show-by-default"],
  )!.device.title,
};

export const getSettings = (): Settings => settings;
