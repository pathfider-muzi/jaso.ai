import DropDownOption from "@/components/_common/DropDownOption";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import type { Option } from "..";

const options: Option[] = [
  {
    label: "내 정보",
    onClick: () => alert("내 정보 클릭"),
  },
  {
    label: "로그아웃",
    onClick: () => alert("로그아웃 클릭"),
  },
];

export default {
  title: "DropDownOption",
  component: DropDownOption,
  argTypes: {
    options: {
      defaultValue: options,
    },
  },
} as ComponentMeta<typeof DropDownOption>;

const Template: ComponentStory<typeof DropDownOption> = (args) => (
  <DropDownOption {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
