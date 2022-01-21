import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TipRecommend from "..";

export default {
  title: "Editor/TipRecommend",
  component: TipRecommend,
  argTypes: {}
} as ComponentMeta<typeof TipRecommend>;
const Template: ComponentStory<typeof TipRecommend> = args => (
  <TipRecommend link="https://wonny.space/writing/work/engineer-resume" title="자기소개서 쓰는 법"></TipRecommend>
);

export const Primary = Template.bind({});
Primary.args = {};
