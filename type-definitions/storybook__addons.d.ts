declare module "@storybook/addons" {
  import { EventEmitter } from "events";

  export type StorybookChannel = EventEmitter;

  type GetChannel = () => StorybookChannel;

  interface QueryParams {
    [key: string]: string | null;
  }

  export interface AddonAPI {
    addPanel: (
      panelName: string,
      options: {
        title: string;
        render: React.ComponentType<any>;
      },
    ) => any;

    getChannel: GetChannel;

    register: (
      addonName: string,
      callback: (storybookAPI: StorybookAPI) => any,
    ) => any;
  }

  export interface StorybookAPI {
    setQueryParams: (queryParams: QueryParams) => any;

    getQueryParam: (param: string) => string | undefined;
  }

  const addonAPI: AddonAPI;

  export default addonAPI;
}
