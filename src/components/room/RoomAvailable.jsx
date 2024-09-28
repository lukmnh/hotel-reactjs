import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import ConfirmationModal from "../layout/ConfirmationModal";
import { deleteRoom, getAllRooms } from "../utils/ApiFunction";

const RoomAvailable = () => {
  const [rooms, setRoom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomPerPage, setRoomPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRoom, setFilteredRoom] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteRoomId, setDeleteRoomId] = useState(null);

  useEffect(() => {
    fetchAllRooms();
  }, []);

  const fetchAllRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRoom(result);
      setFilteredRoom(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRoom(rooms);
    } else {
      const filteredRoom = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRoom(filteredRoom);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  // handle pagination
  const paginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //handle delete roomId using react alert
  // const handleDelete = (roomId) => {
  //   confirmAlert({
  //     title: "Confirm to delete",
  //     message: `Are you sure you want to delete room ${roomId}?`,
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: async () => {
  //           try {
  //             const result = await deleteRoom(roomId);
  //             if (result === "") {
  //               setSuccessMessage(`Room number ${roomId} was deleted.`);
  //               fetchAllRooms();
  //             } else {
  //               setErrorMessage(`Error deleting room: ${result.message}`);
  //             }
  //           } catch (error) {
  //             setErrorMessage(error.message);
  //           }
  //           setTimeout(() => {
  //             setSuccessMessage("");
  //             setErrorMessage("");
  //           }, 3000);
  //         },
  //       },
  //       {
  //         label: "No",
  //         onClick: () => {},
  //       },
  //     ],
  //   });
  // };

  // popup modal alert confirm delete
  const requestDelete = (roomId) => {
    console.log(roomId);
    setDeleteRoomId(roomId);
    setShowModal(true);
  };

  // handle delete using component
  const handleDelete = async () => {
    if (deleteRoomId !== null) {
      console.log("Deleting room ID:", deleteRoomId);
      try {
        const result = await deleteRoom(deleteRoomId);
        if (result === "") {
          setSuccessMessage(`Room number ${deleteRoomId} was deleted.`);
          fetchAllRooms();
        } else {
          setErrorMessage(`Error deleting room: ${result.message}`);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setShowModal(false);
        setDeleteRoomId(null);
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
        }, 10000);
      }
    }
  };

  // calculated the total room
  const calculateTotalRooms = (filteredRoom, roomPerPage, rooms) => {
    const totalRooms =
      filteredRoom.length > 0 ? filteredRoom.length : rooms.length;
    return Math.ceil(totalRooms / roomPerPage);
  };

  const indexOfLastRoom = currentPage * roomPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomPerPage;
  // check current room
  const currentRoom = filteredRoom.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <>
      <div className="container col-md-8 col-lg-6">{}</div>
      {isLoading ? (
        <p>Loading, please wait...</p>
      ) : (
        <section className="mt-5 mb-5 container">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="d-flex justify-content-center mb-3 mt-5">
            <h2>Available Room</h2>
          </div>
          <div className="d-flex justify-content-end">
            <Link to="/add-room" className="btn btn-info">
              Add Room
            </Link>
          </div>
          <Col md={6} className="mb-3 mb-md-0">
            <RoomFilter data={rooms} setFilteredData={setFilteredRoom} />
          </Col>
          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRoom.map((room) => (
                <tr key={room.id} className="text-center">
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className="gap-2">
                    <Link to={`/edit/${room.id}`}>
                      <span className="btn btn-info btn-sm">
                        <FaEye />
                      </span>
                      <span className="btn btn-warning btn-sm">
                        <FaEdit />
                      </span>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => requestDelete(room.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalRooms(filteredRoom, roomPerPage, rooms)}
            onPageChange={paginationClick}
          />
        </section>
      )}
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete room ${deleteRoomId}?`}
      />
    </>
  );
};

export default RoomAvailable;
