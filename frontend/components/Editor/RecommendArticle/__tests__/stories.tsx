import SELF_INTRODUCTION_ARTICLE_INFO from "@/constants/selfIntroductionArticleInfo";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import RecommendArticle from "..";

export default {
  title: "Editor/RecommendArticle",
  component: RecommendArticle,
  argTypes: {
    link: {
      defaultValue: SELF_INTRODUCTION_ARTICLE_INFO[0].link
    },
    title: {
      defaultValue: SELF_INTRODUCTION_ARTICLE_INFO[0].title
    }
  }
} as ComponentMeta<typeof RecommendArticle>;
const Template: ComponentStory<typeof RecommendArticle> = args => <RecommendArticle {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
