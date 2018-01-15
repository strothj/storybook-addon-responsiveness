import { Settings } from "../settings";

const defaultSettings: Settings = {
  startEnabled: true,
  deviceList: {
    extensions: [
      {
        device: {
          "show-by-default": false,
          title: "Invisible Device Title",
          screen: {
            horizontal: { width: 100, height: 200 },
            vertical: { width: 200, height: 100 },
          },
        },
      },
      {
        device: {
          "show-by-default": true,
          title: "Device Title",
          screen: {
            horizontal: { width: 100, height: 200 },
            vertical: { width: 200, height: 100 },
          },
        },
      },
    ],
  },
  startingDeviceTitle: "Device Title",
};

let settings = defaultSettings;

export const getSettings = (): Settings => settings;

export const __mockReset = () => {
  settings = defaultSettings;
};

export const __mockSetSettings = (mockSettings: Settings) => {
  settings = mockSettings;
};
