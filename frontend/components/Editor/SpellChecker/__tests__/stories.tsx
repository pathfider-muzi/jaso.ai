import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SpellChecker from "..";

export default {
  title: "SpellChecker",
  component: SpellChecker,
  argTypes: {
    defaultText: {
      defaultValue: "그건 안되",
      control: {
        type: "text"
      }
    }
  }
} as ComponentMeta<typeof SpellChecker>;

const Template: ComponentStory<typeof SpellChecker> = args => <SpellChecker {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
