import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AdditionalInformation from "..";

export default {
  title: "AdditionalInformation/AdditionalInformation ",
  component: AdditionalInformation,
  argTypes: {
    label: {
      defaultValue: "라벨"
    },
    value: {
      defaultValue: "값"
    }
  }
} as ComponentMeta<typeof AdditionalInformation>;

const Template: ComponentStory<typeof AdditionalInformation> = args => <AdditionalInformation {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
