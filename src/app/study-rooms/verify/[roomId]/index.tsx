import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IStudyRoomDetail } from "@/types/study-room";
import { api } from "@/api";
import { ENDPOINTS } from "@/config/api-config";
import { convertSnakeCaseToCamelCase } from "@/lib/utils";
import { AuthContext } from "@/auth/auth-context.ts";

export default function StudyRoomVerifyPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const auth = useContext(AuthContext);

  const [roomData, setRoomData] = useState<IStudyRoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!roomId) {
      navigate("/not-found");
      return;
    }

    const fetchStudyRoom = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<
          Response<{ study_room: IStudyRoomDetail }>
        >(ENDPOINTS.studyRooms.id(roomId));
        const data = response.data.data.study_room;
        setRoomData(convertSnakeCaseToCamelCase(data));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch study room:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchStudyRoom();
  }, [roomId, navigate]);

  useEffect(() => {
    if (roomData) {
      const userParticipant = roomData.participants.find(
        (participant) => participant.userId === auth?.user?._id
      );
      if (userParticipant && roomData.isActive) {
        navigate(`/study-rooms/ongoing/${roomId}`, { state: { roomData } });
      } else {
        setIsError(true);
      }
    }
  }, [roomData, auth, navigate, roomId]);

  useEffect(() => {
    if (isError) {
      navigate("/study-rooms/not-found");
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center text-center h-screen bg-black">
        <h1 className="text-8xl font-bold text-white transform transition duration-300 hover:scale-110">
          Joining...
        </h1>
        <p className="text-lg text-gray-500 mt-4">
          We are doing some verification
        </p>
      </div>
    );
  }

  return null;
}
