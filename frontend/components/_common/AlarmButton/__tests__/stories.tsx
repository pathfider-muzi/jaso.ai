import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AlarmButton from "..";

export default {
  title: "AlarmButton",
  component: AlarmButton,
  argTypes: {
    unReadAlarmCount: {
      defaultValue: 8,
      control: "number"
    }
  }
} as ComponentMeta<typeof AlarmButton>;

const Template: ComponentStory<typeof AlarmButton> = args => <AlarmButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
