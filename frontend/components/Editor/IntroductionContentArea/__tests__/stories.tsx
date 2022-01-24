import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextContentArea from "..";

export default {
  title: "TextArea",
  component: TextContentArea,
  argTypes: {}
} as ComponentMeta<typeof TextContentArea>;

const Template: ComponentStory<typeof TextContentArea> = args => <TextContentArea {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  height: 300
};
