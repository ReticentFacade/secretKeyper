import { useForm } from "react-hook-form";
import AuthService from "./Auth/auth.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // custom validation rule that checks whether re-entered password matches the original.
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("Form registration data: " + JSON.stringify(data));
    try {
      const response = await AuthService.register(
        data.name,
        data.username,
        data.email,
        data.password
      );
      // console.log(response);
      if (response.status === 201) {
        console.log("Registration successful!");
        // Redirect to homepage
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Registration failed: ", error.response.data);
    }
  };

  const password = watch("password") || ""; // Watching the "Password" input

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-2xl font-bold mb-10">Register</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">Name</label>
          <input
            name="name"
            className="m-2 p-2 border border-gray-300 rounded bg-transparent"
            type="text"
            placeholder="Name"
            required
            {...register("name", {
              required: true,
              maxLength: 40,
              //   pattern: /name/i,
            })}
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">Username</label>
          <input
            name="username"
            className="m-2 p-2 border border-gray-300 rounded bg-transparent"
            type="text"
            placeholder="Username"
            required
            {...register("username", {
              required: true,
              maxLength: 20,
              //   pattern: /username/i,
            })}
          />
        </div>

        <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">Email</label>
          <input
            name="email"
            className="m-2 p-2 border border-gray-300 rounded bg-transparent"
            type="email"
            placeholder="Email"
            required
            {...register("email", {
              required: true,
              //   pattern: /email@example.com/i,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i,
            })}
          />
        </div>

        <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">Password</label>
          <input
            className="m-2 p-2 border border-gray-300 rounded bg-transparent ... invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            // pattern=".{7,}"
            type="password"
            placeholder="Password"
            required
            {...register("password", {
              required: true,
              maxLength: 10,
              //   pattern: /password/i,
            })}
          />
        </div>
        <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">
            Re-enter Password
          </label>
          <input
            name="password"
            className="m-2 p-2 border border-gray-300 rounded bg-transparent ... invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            type="password"
            placeholder="Re-enter Password"
            required
            {...register("reenterPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match!",
            })}
          />
          {errors.reenterPassword && (
            <span className="mt-2 text-sm text-red-500">
              {errors.reenterPassword.message}
            </span>
          )}
          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            <br />
            Please make sure both passwords match
          </span>
        </div>

        {/* <div className="flex items-center justify-center mb-4">
          <label className="mb-1 mr-2 flex-shrink-0 w-20">Mobile Number</label>
          <input
            name="mobileNumber"
            className="m-2 p-2 border border-gray-300 rounded bg-transparent"
            type="tel"
            placeholder="Mobile number"
            {...register("mobileNumber", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
        </div> */}

        <input
          type="submit"
          className="m-2 p-2 btn text-white cursor-pointer w-1/2 rounded"
          value="Register"
        />
      </form>
    </div>
  );
};

export default Register;
