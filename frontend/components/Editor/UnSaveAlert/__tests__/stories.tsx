import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import UnSaveAlert from "..";

export default {
  component: UnSaveAlert,
  argTypes: {
    saveIntroduction: {
      defaultValue: () => {}
    }
  }
} as ComponentMeta<typeof UnSaveAlert>;
const Template: ComponentStory<typeof UnSaveAlert> = args => <UnSaveAlert {...args}></UnSaveAlert>;

export const Primary = Template.bind({});
Primary.args = {};
