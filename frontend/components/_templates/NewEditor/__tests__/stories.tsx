import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import NewEditor from "..";

export default {
  title: "NewEditorForm/NewEditor",
  component: NewEditor,
  argTypes: {}
} as ComponentMeta<typeof NewEditor>;

const Template: ComponentStory<typeof NewEditor> = args => (
  <NewEditor
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
