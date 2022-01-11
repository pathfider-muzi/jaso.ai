import EditableAdditionalInformationText from "@/components/User/EditableAdditionalInformationText";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
  title: "EditableAdditionalInformationText",
  component: EditableAdditionalInformationText,
  argTypes: {
    label: {
      defaultValue: "라벨",
      control: {
        type: "text",
      },
    },
    value: {
      defaultValue: "값",
      control: {
        type: "text",
      },
    },
    isRequired: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof EditableAdditionalInformationText>;

const Template: ComponentStory<typeof EditableAdditionalInformationText> = (
  args
) => <EditableAdditionalInformationText {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
