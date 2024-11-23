import { ReactNode } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import useParentHeight from "@/hooks/use-parent-height";

interface ScrollableContainerProps {
  children: ReactNode;
}

export function ScrollableContainer({ children }: ScrollableContainerProps) {
  const { parentRef, parentHeight } = useParentHeight();

  const getHeight = () => {
    return parentHeight ? parentHeight : 288;
  };

  return (
    <div ref={parentRef} className="h-full w-full">
      <ScrollArea className="overflow-y-auto " style={{ height: getHeight() }}>
        <div className="flex flex-col gap-2 p-4 pt-0 ">{children}</div>
      </ScrollArea>
    </div>
  );
}
