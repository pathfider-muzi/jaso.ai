import InputForm from "@/components/_common/InputForm";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "InputForm",
  component: InputForm,
  argTypes: {
    label: {
      defaultValue: "라벨",
      control: {
        type: "text",
      },
    },
    value: {
      defaultValue: "값",
      control: {
        type: "text",
      },
    },
    isRequired: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof InputForm>;

const Template: ComponentStory<typeof InputForm> = (args) => (
  <InputForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
