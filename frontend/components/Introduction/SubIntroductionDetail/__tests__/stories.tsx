import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SubIntroductionDetail from "..";

export default {
  title: "Introduction/SubIntroductionDetail",
  component: SubIntroductionDetail,
  argTypes: {
    order: {
      defaultValue: 1
    },
    title: {
      defaultValue: "제목"
    },
    text: {
      defaultValue: "내용내용내용내용내용내용내용내용내용"
    },
    keyword: {
      defaultValue: "Write"
    }
  }
} as ComponentMeta<typeof SubIntroductionDetail>;

const Template: ComponentStory<typeof SubIntroductionDetail> = args => <SubIntroductionDetail {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
