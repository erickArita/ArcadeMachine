import { useEffect, useRef } from "react";

type TUseInterval = {
  callback: () => void;
  delay?: number;
  stop?: boolean;
};

export const useInterval = ({ callback, delay = 1000, stop }: TUseInterval) => {
  const intervalRef = useRef<number>(undefined);
  useEffect(() => {
    if (!intervalRef.current && !stop) {
      intervalRef.current = setInterval(callback, delay);
    }

    if (intervalRef.current && stop) {
      clearInterval(intervalRef.current as number);
      intervalRef.current = undefined;
    }
  }, [callback, delay, stop]);
};
