import * as React from "react";
import { StorybookChannel, StorybookAPI } from "@storybook/addons";

export interface ManagerProps {
  storybookChannel: StorybookChannel;
  storybookAPI: StorybookAPI;
}

class Manager extends React.Component<ManagerProps, {}> {
  render() {
    return <div>Place holder</div>;
  }
}

export default Manager;
