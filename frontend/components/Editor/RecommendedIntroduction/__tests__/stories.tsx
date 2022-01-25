import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import RecommendedIntroduction from "..";

export default {
  title: "RecommendedIntroduction",
  component: RecommendedIntroduction,
  argTypes: {
    title: {
      defaultValue: "꿈을 키우기 위해 노력하는 자소서"
    },
    body: {
      defaultValue:
        "보고, 교수님께 직접 찾아가 차트 분석 방법을 배우는 등 다양한 노력을 하였습니다. 그러자 점점 투자의 감을 얻었고 평균 매입단가가 낮아진 상태에서 투자한 종목이 상승세를 띄자 10% 이상의 수익률을 얻게 되었습니다. 그 후 이들 산업의 미래 방향성을 토대로 구체적인 포트폴리오를 작성하였고, 결과적으로 모의투자 ‘1등’이라는 성과를 가져오게 되었습니다."
    },
    tags: {
      defaultValue: ["lg", "언어", "경영"]
    },
    spec: {
      defaultValue: "정처기"
    }
  }
} as ComponentMeta<typeof RecommendedIntroduction>;

const Template: ComponentStory<typeof RecommendedIntroduction> = args => <RecommendedIntroduction {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
