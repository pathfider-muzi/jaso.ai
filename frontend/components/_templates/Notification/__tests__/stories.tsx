import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Notification from "..";

export default {
  title: "Pages/Notification",
  component: Notification,
  argTypes: {}
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = args => <Notification {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
