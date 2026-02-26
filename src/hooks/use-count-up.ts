"use client";

import { useState, useEffect } from "react";

export function useCountUp(
  end: number,
  duration = 800,
  enabled = true
): number {
  const [count, setCount] = useState(enabled ? 0 : end);

  useEffect(() => {
    if (!enabled) {
      const id = requestAnimationFrame(() => setCount(end));
      return () => cancelAnimationFrame(id);
    }

    const start = 0;
    const startTime = performance.now();
    let rafId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const value = start + (end - start) * easeOutExpo;
      setCount(Math.round(value));
      if (progress < 1) rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, enabled]);

  return count;
}
