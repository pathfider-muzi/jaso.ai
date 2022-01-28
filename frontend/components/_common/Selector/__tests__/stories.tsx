import MAJOR_LIST from "@/constants/majorList";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Selector from "..";

export default {
  title: "Selector/Selector",
  component: Selector,
  argTypes: {
    defaultValue: {
      defaultValue: MAJOR_LIST[0]
    },
    label: {
      defaultValue: "학과"
    },
    isRequired: {
      defaultValue: true
    },
    data: {
      defaultValue: MAJOR_LIST
    },
    onChange: {
      defaultValue: () => {}
    }
  }
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = args => <Selector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
