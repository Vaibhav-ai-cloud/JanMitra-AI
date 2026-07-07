"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Countdown timer hook for OTP resend.
 * Returns `{ seconds, isActive, start, reset }`.
 */
export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = () => {
    clear();
    setSeconds(initialSeconds);
    setIsActive(true);
  };

  const reset = () => {
    clear();
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    if (!isActive) return;
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clear();
          setIsActive(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return clear;
  }, [isActive]);

  return { seconds, isActive, start, reset };
}
