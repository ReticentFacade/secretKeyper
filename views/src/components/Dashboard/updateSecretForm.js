import { useForm } from "react-hook-form";

const UpdateSecretForm = ({ onClose, onSubmit }) => {
  //   const username = localStorage.getItem("user");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const websitePattern = /^.*\.com$/;
    if (!websitePattern.test(data.website)) {
      // Alert:
      alert("Website must be in the correct format: *.com");
      return;
    }

    // Check if the password meets the specified criteria
    const passwordPattern =
      /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;
    if (!passwordPattern.test(data.newPassword)) {
      // Show a warning or alert for password criteria
      alert(
        `New Password must contain: 
        At least one special character,
        One capital letter,
        One small letter,
        One number.
        Minimum length: 7`
      );
      return;
    }

    onSubmit(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="text-md font-bold"
      >
        <input
          className="m-2 p-2 border border-gray-300 rounded bg-transparent"
          type="text"
          placeholder="Website"
          pattern="*.com"
          {...register("website", { required: true })}
        />
        <input
          className="m-2 p-2 border border-gray-300 rounded bg-transparent"
          type="password"
          placeholder="New Password"
          // pattern=""
          {...register("newPassword", { required: true })}
        />

        <div className="py-2 px-2 flex justify-start">
          <button
            type="submit"
            className="mr-2 p-2 btn text-white cursor-pointer rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 p-2 btn text-white cursor-pointer rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSecretForm;
