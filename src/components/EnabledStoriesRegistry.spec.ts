import EnabledStoriesRegistry from "./EnabledStoriesRegistry";

const kind = "kind";
const story = "story";
let registry: EnabledStoriesRegistry;

beforeEach(() => {
  registry = new EnabledStoriesRegistry();
});

it("adds story to registry (default disabled)", () => {
  expect(registry.has(kind, story)).toBe(false);
  registry.addStory(kind, story);
  expect(registry.has(kind, story)).toBe(true);
  expect(registry.isEnabled(kind, story)).toBe(false);
});

it("adds story enabled", () => {
  registry.enableStory(kind, story);
  expect(registry.has(kind, story)).toBe(true);
  expect(registry.isEnabled(kind, story)).toBe(true);
});

it("returns false for nonexisting story", () => {
  expect(registry.has(kind, story)).toBe(false);
  expect(registry.isEnabled(kind, story)).toBe(false);
});
