import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "..";

export default {
  title: "Header",
  component: Header,
  argTypes: {
    user: {
      options: [true, false],
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
