import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SubIntroduction from "..";

export default {
  title: "Introduction/SubIntroduction",
  component: SubIntroduction,
  argTypes: {}
} as ComponentMeta<typeof SubIntroduction>;

const Template: ComponentStory<typeof SubIntroduction> = args => <SubIntroduction />;

export const Primary = Template.bind({});
Primary.args = {};
