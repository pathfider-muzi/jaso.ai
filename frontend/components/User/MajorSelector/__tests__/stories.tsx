import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MajorSelector from "..";

export default {
  title: "Selector/MajorSelector",
  component: MajorSelector,
  argTypes: {}
} as ComponentMeta<typeof MajorSelector>;

const Template: ComponentStory<typeof MajorSelector> = args => <MajorSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
