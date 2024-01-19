import { useForm } from "react-hook-form";

const DeleteSecretForm = ({ onClose, onSubmit }) => {
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

export default DeleteSecretForm;
