import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import CardList from "..";

export default {
  title: "CardList",
  component: CardList,
  argTypes: {}
} as ComponentMeta<typeof CardList>;

const Template: ComponentStory<typeof CardList> = args => <CardList {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
