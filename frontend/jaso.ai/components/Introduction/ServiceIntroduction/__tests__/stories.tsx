import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ServiceIntroduction from "..";

export default {
  title: "ServiceIntroduction",
  component: ServiceIntroduction,
  argTypes: {},
} as ComponentMeta<typeof ServiceIntroduction>;

const Template: ComponentStory<typeof ServiceIntroduction> = () => (
  <ServiceIntroduction />
);

export const Primary = Template.bind({});
Primary.args = {};
