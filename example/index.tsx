import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withResponsiveness } from "../src/react";

const stories = storiesOf("Responsiveness Addon", module);
stories.addDecorator(withResponsiveness);

stories.add(
  "using withResponsiveness",
  () => <div>Placeholder</div>,
);
