import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Editor from "..";

export default {
  title: "EditorForm/Editor",
  component: Editor,
  argTypes: {}
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = args => (
  <Editor
    selfIntroduction={{
      id: 1,
      title: "제목없음",
      organisationName: "회사명",
      role: "역할",
      createdDate: new Date(),
      updatedDate: new Date()
    }}
  />
);

export const Primary = Template.bind({});
Primary.args = {};
