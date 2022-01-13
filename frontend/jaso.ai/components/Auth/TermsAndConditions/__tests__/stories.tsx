import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TermsAndConditions from "..";

export default {
  title: "TermsAndConditions",
  component: TermsAndConditions,
  argTypes: {
    isChecked: {
      defaultValue: false,
      control: {
        type: "boolean",
      },
    },
    text: {
      defaultValue: "이용약관 및 개인정보 처리방침에 동의합니다.",
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof TermsAndConditions>;

const Template: ComponentStory<typeof TermsAndConditions> = (args) => (
  <TermsAndConditions {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
