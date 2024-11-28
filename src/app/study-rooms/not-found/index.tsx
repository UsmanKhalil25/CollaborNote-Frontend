import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function StudyRoomNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen bg-black">
      <h1 className="text-8xl font-bold text-white transform transition duration-300 hover:scale-110">
        Room does not exist
      </h1>
      <p className="text-lg text-gray-500 mt-4">
        Either the room has finished or the room ID is not valid
      </p>
      <Button
        className="mt-4"
        onClick={() => {
          navigate("/");
        }}
      >
        Return to dashboard
      </Button>
    </div>
  );
}
