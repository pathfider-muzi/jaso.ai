import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import RecommendedAnswer from "..";

export default {
  component: RecommendedAnswer,
  argTypes: {}
} as ComponentMeta<typeof RecommendedAnswer>;
const Template: ComponentStory<typeof RecommendedAnswer> = args => <RecommendedAnswer {...args}></RecommendedAnswer>;

export const Primary = Template.bind({});
Primary.args = {};
