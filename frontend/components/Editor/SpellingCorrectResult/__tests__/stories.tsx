import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import SpellingCorrectResult from "..";
import { JASO_TEXT_1 } from "./__fixtures__/jasoText";

export default {
  title: "Editor/SpellingCorrectResult",
  component: SpellingCorrectResult,
  argTypes: {
    text: {
      defaultValue: JASO_TEXT_1,
      control: {
        type: "text"
      }
    }
  }
} as ComponentMeta<typeof SpellingCorrectResult>;

const Template: ComponentStory<typeof SpellingCorrectResult> = args => <SpellingCorrectResult {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
