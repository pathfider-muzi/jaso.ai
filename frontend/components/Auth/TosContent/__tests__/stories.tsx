import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TosContent from "..";

export default {
  title: "TosContent",
  component: TosContent,
  argTypes: {
    label: {
      defaultValue: "약관",
      control: {
        type: "text"
      }
    },
    textContent: {
      defaultValue:
        "이 약관은 영국에서 시작되었습니다. 이 약관은 영국에서 시작되었습니다.이 약관은 영국에서 시작되었습니다.이 약관은 영국에서 시작되었습니다.이 약관은 영국에서 시작되었습니다.이 약관은 영국에서 시작되었습니다."
    }
  }
} as ComponentMeta<typeof TosContent>;

const Template: ComponentStory<typeof TosContent> = args => <TosContent {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
