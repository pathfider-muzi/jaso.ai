import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PageMark from "..";

export default {
  title: "PageMark",
  component: PageMark,
  argTypes: {
    color: {
      options: ["blue", "red"],
    },
    number: {},
  },
} as ComponentMeta<typeof PageMark>;

const Template: ComponentStory<typeof PageMark> = (args) => {
  return <PageMark {...args} />;
};

export const Primary = Template.bind({});

Primary.args = {
  color: "red",
  number: 1,
  textColor: "white",
};
