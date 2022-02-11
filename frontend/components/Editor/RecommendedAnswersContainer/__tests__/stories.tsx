import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import RecommendedAnswersContainer from "..";

export default {
  component: RecommendedAnswersContainer,
  argTypes: {}
} as ComponentMeta<typeof RecommendedAnswersContainer>;
const Template: ComponentStory<typeof RecommendedAnswersContainer> = args => (
  <RecommendedAnswersContainer></RecommendedAnswersContainer>
);

export const Primary = Template.bind({});
Primary.args = {};
