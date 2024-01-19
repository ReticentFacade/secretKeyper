import { useState } from "react";
import instance from "../../api_instance.js";
import UpdateSecretForm from "./updateSecretForm.js";

const UpdateSecret = () => {
  const [showForm, setShowForm] = useState(false);

  const handleUpdateClick = () => {
    console.log("handleUpdateClick called");
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (data) => {
    console.log("handleUpdateClick called");
    const storedToken = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    console.log("Token: " + JSON.stringify(storedToken));
    console.log("User: " + JSON.stringify(username));

    // PUT request:
    const putEndpoint = `/credentials/updateCredentials`;
    const requestData = {
      username: username,
      website: data.website,
      newPassword: data.newPassword,
    };

    await instance
      .put(putEndpoint, requestData)
      .then((response) => {
        // Optional, this is:
        console.log("Successfully updated " + response.data);
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating " + error.message);
      });

    setShowForm(!showForm);
    window.location.reload();
  };
  
  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      <input
        type="submit"
        className="mt-3 mr-2 px-6 py-2 btn text-white cursor-pointer rounded"
        value="Update"
        onClick={handleUpdateClick}
      />
      {showForm && (
        <UpdateSecretForm onClose={handleClose} onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default UpdateSecret;
