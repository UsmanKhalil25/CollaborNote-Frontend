import { useEffect, useRef } from "react";

export const useWebSocket = (
  userId: string,
  roomId: string,
  onMessage: (data: any) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8000/api/study-rooms/ws?user_id=${userId}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket message received:", data);
      onMessage(data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [userId, roomId, onMessage]);

  const sendMessage = (message: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket is not open. Message not sent.");
    }
  };

  return { sendMessage };
};
