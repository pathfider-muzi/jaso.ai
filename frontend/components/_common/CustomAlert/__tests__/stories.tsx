import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import _CustomAlert from "..";

export default {
  component: _CustomAlert,
  argTypes: {
    title: {
      defaultValue: "저장 안하고 사이트 나가시겠습니까?"
    },
    contentNode: {
      defaultValue: (
        <>
          <button>예</button>
          <button>아니오</button>
        </>
      )
    },
    isOpened: {
      defaultValue: true
    }
  }
} as ComponentMeta<typeof _CustomAlert>;
const Template: ComponentStory<typeof _CustomAlert> = args => <_CustomAlert {...args}></_CustomAlert>;

export const Primary = Template.bind({});
Primary.args = {};
