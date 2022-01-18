import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import StatisticsIntroduction from "..";

export default {
  title: "Introduction/StatisticsIntroduction",
  component: StatisticsIntroduction,
  argTypes: {
    data: {
      defaultValue: [
        {
          value: "15000+",
          label: "보유 자기소개서"
        },
        {
          value: "99.99%",
          label: "GUARANTEED UPTIME"
        }
      ]
    }
  }
} as ComponentMeta<typeof StatisticsIntroduction>;

const Template: ComponentStory<typeof StatisticsIntroduction> = args => <StatisticsIntroduction {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
