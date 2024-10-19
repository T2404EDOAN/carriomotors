import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInPopup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage loading state
  const navigate = useNavigate();
  const formRef = useRef(null); // Reference to the form element

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    setIsSubmitting(true); // Set loading state

    if (!userName || !password) {
      setErrorMessage("Username and password are required!");
      setIsSubmitting(false); // Reset loading state if validation fails
      return;
    }

    try {
      const response = await axios.post(
        "https://carriomotors.io.vn/api/get_login.php",
        {
          userName: userName,
          password: password,
        }
      );

      if (response.data.success) {
        // Navigate to the admin dashboard on successful login
        navigate("/admin");
      } else {
        setErrorMessage("Invalid username or password!");
      }
    } catch (error) {
      // Handle server errors or network issues
      if (error.response) {
        // Server responded with a status other than 2xx
        setErrorMessage(error.response.data.message || "Server error occurred!");
      } else if (error.request) {
        // Request was made but no response received
        setErrorMessage("Network error, please try again later.");
      } else {
        setErrorMessage("An unexpected error occurred!");
      }
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const handleClose = () => {
    // Reset the form and clear error messages when closing
    setUserName("");
    setPassword("");
    setErrorMessage("");
  };

  // Handle clicking outside of the form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleClose(); // Clear form when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
        ref={formRef} // Attach the ref to the form container
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Display error message if any */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPopup;
