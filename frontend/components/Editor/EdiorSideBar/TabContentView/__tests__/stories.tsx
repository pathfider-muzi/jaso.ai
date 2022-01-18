import { ComponentMeta, ComponentStory } from "@storybook/react";
import TabContentView from "..";

export default {
  component: TabContentView,
  argTypes: {},
} as ComponentMeta<typeof TabContentView>;
const Template: ComponentStory<typeof TabContentView> = () => (
  <TabContentView width={600} height={800}>
    ai 추천
  </TabContentView>
);

export const Primary = Template.bind({});
Primary.args = {};
