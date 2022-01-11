import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Avatar from "..";

export default {
  title: "Avatar",
  component: Avatar,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: "md",
  src: "/profile_default.png",
};
