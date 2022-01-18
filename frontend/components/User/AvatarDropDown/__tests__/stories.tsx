import AvatarDropDown from "@/components/User/AvatarDropDown";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "AvatarDropDown",
  component: AvatarDropDown,
  argTypes: {
    isOpen: {
      defaultValue: true,
      control: {
        type: "boolean"
      }
    },
    profileImage: {
      defaultValue: "/profile_default.png"
    }
  }
} as ComponentMeta<typeof AvatarDropDown>;

const Template: ComponentStory<typeof AvatarDropDown> = args => <AvatarDropDown {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
