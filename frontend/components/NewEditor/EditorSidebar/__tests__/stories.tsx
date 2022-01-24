import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import EditorSidebar from "..";

export default {
  title: "NewEditorForm/EditorSidebar",
  component: EditorSidebar,
  argTypes: {}
} as ComponentMeta<typeof EditorSidebar>;

const Template: ComponentStory<typeof EditorSidebar> = args => <EditorSidebar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
