import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import RecommendedAnswer from "..";

export default {
  component: RecommendedAnswer,
  argTypes: {}
} as ComponentMeta<typeof RecommendedAnswer>;
const Template: ComponentStory<typeof RecommendedAnswer> = args => (
  <RecommendedAnswer answer="저는 의사결정 시 준비단계를 중요하게 생각합니다. 준비가 미흡하여 만들어진 추상적이고 애매한 의사결정은 이후 해결해야 하는 모든 과제에 악영향을 끼치기 마련입니다. 따라서 첫 시작부터 세밀한 분석으로 실현 가능한 의사결정을 해야만 합니다. 준비단계를 소홀히 하여 일이 진행될 경우 그 영향은 일이 끝날 때까지 미치기 때문입니다.  평소에 전공시험을 준비하거나 자격증을 준비할 때에도 준비단계를 철저히 하고 시작하는 편입니다. 나에게 가장 맞는 서적을 마련하고 적정한 기간과 공부시간대를 계획하여 정해진 틀에서 공부하는 편입니다. 경험상 준비단계를 소홀히 하면 일의 진행에 항상 차질이 있었습니다."></RecommendedAnswer>
);

export const Primary = Template.bind({});
Primary.args = {};
