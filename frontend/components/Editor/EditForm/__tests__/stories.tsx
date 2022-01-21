import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import EditForm from "..";

export default {
  title: "Editor/EditForm",
  component: EditForm,
  argTypes: {}
} as ComponentMeta<typeof EditForm>;

const Template: ComponentStory<typeof EditForm> = args => <EditForm {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
