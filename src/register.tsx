import * as React from "react";
import addons from "./addons";
import { addonName, addonPanelName, addonTitle } from "./constants";
import Manager from "./components/Manager";

let registered = false;

export const register = () => {
  if (registered) return;
  registered = true;

  addons.register(addonName, api => {
    addons.addPanel(addonPanelName, {
      title: addonTitle,
      render: () => (
        <Manager storybookChannel={addons.getChannel()} storybookAPI={api} />
      ),
    });
  });
};

export const testingResetRegistered = () => {
  registered = false;
};

register();
