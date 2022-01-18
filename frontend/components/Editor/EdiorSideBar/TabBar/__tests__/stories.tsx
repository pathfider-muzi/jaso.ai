import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import TabBar from "..";

export default {
  component: TabBar,
  argTypes: {},
} as ComponentMeta<typeof TabBar>;
const Template: ComponentStory<typeof TabBar> = (args) => <TabBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
