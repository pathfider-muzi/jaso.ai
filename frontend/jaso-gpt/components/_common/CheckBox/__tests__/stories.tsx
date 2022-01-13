import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import CheckBox from "..";

export default {
  title: "CheckBox",
  component: CheckBox,
  argTypes: {},
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
