import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import AdditionalInfoAlertModal from "..";

export default {
  title: "Modal/AdditionalInfoAlertModal",
  component: AdditionalInfoAlertModal,
  argTypes: {
    isOpen: {
      defaultValue: true,
      control: {
        type: "boolean"
      }
    },

    onClose: {
      defaultValue: () => {}
    }
  }
} as ComponentMeta<typeof AdditionalInfoAlertModal>;

const Template: ComponentStory<typeof AdditionalInfoAlertModal> = args => <AdditionalInfoAlertModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
