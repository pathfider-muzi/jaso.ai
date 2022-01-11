import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import PersonalInformation from "..";

export default {
  title: "PersonalInformation",
  component: PersonalInformation,
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof PersonalInformation>;

const Template: ComponentStory<typeof PersonalInformation> = () => (
  <PersonalInformation />
);

export const Primary = Template.bind({});
Primary.args = {
  size: "md",
  src: "/profile_default.png",
};
