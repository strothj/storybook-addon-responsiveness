import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withResponsiveness } from "../src/react";

const stories = storiesOf("Responsiveness Addon", module);
stories.addDecorator(withResponsiveness);

stories.add("Component 1", () => <div>Component 1</div>);

stories.add("Component 2", () => <div>Component 2</div>);
