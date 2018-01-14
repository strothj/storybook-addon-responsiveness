import * as React from "react";
import { Renderable } from "@storybook/react";
import { eventEnableStoryResponsiveness } from "../constants";
import EnabledStoriesRegistry from "./EnabledStoriesRegistry";
import StorybookApiProps from "./StorybookApiProps";

export interface IsResponsivenessEnabledProps extends StorybookApiProps {
  render: (isResponsivenessEnabled: boolean) => Renderable;
}

export interface IsResponsivenessEnabledState {
  currentStoryKind: string | null;
  currentStory: string | null;
}

class IsResponsivenessEnabled extends React.Component<
  IsResponsivenessEnabledProps,
  IsResponsivenessEnabledState
> {
  state: IsResponsivenessEnabledState = {
    currentStoryKind: null,
    currentStory: null,
  };

  private registry = new EnabledStoriesRegistry();

  componentDidMount() {
    this.props.storybookAPI.onStory(this.handleStoryChange);
    this.props.storybookChannel.on(
      eventEnableStoryResponsiveness,
      this.handleEnableEvent,
    );
  }

  private handleStoryChange = (kind: string, story: string) => {
    this.registry.addStory(kind, story);
    this.setState({ currentStoryKind: kind, currentStory: story });
  };

  private handleEnableEvent = (event: { kind: string; story: string }) => {
    const { kind, story } = event;
    this.registry.enableStory(kind, story);

    if (
      this.state.currentStoryKind === kind &&
      this.state.currentStory === story
    )
      this.forceUpdate();
  };

  render() {
    const registry = this.registry;
    const { currentStoryKind, currentStory } = this.state;
    let enabled = false;

    if (currentStoryKind !== null && currentStory !== null)
      enabled = registry.isEnabled(currentStoryKind, currentStory);

    return this.props.render(enabled);
  }
}

export default IsResponsivenessEnabled;
