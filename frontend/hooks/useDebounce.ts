import { useState } from "react";

interface Props {
  callback: () => void;
  delayMs: number;
}

const useDebounce = ({ callback, delayMs }: Props) => {
  const [timeId, setTimeId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = () => {
    if (timeId) {
      clearTimeout(timeId);
      setTimeId(null);
    }

    const newTimeId = setTimeout(() => {
      callback();
    }, delayMs);

    setTimeId(newTimeId);
  };

  return debouncedCallback;
};

export default useDebounce;
