const mockAddonsRegister = jest.fn();
const mockAddonsAddPanel = jest.fn();

mockAddonsRegister.mockImplementation((_addonName: string, cb: any) => {
  cb("api");
});

jest.mock("@storybook/addons", () => ({
  default: {
    register: mockAddonsRegister,
    addPanel: mockAddonsAddPanel,
  },
}));

import { register, testingResetRegistered } from "./register";

// This test must come first due to internal module flag
describe("import test", () => {
  it("registers addon on module import", () => {
    expect(mockAddonsRegister.mock.calls).toHaveLength(1);
  });
});

describe("addon registration", () => {
  beforeEach(() => {
    mockAddonsRegister.mockReset();
    testingResetRegistered();
  });

  it("registers addon at most once", () => {
    expect(mockAddonsRegister.mock.calls).toHaveLength(0);
    register();
    expect(mockAddonsRegister.mock.calls).toHaveLength(1);
    register();
    expect(mockAddonsRegister.mock.calls).toHaveLength(1);
  });

  it("registers addon with name", () => {
    register();
    expect(mockAddonsRegister.mock.calls[0][0]).toMatchSnapshot();
  });

  it("adds panel", () => {
    register();

    // Panel name matches string from ./constants.ts
    expect(mockAddonsAddPanel.mock.calls[0]).toMatchSnapshot();

    // Creates Manager components, passing Storybook Addon channel and api
    expect(
      mockAddonsAddPanel.mock.calls[0][1].render.toString(),
    ).toMatchSnapshot();
  });
});
