 import { useCallback, useRef, useTransition } from 'react';
import { useEventListener } from './useEventListener';

const TIMEOUT20Mins = 20 * 60 * 1000;

export const useInactivityObserver = (
  callback: () => Promise<boolean>,
  disable = false,
  timeout = TIMEOUT20Mins
) => {
  const timerId = useRef<number>();
  const [, starTransition] = useTransition();
  const isActivated = useRef(false);
  const initTimer = useCallback(() => {
    timerId.current = setTimeout(async () => {
      isActivated.current = true;
      const isConfirmed = await callback();
      const isNotActive = !isConfirmed;
      isActivated.current = isNotActive;
    }, timeout) as unknown as number;
  }, [callback, timeout]);

  const resetTimer = useCallback(() => {
    clearTimeout(timerId.current);
  }, []);

  const handleUserActivity = useCallback(() => {
    if (disable) return;
    if (isActivated.current) return;
    starTransition(() => {
      resetTimer();
      initTimer();
    });
  }, [disable, initTimer, resetTimer]);

  useEventListener('mousemove', handleUserActivity);
  useEventListener('blur', handleUserActivity);
};
