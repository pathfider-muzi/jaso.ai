import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import ToolTip from "..";

export default {
  title: "ToolTip",
  component: ToolTip,
  argTypes: {
    text: {
      defaultValue:
        "회사명으로 예상되는 단어에 하이라이팅 기능을 제공합니다.\n지원하고자 하는 회사와 동일한지 확인해주세요.",
      control: "text"
    },
    direction: {
      defaultValue: "up"
    }
  }
} as ComponentMeta<typeof ToolTip>;

const Template: ComponentStory<typeof ToolTip> = args => <ToolTip {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
