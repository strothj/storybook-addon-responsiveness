import * as React from "react";
import * as renderer from "react-test-renderer";
import IsStoryResponsivenessEnabled from "./IsStoryResponsivenessEnabled";

const mockChannelOn = jest.fn();
const mockOnStory = jest.fn();

const mockStorybookChannel = {
  on: mockChannelOn,
} as any;

const mockStorybookAPI = {
  onStory: mockOnStory,
} as any;

const mockRenderFn = jest.fn(() => <div>Child Component</div>);

const renderComponent = () =>
  renderer.create(
    <IsStoryResponsivenessEnabled
      storybookAPI={mockStorybookAPI}
      storybookChannel={mockStorybookChannel}
      render={mockRenderFn}
    />,
  );

beforeEach(() => {
  mockChannelOn.mockClear();
  mockOnStory.mockClear();
  mockRenderFn.mockClear();
});

it("calls render with false before stories are registered", () => {
  const component = renderComponent();
  expect(component.toJSON()).toMatchSnapshot();
  expect(mockRenderFn.mock.calls).toMatchSnapshot();
});

it("calls render with true when current story matches enabled story", () => {
  // We expect the render prop function to be called with a value of true if
  // the component was received an event saying the component enables the
  // responsiveness addon.
  const component = renderComponent();

  // Simulate the Storybook API story change event.
  // this.props.storybookAPI.onStory(this.handleStoryChange);
  mockOnStory.mock.calls[0][0]("kind", "story");

  component.toJSON(); // re-render
  expect(mockRenderFn.mock.calls[1][0]).toBe(false);

  // Simulate event from withResponsiveness component coming over channel.
  // this.props.storybookChannel.on(..., this.handleEnableEvent);
  mockChannelOn.mock.calls[0][1]({ kind: "kind", story: "story" });

  component.toJSON();
  expect(mockRenderFn.mock.calls[2][0]).toBe(true);
});
