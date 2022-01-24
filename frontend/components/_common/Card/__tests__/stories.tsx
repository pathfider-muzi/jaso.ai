import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Card from "..";

export default {
  title: "Card",
  component: Card,
  argTypes: {
    text: {
      defaultValue: "우아한형제들 자기소개서"
    }
  }
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
