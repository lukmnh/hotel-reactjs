import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AddRoom from "./components/room/AddRoom";
import EditRoom from "./components/room/EditRoom";
import RoomAvailable from "./components/room/RoomAvailable";

function App() {
  return (
    <>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<EditRoom />} />
            <Route path="/room-available" element={<RoomAvailable />} />
            <Route path="/add-room" element={<AddRoom />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
