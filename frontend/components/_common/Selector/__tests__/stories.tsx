import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Selector from "..";

const options = [
  { label: "A", value: "AA" },
  { label: "B", value: "BB" },
  { label: "C", value: "CC" },
  { label: "D", value: "DD" },
  { label: "E", value: "EE" }
];

export default {
  title: "Selector/Selector",
  component: Selector,
  argTypes: {
    options: {
      defaultValue: options
    },
    title: {
      defaultValue: "라벨"
    }
  }
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = args => <Selector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
