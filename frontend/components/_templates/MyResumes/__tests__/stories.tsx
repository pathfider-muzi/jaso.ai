import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MyResumes from "..";

export default {
  title: "Pages/MyResumes",
  component: MyResumes,
  argTypes: {}
} as ComponentMeta<typeof MyResumes>;

const Template: ComponentStory<typeof MyResumes> = () => <MyResumes />;

export const Primary = Template.bind({});
Primary.args = {};
