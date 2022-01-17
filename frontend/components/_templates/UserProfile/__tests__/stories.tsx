import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UserProfile from "..";

export default {
  title: "Pages/UserProfile",
  component: UserProfile,
  argTypes: {},
} as ComponentMeta<typeof UserProfile>;

const Template: ComponentStory<typeof UserProfile> = () => <UserProfile />;

export const Primary = Template.bind({});
Primary.args = {};
