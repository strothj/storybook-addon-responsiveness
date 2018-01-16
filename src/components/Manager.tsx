import * as React from "react";
import StorybookApiProps from "./StorybookApiProps";
import IsStoryResponsivenessEnabled from "./IsStoryResponsivenessEnabled";
import Toggles from "./Toggles";
import TogglesPanel from "./TogglesPanel";
import PreviewWrapperPortal from "./PreviewWrapperPortal";
import PreviewWrapper from "./PreviewWrapper";

export interface ManagerProps extends StorybookApiProps {}

const Manager: React.SFC<ManagerProps> = props => (
  <IsStoryResponsivenessEnabled
    {...props}
    render={(_isisResponsivenessEnabled: boolean) => (
      <Toggles
        getQueryParam={props.storybookAPI.getQueryParam}
        setQueryParams={props.storybookAPI.setQueryParams}
        render={togglesApi => (
          <div>
            <TogglesPanel {...togglesApi} />
            <PreviewWrapperPortal
              {...togglesApi}
              render={iframe => (
                <PreviewWrapper {...togglesApi}>{iframe}</PreviewWrapper>
              )}
            />
          </div>
        )}
      />
    )}
  />
);

export default Manager;
