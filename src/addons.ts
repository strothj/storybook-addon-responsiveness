/**
 * Provide type definitions for @storybook/addons without polluting global
 * namespace.
 */

// @ts-ignore
import addonsMod from "@storybook/addons";

const addons = addonsMod as AddonAPI;

export interface StorybookChannel {
  on: (eventName: string, handler: (event?: any) => any) => any;
  removeListener: (eventName: string, handler: () => any) => any;
  emit: (eventName: string, data?: any) => any;
}

export interface QueryParams {
  [key: string]: string | null;
}

export interface StorybookAPI {
  setQueryParams: (queryParams: QueryParams) => any;

  getQueryParam: (param: string) => string | undefined;

  onStory: (handler: (kind: string, story: string) => any) => any;
}

export type GetChannel = () => StorybookChannel;

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

export default addons;
