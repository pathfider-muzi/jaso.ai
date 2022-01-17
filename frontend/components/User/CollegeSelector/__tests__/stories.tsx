import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import CollegeSelector from "..";

export default {
  title: "Selector/CollegeSelector",
  component: CollegeSelector,
  argTypes: {}
} as ComponentMeta<typeof CollegeSelector>;

const Template: ComponentStory<typeof CollegeSelector> = args => <CollegeSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
