const mockRegister = jest.fn();

jest.mock("./register", () => ({ register: mockRegister }));

it("imports from ./register.tsx to start addon bootstrap", () => {
  expect(mockRegister.mock.calls).toHaveLength(0);
  require("./index");
  expect(mockRegister.mock.calls).toHaveLength(1);
});
