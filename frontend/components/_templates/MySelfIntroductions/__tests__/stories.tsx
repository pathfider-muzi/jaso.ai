import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MySelfIntroductions from "..";

export default {
  title: "Pages/MySelfIntroductions",
  component: MySelfIntroductions,
  argTypes: {}
} as ComponentMeta<typeof MySelfIntroductions>;

const Template: ComponentStory<typeof MySelfIntroductions> = args => <MySelfIntroductions {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
