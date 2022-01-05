import * as React from "react";
import App from "../App";

export default {
  component: App,
  title: "App",
};

//👇 We create a “template” of how args map to rendering
const Template = (args: any) => <App {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
