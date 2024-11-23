import { useState, useEffect, useRef } from "react";

export default function useParentHeight() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [parentHeight, setParentHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (parentRef.current) {
        setParentHeight(parentRef.current.clientHeight);
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return { parentRef, parentHeight };
}
