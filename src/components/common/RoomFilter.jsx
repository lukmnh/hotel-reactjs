import React, { useState } from "react";

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  // display the room based selected room type
  const handleSelectFilter = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filteredData = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleClearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  // fetch unique room type handle
  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        {" "}
        Filter rooms by type
      </span>
      <select
        className="form-select-filter"
        value={filter}
        onChange={handleSelectFilter}
      >
        <option value={""}>Select a room type to filter</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={String(type)}>
            {String(type)}
          </option>
        ))}
      </select>

      <button
        className="btn btn-clear"
        type="button"
        onClick={handleClearFilter}
      >
        Clear filter
      </button>
    </div>
  );
};

export default RoomFilter;
