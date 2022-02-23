import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MyResume from "..";

export default {
  title: "Pages/MyResume",
  component: MyResume,
  argTypes: {}
} as ComponentMeta<typeof MyResume>;

const Template: ComponentStory<typeof MyResume> = args => <MyResume {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
