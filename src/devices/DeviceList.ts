/**
 * Basic structure of Chrome Dev Tools devices "module.json":
 * https://raw.githubusercontent.com/ChromeDevTools/devtools-frontend/master/front_end/emulated_devices/module.json
 */
interface DeviceList {
  extensions: {
    device: {
      "show-by-default": boolean;
      title: string;
      screen: {
        horizontal: {
          width: number;
          height: number;
        };
        // "device-pixel-ratio": number;
        vertical: {
          width: number;
          height: number;
        };
      };
      // capabilities: ("touch" | "mobile")[];
      // "user-agent": string;
      // type: "phone" | "tablet" | "notebook";
    };
  }[];
}

export default DeviceList;
