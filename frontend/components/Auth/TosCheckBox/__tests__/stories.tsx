import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TosCheckBox from "..";

export default {
  title: "TosCheckBox",
  component: TosCheckBox,
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
} as ComponentMeta<typeof TosCheckBox>;

const Template: ComponentStory<typeof TosCheckBox> = args => <TosCheckBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
