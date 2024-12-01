import { useState, useRef, useEffect } from "react";
import { useWebSocket } from "@/hooks/use-web-socket";

export const useWebRTC = (roomId: string, userId: string) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const { sendMessage } = useWebSocket(userId, roomId, async (data) => {
    const peerConnection = peerConnectionRef.current;

    if (!peerConnection || peerConnection.signalingState === "closed") return;

    if (data.type === "offer") {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.data.offer)
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      sendMessage({
        type: "answer",
        data: { answer },
        target_user_id: data.sender_id,
      });
    } else if (data.type === "answer") {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.data.answer)
      );
    } else if (data.type === "ice-candidate") {
      await peerConnection.addIceCandidate(
        new RTCIceCandidate(data.data.candidate)
      );
    }
  });

  useEffect(() => {
    const startConnection = async () => {
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      peerConnectionRef.current = peerConnection;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setLocalStream(stream);

      stream.getTracks().forEach((track) => {
        if (peerConnection.signalingState !== "closed") {
          peerConnection.addTrack(track, stream);
        }
      });

      const remoteStream = new MediaStream();
      peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          remoteStream.addTrack(track);
        });
        setRemoteStream(remoteStream);
      };

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          sendMessage({
            type: "ice-candidate",
            data: { candidate: event.candidate },
          });
        }
      };

      try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        sendMessage({ type: "offer", data: { offer } });
      } catch (error) {
        console.error("Error creating offer", error);
      }
    };

    startConnection();

    return () => {
      const peerConnection = peerConnectionRef.current;
      if (peerConnection && peerConnection.signalingState !== "closed") {
        peerConnection.close();
      }
    };
  }, [roomId, sendMessage]);

  return { localStream, remoteStream };
};
