import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EditForm from "..";

export default {
  title: "EditForm",
  component: EditForm,
  argTypes: {},
} as ComponentMeta<typeof EditForm>;

const Template: ComponentStory<typeof EditForm> = (args) => (
  <EditForm {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
