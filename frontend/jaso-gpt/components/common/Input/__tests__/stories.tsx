import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "..";

export default {
  title: "Input",
  component: Input,
  argTypes: {
    placeholder: {
      defaultValue: "입력하세요",
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
