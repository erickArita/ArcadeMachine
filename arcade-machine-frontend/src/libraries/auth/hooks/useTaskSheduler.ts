import { useCallback, useRef } from "react";
import { type ReturnWorker, createWorker } from "../helpers/createWorker";

interface UseTaskSchedulerProps {
  name: string;

  timeMs: number;
}

export function useTaskScheduler({ name, timeMs }: UseTaskSchedulerProps) {
  const workerRef = useRef<ReturnWorker>(undefined);

  const launchTask = useCallback(
    (workerFn: () => string, callbackFn: () => void) => {
      //si ya existe un worker, no hacemos nada.
      if (workerRef.current) {
        workerRef.current.workerRef.postMessage({ exp: timeMs });
        return;
      }
      workerRef.current = createWorker(workerFn);
      workerRef.current.workerRef.postMessage({ exp: timeMs });

      workerRef.current.workerRef.addEventListener("message", (event) => {
        if (event.data.type === name) {
          callbackFn();
        }
      });
    },
    [name, timeMs]
  );

  return launchTask;
}
