import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import PageMarks from "..";

export default {
  title: "Editor/PageMarks",
  component: PageMarks,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"]
    }
  }
} as ComponentMeta<typeof PageMarks>;

const Template: ComponentStory<typeof PageMarks> = args => <PageMarks {...args} />;
