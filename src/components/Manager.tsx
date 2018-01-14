import * as React from "react";
import StorybookApiProps from "./StorybookApiProps";
import IsStoryResponsivenessEnabled from "./IsStoryResponsivenessEnabled";

export interface ManagerProps extends StorybookApiProps {}

class Manager extends React.Component<ManagerProps, {}> {
  render() {
    return (
      <IsStoryResponsivenessEnabled
        {...this.props}
        render={(isisResponsivenessEnabled: boolean) => {
          return (
            <div>Manager, enabled: {isisResponsivenessEnabled.toString()}</div>
          );
        }}
      />
    );
  }
}

export default Manager;
