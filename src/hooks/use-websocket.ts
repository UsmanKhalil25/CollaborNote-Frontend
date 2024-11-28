import { useEffect, useRef, useState } from "react";

export const useWebSocket = (
  onDataReceived: (data: any) => void,
  url: string
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (data: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const jsonData = JSON.stringify(data);
      socketRef.current.send(jsonData);
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.close();
    }

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
      onDataReceived(data);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url, onDataReceived]);

  return { sendMessage, messages };
};
