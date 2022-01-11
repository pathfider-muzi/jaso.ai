import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Logo from "..";

export default {
  title: "Logo",
  component: Logo,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
