import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay: number, enabled: boolean = true) {
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    let id: any;

    if (enabled && delay !== null) {
      id = setInterval(tick, delay);
    }

    return () => clearInterval(id);
  }, [delay, enabled]);
}
