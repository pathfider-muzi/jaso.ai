import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AlarmDropDown from "..";
import { GENERATED_SELF_INTRODUCTION } from "./__fixtures__/data";

export default {
  title: "AlarmDropDown",
  component: AlarmDropDown,
  argTypes: {
    unReadAlarmCount: {
      defaultValue: GENERATED_SELF_INTRODUCTION.filter(data => !data.viewed).length,
      control: "number"
    },
    data: {
      defaultValue: GENERATED_SELF_INTRODUCTION
    }
  }
} as ComponentMeta<typeof AlarmDropDown>;

const Template: ComponentStory<typeof AlarmDropDown> = args => <AlarmDropDown {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
