import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../utils/ApiFunction";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const navigate = useNavigate();
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleOnChangeImage = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
    setIsImageChanged(true);
  };

  const handleOnChangeDataRoom = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  const handleReturn = () => {
    navigate("/room-available");
  };

  useEffect(() => {
    const fetchRoomById = async () => {
      setIsLoading(true);
      try {
        const getRoom = await getRoomById(id);
        setRoom(getRoom);
        setImagePreview(getRoom.photo);
      } catch (error) {
        setErrorMessage("failed to fetch Room");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoomById();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await updateRoom(id, room);
      // Check for response data
      if (response) {
        setSuccessMessage("Room updated successfully");
        const updatedRoomData = await getRoomById(id);
        // setRoom(updatedRoomData);
        // setImagePreview(updatedRoomData.photo);
        // Update imagePreview based on whether the image was changed
        if (isImageChanged) {
          // Show new image
          setImagePreview(URL.createObjectURL(room.photo));
        } else {
          // Fallback to updated photo
          setImagePreview(updatedRoomData.photo);
        }
        setTimeout(() => {
          navigate("/room-available");
        }, 3000);
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      // Provide more detailed error message
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // setIsLoading(true);
  return (
    <section className="container mt-5 mb-5">
      {isLoading ? (
        <p>Loading, please wait...</p>
      ) : (
        <>
          {successMessage && (
            <div className="alert alert-success show fade">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger show fade">{errorMessage}</div>
          )}
          <div className="row justify-content-center">
            <div className="col-md-4 col-lg-6">
              <h2 className="mt-5 mb-3">Edit Room</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="roomType">
                    Room Type:
                  </label>
                  <input
                    type="text"
                    id="roomType"
                    className="form-control"
                    name="roomType"
                    value={room.roomType}
                    onChange={handleOnChangeDataRoom}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="roomPrice">
                    Room Price:
                  </label>
                  <input
                    type="number"
                    id="roomPrice"
                    className="form-control"
                    name="roomPrice"
                    value={room.roomPrice}
                    onChange={handleOnChangeDataRoom}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="photo" className="form-label hotel-color">
                    Photo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="photo"
                    name="photo"
                    onChange={handleOnChangeImage}
                  />
                  {imagePreview ? (
                    <img
                      src={`data:image/jpeg;base64,${imagePreview}`}
                      alt="Room preview"
                      style={{ maxWidth: "400px", maxHeight: "400" }}
                      className="mt-3"
                    />
                  ) : (
                    <p>Image not availabe</p>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button onClick={handleReturn} type="button">
                    Return
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default EditRoom;
