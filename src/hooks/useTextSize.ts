import { useCallback, useEffect, useState } from "react";

export type TextSize = "normal" | "large" | "xlarge";

const STORAGE_KEY = "golpe-no-golpe:text-size";
const ORDER: TextSize[] = ["normal", "large", "xlarge"];
const LABEL: Record<TextSize, string> = {
  normal: "Padrão",
  large: "Grande",
  xlarge: "Muito grande",
};

function applyToDocument(size: TextSize) {
  if (size === "normal") {
    document.documentElement.removeAttribute("data-text-size");
  } else {
    document.documentElement.setAttribute("data-text-size", size);
  }
}

export function useTextSize() {
  const [size, setSize] = useState<TextSize>(() => {
    if (typeof window === "undefined") return "normal";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "large" || stored === "xlarge" ? stored : "normal";
  });

  useEffect(() => {
    applyToDocument(size);
    window.localStorage.setItem(STORAGE_KEY, size);
  }, [size]);

  const cycle = useCallback(() => {
    setSize((current) => ORDER[(ORDER.indexOf(current) + 1) % ORDER.length]);
  }, []);

  return { size, label: LABEL[size], cycle };
}
