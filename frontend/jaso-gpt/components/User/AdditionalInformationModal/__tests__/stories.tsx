import AdditionalInformationModal from "@/components/User/AdditionalInformationModal";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "Modal/AdditionalInformationModal",
  component: AdditionalInformationModal,
  argTypes: {
    isOpen: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof AdditionalInformationModal>;

const Template: ComponentStory<typeof AdditionalInformationModal> = (args) => (
  <AdditionalInformationModal {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
