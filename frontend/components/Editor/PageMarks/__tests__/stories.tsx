import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import PageMarks from "..";
import PageMark from "../../PageMark";

export default {
  title: "PageMarks",
  component: PageMarks,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
    },
  },
} as ComponentMeta<typeof PageMarks>;

const Template: ComponentStory<typeof PageMarks> = (args) => (
  <PageMarks {...args} />
);
