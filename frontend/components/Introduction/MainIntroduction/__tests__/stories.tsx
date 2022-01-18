import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MainIntroduction from "..";

export default {
  title: "Introduction/MainIntroduction",
  component: MainIntroduction,
  argTypes: {}
} as ComponentMeta<typeof MainIntroduction>;

const Template: ComponentStory<typeof MainIntroduction> = () => <MainIntroduction />;

export const Primary = Template.bind({});
Primary.args = {};
