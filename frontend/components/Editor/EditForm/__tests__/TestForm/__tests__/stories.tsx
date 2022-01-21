import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TestForm from "..";

export default {
  title: "Editor/TestForm",
  component: TestForm,
  argTypes: {}
} as ComponentMeta<typeof TestForm>;

const Template: ComponentStory<typeof TestForm> = args => <TestForm />;

export const Primary = Template.bind({});
Primary.args = {};
