import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginModal from "..";

export default {
  title: "Modal/LoginModal",
  component: LoginModal,
  argTypes: {
    isOpen: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => (
  <LoginModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
