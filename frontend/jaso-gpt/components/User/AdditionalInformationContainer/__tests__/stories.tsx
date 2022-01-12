import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AdditionalInformationContainer from "..";

export default {
  title: "AdditionalInformationContainer ",
  component: AdditionalInformationContainer,
  argTypes: {},
} as ComponentMeta<typeof AdditionalInformationContainer>;

const Template: ComponentStory<typeof AdditionalInformationContainer> = (
  args
) => <AdditionalInformationContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: "md",
  src: "/profile_default.png",
};
