import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextArea from "..";

export default {
  title: "TextArea",
  component: TextArea,
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  height: 300,
};
