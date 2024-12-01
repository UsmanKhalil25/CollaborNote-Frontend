import { useRef, useState, useEffect, useContext } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

import { IStudyRoomDetail } from "@/types/study-room";
import ExcalidrawMainMenu from "@/components/ExcalidrawMainMenu";
import { AuthContext } from "@/auth/auth-context";
import { RoomTopLeftUI } from "@/components/RoomTopLeftUI";

interface IStudyRoomSocketResponse {
  type: string;
  data: {
    content: ExcalidrawElement[];
    editorId: string;
    studyRoomId: string;
  };
}

const INITIAL_BACKGROUND_COLOR: string = "#f8f9fa";
const EXCALIDRAW_INITIAL_DATA: ExcalidrawInitialDataState = {
  appState: {
    viewBackgroundColor: INITIAL_BACKGROUND_COLOR,
  },
};

export default function StudyRoomOngoingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const lastSentDataRef = useRef<ExcalidrawElement[]>([]);

  const room: IStudyRoomDetail = location.state?.roomData;

  useEffect(() => {
    if (!room) {
      navigate("/not-found");
    }
  }, [room, navigate]);

  useEffect(() => {
    if (!auth?.user?._id) {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
      return;
    }

    if (!websocketRef.current) {
      const socket = new WebSocket(
        `ws://localhost:8000/api/study-rooms/ws?user_id=${auth.user._id}`
      );
      websocketRef.current = socket;

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleReceivedData(data);
      };

      socket.onclose = (event) => {
        console.log("WebSocket closed:", event);
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }
    };
  }, [auth?.user?._id, room?.id]);

  const handleReceivedData = (data: IStudyRoomSocketResponse) => {
    try {
      if (data.data.editorId === auth?.user?._id) {
        console.log("Same data, skipping update");
        return;
      }

      if (
        JSON.stringify(data.data.content) !==
        JSON.stringify(lastSentDataRef.current)
      ) {
        excalidrawAPI?.updateScene({
          elements: data.data.content,
        });
        lastSentDataRef.current = data.data.content;
      }
    } catch (error) {
      console.error("Error parsing received data", error);
    }
  };

  const debounceTimeoutRef = useRef<number | null>(null);

  const sendMessage = (message: any) => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send(JSON.stringify(message));
      lastSentDataRef.current = message.data.content;
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
          study_room_id: room.id,
          content: data,
        },
      };
      sendMessage(obj);
    }, 300);
  };

  if (!room) return null;

  return (
    <div className="h-screen relative">
      <Excalidraw
        theme="dark"
        initialData={EXCALIDRAW_INITIAL_DATA}
        isCollaborating={true}
        onChange={handleChange}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        renderTopRightUI={() => <RoomTopLeftUI room={room} />}
      >
        <ExcalidrawMainMenu />
      </Excalidraw>
    </div>
  );
}
