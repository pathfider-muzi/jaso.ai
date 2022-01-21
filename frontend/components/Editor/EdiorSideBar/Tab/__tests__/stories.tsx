import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Tab from "..";

export default {
  title: "Editor/EditorSideBar/Tab",
  component: Tab,
  argTypes: {}
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = args => <Tab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
