import KakaoLoginButton from "@/components/_common/LoginButton/KakaoLoginButton";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "Button/KakaoLoginButton",
  component: KakaoLoginButton,
  argTypes: {},
} as ComponentMeta<typeof KakaoLoginButton>;

const Template: ComponentStory<typeof KakaoLoginButton> = (args) => (
  <KakaoLoginButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
