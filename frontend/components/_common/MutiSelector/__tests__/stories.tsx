import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MutiSelector from "..";

export default {
  title: "MutiSelector",
  component: MutiSelector,
  argTypes: {}
} as ComponentMeta<typeof MutiSelector>;

const Template: ComponentStory<typeof MutiSelector> = args => <MutiSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
