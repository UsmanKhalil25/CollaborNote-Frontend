import { Users } from "lucide-react";

import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

import { Button } from "@/components/ui/button";

import ExcalidrawMainMenu from "@/components/ExcalidrawMainMenu";
import CollabrationCard from "@/components/CollaborationCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function OngoingStudyRoomPage() {
  const INITIAL_BACKGROUND_COLOR: string = "#f8f9fa";
  const EXCALIDRAW_INITIAL_DATA: ExcalidrawInitialDataState = {
    appState: {
      viewBackgroundColor: INITIAL_BACKGROUND_COLOR,
    },
  };

  const handleChange = (data: readonly ExcalidrawElement[]) => {
    console.log(data);
  };

  return (
    <div className="h-screen relative">
      <Excalidraw
        theme="dark"
        initialData={EXCALIDRAW_INITIAL_DATA}
        isCollaborating={true}
        onChange={handleChange}
        renderTopRightUI={() => <CollabrationTrigger />}
      >
        <ExcalidrawMainMenu />
      </Excalidraw>
    </div>
  );
}

function CollabrationTrigger() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary">
          <Users className="w-4 h-4 text-mute" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <CollabrationCard />
      </PopoverContent>
    </Popover>
  );
}
