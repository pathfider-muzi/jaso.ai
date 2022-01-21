import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Editor from "..";

export default {
  title: "Pages/Editor",
  component: Editor,
  argTypes: {}
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = args => <Editor />;

export const Primary = Template.bind({});
Primary.args = {};
