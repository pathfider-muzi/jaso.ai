import * as React from "react";
import { executeModel } from "../api";
import useQuery from "../hooks/useQuery";
import Icon from "./Icon";
import SpeechBubble from "./SpeechBubble";

interface Props {
  inputText: string;
}

const ExtensionButton = ({ inputText }: Props) => {
  const [isOpenedSpeechBubble, setIsOpenedSpeechBubble] = React.useState(false);

  const {
    isLoading,
    data: summary,
    refetch: getSummary,
  } = useQuery({
    query: () => executeModel(inputText),
  });

  const onClickIcon = async () => {
    if (!isOpenedSpeechBubble) {
      getSummary();
    }

    setIsOpenedSpeechBubble((state) => !state);
  };

  if (inputText.length === 0) return null;

  return (
    <>
      <Icon onClick={onClickIcon} />
      {isOpenedSpeechBubble && (
        <SpeechBubble text={isLoading ? "로딩중..." : summary || ""} />
      )}
    </>
  );
};

export default ExtensionButton;
