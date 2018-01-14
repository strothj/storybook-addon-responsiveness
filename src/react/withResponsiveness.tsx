import { StoryDecorator } from "@storybook/react";
import addons from "../addons";
import { eventEnableStoryResponsiveness } from "../constants";

const withResponsiveness: StoryDecorator = (render, { kind, story }) => {
  const channel = addons.getChannel();

  channel.emit(eventEnableStoryResponsiveness, { kind, story });

  return render() as any;
};

export default withResponsiveness;
