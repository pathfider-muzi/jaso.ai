import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Modal from "..";
import AdditionalInformation from "@/components/User/AdditionalInformation";

export default {
  title: "Modal",
  component: Modal,
  argTypes: {
    isOpen: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
    title: {
      defaultValue: "제목",
      control: {
        type: "text",
      },
    },
    onClose: {
      defaultValue: () => alert("닫기 버튼 클릭"),
    },
    children: {
      defaultValue: (
        <>
          <AdditionalInformation label="A" value="A" />
        </>
      ),
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
