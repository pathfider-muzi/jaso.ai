import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import EditorSideBar from "..";

export default {
  component: EditorSideBar,
  argTypes: {},
} as ComponentMeta<typeof EditorSideBar>;
const Template: ComponentStory<typeof EditorSideBar> = (args) => (
  <EditorSideBar></EditorSideBar>
);

export const Primary = Template.bind({});
Primary.args = {};
