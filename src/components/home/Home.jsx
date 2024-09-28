import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToRoomAvailable = () => {
    navigate("/room-available");
  };
  return (
    <div className="justify-content-center">
      <button onClick={handleNavigateToRoomAvailable}>Room Available</button>
    </div>
  );
};

export default Home;
