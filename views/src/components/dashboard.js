import { useState, useEffect } from "react";
import instance from "../api_instance.js";
import ActionBtn from "./Dashboard/actionBtn.js";
// import ActionBtnDropdown from "./Dashboard/actionBtnDropdown.js";
import CreateSecretForm from "./Dashboard/createSecret.js";
import UpdateSecret from "./Dashboard/updateSecret.js";

const DashboardComponent = () => {
  const storedToken = localStorage.getItem("token");
  const username = localStorage.getItem("user");

  const [credentials, setCredentials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState("");

  useEffect(() => {
    // Fetch credentials on component mount
    if (storedToken && username) {
      const ENDPOINT = `/credentials/getAllCredentials?username=${username}`;
      instance
        .get(ENDPOINT)
        .then((response) => {
          setCredentials(response.data.credentials || []); // Ensuring it's an array :)
        })
        .catch((error) => {
          console.error("Error fetching credentials:", error);
        });
    }
  }, [storedToken, username]);

  const handleAddSecretClick = () => {
    console.log("handleAddSecretClick clicked");
    setShowForm(true);
  };

  const handleCloseForm = () => {
    console.log("Form closed");
    setShowForm(false);
  };

  // This one's for POST requests (for `addCredentials` route):
  const handleSubmitForm = (data) => {
    console.log("handleSubmitForm called", data);
    console.log("Token: " + JSON.stringify(storedToken));
    console.log("User: " + JSON.stringify(username));

    // Sending POST request to add credentials:
    const postEndpoint = `/credentials/addCredentials`;
    const requestData = {
      username: username,
      credentials: {
        website: data.website,
        password: data.password,
      },
    };
    console.log("requestData: " + requestData);

    instance
      .post(postEndpoint, requestData)
      .then((response) => {
        console.log("Credentials added successfully: " + response.data);
        setCredentials([...credentials, response.data.credentials]);
        window.location.href = "/dashboard";
        // window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error adding credentials: " + error.message);
      });

    // After submission, close the form:
    setShowForm(false);
  };

  // Update starts:

  const handleUpdateWebsite = (website) => {
    console.log("handle Update Website called");
    setSelectedWebsite(website);
    console.log("selected Website: " + website);
  };

  // const handleUpdateSecret = (data) => {
  //   try {
  //     console.log("handle Update Secret called");
  //     console.log("handleUpdateSecret's data: ", data);
  //     setShowForm(false);

  //     const putEndpoint = `/credentials/updateCredentials`;
  //     const requestData = {
  //       username: username,
  //       website: selectedWebsite,
  //       newPassword: data.newPassword,
  //     };

  //     instance.put(putEndpoint, requestData).then((response) => {
  //       // Optional, this is:
  //       console.log("Successfully updated " + selectedWebsite);
  //       // window.location.reload();
  //     });
  //     setSelectedWebsite(""); // Resetting selectedWebsite after updating
  //   } catch (error) {
  //     console.error("Error updating secret: " + error.message);
  //   }
  // };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold flex justify-center mt-20 mb-14">
        Dashboard
      </h1>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="py-2 px-2 flex justify-between">
            {/* Search-websites box and Add row button */}
            <div className="relative max-w-sm w-11/12 mr-4">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="px-5 py-2.5 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-gray-50 dark:bg-gray-700 dark:text-white-400 dark:focus:ring-gray-600"
                placeholder="Search Websites..."
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
            <input
              type="submit"
              className="mr-2 px-6 py-2 btn text-white cursor-pointer rounded"
              value="+ Add Secret"
              onClick={handleAddSecretClick}
            />
          </div>
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 pe-0">
                        <div className="flex items-center h-5">
                          <input
                            id="hs-table-search-checkbox-all"
                            type="checkbox"
                            className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          />
                          <label
                            htmlFor="hs-table-search-checkbox-all"
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm font-bold text-gray-500 uppercase"
                      >
                        <h2>Website</h2>
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm font-bold text-gray-500 uppercase"
                      >
                        <h2>Key ↓</h2>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase"
                      >
                        <h2>Action</h2>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {credentials.map((credential, index) => (
                      <tr key={index}>
                        <td className="py-3 ps-4">
                          <div className="flex items-center h-5">
                            <input
                              id={`hs-table-search-checkbox-${index + 1}`}
                              type="checkbox"
                              className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            />
                            <label
                              htmlFor={`hs-table-search-checkbox-${index + 1}`}
                              className="sr-only"
                            >
                              Checkbox
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {credential.website}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {credential.password}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          {/* Choose */}
                          <ActionBtn website={credential.website} />
                          {/* <ActionBtnDropdown */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {showForm ? (
              <CreateSecretForm
                onClose={handleCloseForm}
                onSubmit={handleSubmitForm}
              />
            ) : (
              <>
                <input
                  type="submit"
                  className="mt-3 mr-2 px-6 py-2 btn text-white cursor-pointer rounded"
                  value="+ Add Secret"
                  onClick={handleAddSecretClick}
                />
              </>
            )}
            {/* {selectedWebsite && (
              <UpdateSecret
                // onUpdate={handleUpdateSecret}
                // onClick={() => handleUpdateWebsite(credentials.website)}
                onClose={() => setSelectedWebsite("")}
                // onSubmit={handleUpdateSecret}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
