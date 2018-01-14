import * as React from "react";
import withResponsiveness from "./withResponsiveness";

const mockEmit = jest.fn();

jest.mock("../addons", () => {
  const addonsModule = { getChannel: () => ({ emit: mockEmit }) };
  return { default: addonsModule };
});

beforeEach(() => {
  mockEmit.mockReset();
});

it("emits event with story kind and name", () => {
  withResponsiveness(() => <div>Component</div>, {
    kind: "kind",
    story: "story",
  });

  expect(mockEmit.mock.calls).toMatchSnapshot();
});

it("renders component", () => {
  const render = withResponsiveness(() => <div>Component</div>, {
    kind: "kind",
    story: "story",
  });

  expect(render).toMatchSnapshot();
});
