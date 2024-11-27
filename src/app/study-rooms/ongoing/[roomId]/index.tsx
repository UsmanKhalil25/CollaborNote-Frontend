import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";
import { Excalidraw } from "@excalidraw/excalidraw";
import {
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { Button } from "@/components/ui/button";
import ExcalidrawMainMenu from "@/components/ExcalidrawMainMenu";
import CollabrationCard from "@/components/CollaborationCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const useWebSocket = (onDataReceived: (data: any) => void) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket("ws://localhost:8000/ws/collaboration");

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]); // Append received messages

      // Call the callback function to handle received data
      onDataReceived(data);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current?.close(); // Close the WebSocket connection on component unmount
    };
  }, [onDataReceived]);

  return { sendMessage, messages };
};

export default function OngoingStudyRoomPage() {
  const INITIAL_BACKGROUND_COLOR: string = "#f8f9fa";
  const EXCALIDRAW_INITIAL_DATA: ExcalidrawInitialDataState = {
    appState: {
      viewBackgroundColor: INITIAL_BACKGROUND_COLOR,
    },
  };

  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const handleReceivedData = (data: readonly ExcalidrawElement[]) => {
    console.log("received data: ", data);

    if (Array.isArray(data) && data.length > 0) {
      excalidrawAPI?.updateScene({ elements: data });
    }
  };

  const { sendMessage } = useWebSocket(handleReceivedData);

  const debounceTimeoutRef = useRef<number | null>(null);

  const handleChange = (data: readonly ExcalidrawElement[]) => {
    console.log("Data sending: ", data);
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = window.setTimeout(() => {
      sendMessage(JSON.stringify(data));
    }, 300);
  };

  return (
    <div className="h-screen relative">
      <Excalidraw
        theme="dark"
        initialData={EXCALIDRAW_INITIAL_DATA}
        isCollaborating={true}
        onChange={handleChange}
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
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
