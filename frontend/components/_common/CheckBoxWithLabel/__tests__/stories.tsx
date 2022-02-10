import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import CheckBoxWithLabel from "..";

export default {
  title: "CheckBoxWithLabel",
  component: CheckBoxWithLabel,
  argTypes: {
    isChecked: {
      defaultValue: false,
      control: {
        type: "boolean"
      }
    },
    text: {
      defaultValue: "이용약관 및 개인정보 처리방침에 동의합니다.",
      control: {
        type: "text"
      }
    }
  }
} as ComponentMeta<typeof CheckBoxWithLabel>;

const Template: ComponentStory<typeof CheckBoxWithLabel> = args => <CheckBoxWithLabel {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
