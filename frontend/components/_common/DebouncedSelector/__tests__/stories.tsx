import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import DebouncedSelector from "..";

const options = [
  { label: "A", value: "AA" },
  { label: "B", value: "BB" },
  { label: "C", value: "CC" },
  { label: "D", value: "DD" },
  { label: "E", value: "EE" }
];

export default {
  title: "Selector/DebouncedSelector",
  component: DebouncedSelector,
  argTypes: {
    options: {
      defaultValue: options
    },
    callback: {
      defaultValue: (inputValue: string) => {
        console.log(inputValue);

        return options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));
      }
    },
    delayMs: {
      defaultValue: 1000
    },
    title: {
      defaultValue: "라벨"
    }
  }
} as ComponentMeta<typeof DebouncedSelector>;

const Template: ComponentStory<typeof DebouncedSelector> = args => <DebouncedSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
