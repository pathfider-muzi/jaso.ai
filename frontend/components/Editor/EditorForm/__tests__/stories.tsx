import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import EditorForm from "..";

export default {
  title: "EditorForm/EditorForm",
  component: EditorForm,
  argTypes: {
    defaultTitle: {
      defaultValue: "이것은 자기소개서 제목"
    },
    defaultQuestion: {
      defaultValue: "이것은 자기소개서 문항"
    },
    defaultAnswer: {
      defaultValue: "이것은 자기소개서 답변"
    }
  }
} as ComponentMeta<typeof EditorForm>;

const Template: ComponentStory<typeof EditorForm> = args => <EditorForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
