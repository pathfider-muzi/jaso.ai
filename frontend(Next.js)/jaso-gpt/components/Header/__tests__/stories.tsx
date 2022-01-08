import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "..";

export default {
  title: "Header",
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = () => <Header />;

export const Primary = Template.bind({});
Primary.args = {};
