import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SignUp from "..";

export default {
  title: "Pages/SignUp",
  component: SignUp,
  argTypes: {},
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = () => <SignUp />;

export const Primary = Template.bind({});
Primary.args = {};
