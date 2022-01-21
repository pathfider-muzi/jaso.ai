import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SelfIntroductionContent from "..";

export default {
  title: "Editor/SelfIntroductionContent",
  component: SelfIntroductionContent,
  argTypes: {
    text: {
      defaultValue: `안녕하세요. 외안되
      
      아버지가방에들어가신다.`
    }
  }
} as ComponentMeta<typeof SelfIntroductionContent>;

const Template: ComponentStory<typeof SelfIntroductionContent> = args => <SelfIntroductionContent {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
