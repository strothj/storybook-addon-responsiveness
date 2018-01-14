export default class EnabledStoriesRegistry {
  private registry: Map<string, Map<string, boolean>> = new Map();

  addStory = (kind: string, story: string) => {
    if (!this.registry.has(kind)) this.registry.set(kind, new Map());

    const stories = this.registry.get(kind)!;
    if (!stories.has(story)) stories.set(story, false);
  };

  has = (kind: string, story: string) => {
    if (!this.registry.has(kind)) return false;
    return this.registry.get(kind)!.has(story);
  };

  isEnabled = (kind: string, story: string) => {
    if (!this.has(kind, story)) return false;
    return this.registry.get(kind)!.get(story)!;
  };

  enableStory = (kind: string, story: string) => {
    this.addStory(kind, story);
    this.registry.get(kind)!.set(story, true);
  };
}
