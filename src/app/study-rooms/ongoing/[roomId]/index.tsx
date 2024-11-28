import { useRef, useState, useEffect, useContext } from "react";
import { Users } from "lucide-react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ExcalidrawMainMenu from "@/components/ExcalidrawMainMenu";
import InviteAndShareCard from "@/components/InviteAndShareCard";
import { SendInviteDialog } from "@/components/SendInviteDialog";

import { ParticipantOut } from "@/types/participant";
import { AuthContext } from "@/auth/auth-context";

interface IStudyRoomSocketResponse {
  type: string;
  data: {
    content: string;
    editorId: string;
    studyRoomId: string;
  };
}

export default function StudyRoomOngoingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const roomData = location.state?.roomData;

  if (!roomData) {
    navigate("/not-found");
    return null;
  }

  const INITIAL_BACKGROUND_COLOR: string = "#f8f9fa";
  const EXCALIDRAW_INITIAL_DATA: ExcalidrawInitialDataState = {
    appState: {
      viewBackgroundColor: INITIAL_BACKGROUND_COLOR,
    },
  };

  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const websocketRef = useRef<WebSocket | null>(null);

  const handleReceivedData = (data: IStudyRoomSocketResponse) => {
    try {
      const parsedElements = JSON.parse(
        data.data.content
      ) as ExcalidrawElement[];
      if (Array.isArray(parsedElements)) {
        excalidrawAPI?.updateScene({ elements: parsedElements });
      }
    } catch (error) {
      console.error("Error parsing received data", error);
    }
  };

  useEffect(() => {
    if (!auth?.user?._id) return;

    const socket = new WebSocket(
      `ws://localhost:8000/api/study-rooms/ws?user_id=${auth.user._id}`
    );
    websocketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);
      handleReceivedData(data);
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [auth?.user?._id]);

  const debounceTimeoutRef = useRef<number | null>(null);

  const sendMessage = (message: any) => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  };

  const handleChange = (data: readonly ExcalidrawElement[]) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = window.setTimeout(() => {
      const obj = {
        type: "document_update",
        data: {
          study_room_id: roomData.id,
          content: JSON.stringify(data),
        },
      };
      sendMessage(obj);
    }, 200);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0) {
        const navigationEntry = navigationEntries[0];

        if (navigationEntry instanceof PerformanceNavigationTiming) {
          const isReload = navigationEntry.type === "reload";

          if (isReload) {
            console.log("Page is being reloaded");
          } else {
            event.preventDefault();
            event.returnValue =
              "You are about to leave the room. Your progress may not be saved.";
          }
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="h-screen relative">
      <Excalidraw
        theme="dark"
        initialData={EXCALIDRAW_INITIAL_DATA}
        isCollaborating={true}
        onChange={handleChange}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={() => (
          <div className="flex items-center gap-4">
            <InviteAndShareTrigger
              roomId={roomData.id}
              participants={roomData?.participants}
            />
            <SendInviteDialog />
          </div>
        )}
      >
        <ExcalidrawMainMenu />
      </Excalidraw>
    </div>
  );
}

interface InviteAndShareTriggerProps {
  roomId: string;
  participants: ParticipantOut[];
}

function InviteAndShareTrigger({
  roomId,
  participants,
}: InviteAndShareTriggerProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Users className="w-4 h-4 text-mute" />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <InviteAndShareCard roomId={roomId} participants={participants} />
      </PopoverContent>
    </Popover>
  );
}
