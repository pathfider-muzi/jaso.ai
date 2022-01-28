import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import DebouncedMultiSelector from "..";

const options = [
  { label: "A", value: "AA" },
  { label: "B", value: "BB" },
  { label: "C", value: "CC" },
  { label: "D", value: "DD" },
  { label: "E", value: "EE" }
];

export default {
  title: "Selector/DebouncedMultiSelector",
  component: DebouncedMultiSelector,
  argTypes: {
    options: {
      defaultValue: options
    },
    callback: {
      defaultValue: (inputValue: string) => {
        return options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      }
    },
    delayMs: {
      defaultValue: 1000
    },
    title: {
      defaultValue: "라벨"
    },
    defaultValue: {
      defaultValue: { label: "E", value: "EE" }
    }
  }
} as ComponentMeta<typeof DebouncedMultiSelector>;

const Template: ComponentStory<typeof DebouncedMultiSelector> = args => <DebouncedMultiSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
