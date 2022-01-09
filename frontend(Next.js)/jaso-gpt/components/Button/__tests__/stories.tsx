import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Button from "..";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: "md",
  children: "버튼",
};
