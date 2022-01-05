import * as React from "react";
import SpeechBubble, { Props } from "../components/SpeechBubble";

export default {
  component: SpeechBubble,
  title: "SpeechBubble",
};

const Template = (args: Props) => <SpeechBubble {...args} />;

export const Primary = Template.bind({});
