import { useState } from "react";
import DeleteSecretForm from "./deleteSecretForm.js";
import instance from "../../api_instance.js";

const DeleteSecret = () => {
  const username = localStorage.getItem("user");
  const [showForm, setShowForm] = useState(false);

  const handleDeleteClick = () => {
    console.log("handleDeleteClick called");
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (data) => {
    const deleteEndpoint = `/credentials/deleteCredentials`;
    const requestData = `?username=${username}&website=${data.website}`;
    console.log("deleteEndpoint: " + deleteEndpoint);
    console.log("requestData", requestData);

    try {
      const response = await instance.delete(deleteEndpoint + requestData);
      console.log("response", response);

      if (response.status === 200) {
        console.log(`Deleted website, response.data: ` + response.data);
        window.location.reload();
      } else {
        console.log(`Error deleting website: ${response.statusText}`);
      }
    } catch (error) {
      console.log("Error deleting endpoint: " + error);
    }

    setShowForm(!showForm);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      <input
        type="submit"
        className="mt-3 mr-2 px-6 py-2 btn text-white cursor-pointer rounded"
        value="Delete"
        onClick={handleDeleteClick}
      />
      {showForm && (
        <DeleteSecretForm onClose={handleClose} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default DeleteSecret;
