import * as React from "react";
import StorybookApiProps from "./StorybookApiProps";
import IsStoryResponsivenessEnabled from "./IsStoryResponsivenessEnabled";
import Toggles from "./Toggles";
import TogglesPanel from "./TogglesPanel";

export interface ManagerProps extends StorybookApiProps {}

class Manager extends React.Component<ManagerProps, {}> {
  render() {
    return (
      <IsStoryResponsivenessEnabled
        {...this.props}
        render={(_isisResponsivenessEnabled: boolean) => (
          <Toggles
            getQueryParam={this.props.storybookAPI.getQueryParam}
            setQueryParams={this.props.storybookAPI.setQueryParams}
            render={togglesApi => <TogglesPanel {...togglesApi} />}
          />
        )}
      />
    );
  }
}

export default Manager;
