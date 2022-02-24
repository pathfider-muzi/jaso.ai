import { useState } from "react";

export const useCopyButton = () => {
  const [isCopyButtonClicked, setIsCopyButtonClicked] = useState(false);

  const onCopy = (script: string) => {
    navigator.clipboard.writeText(script);
    setIsCopyButtonClicked(true);
  };

  return { isCopyButtonClicked, setIsCopyButtonClicked, onCopy };
};
