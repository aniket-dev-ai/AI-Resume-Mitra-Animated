import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signup, login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      (isSignup && (!formData.name || !formData.profession))
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (isSignup) {
      dispatch(signup(formData)).then((res) => {
        if (res.payload) toast.success("Signup Successful!");
      });
    } else {
      dispatch(
        login({ email: formData.email, password: formData.password })
      ).then((res) => {
        if (res.payload) toast.success("Login Successful!");
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center min-h-screen ${
        darkMode ? "bg-[#0a192f] text-white" : "bg-white text-black"
      }`}
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="p-8 shadow-lg rounded-xl w-96"
        style={{
          background: darkMode ? "#112240" : "#f9f9f9",
          color: darkMode ? "black" : "black",
        }}
      >
        <h2
          style={{
            color: darkMode ? "white" : "black",
          }}
          className="text-center text-2xl font-bold mb-4"
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <motion.input
                whileFocus={{ scale: 1.05 }}
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <motion.input
                whileFocus={{ scale: 1.05 }}
                type="text"
                placeholder="Profession"
                className="w-full p-2 border rounded"
                onChange={(e) =>
                  setFormData({ ...formData, profession: e.target.value })
                }
              />
            </>
          )}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-full py-2 rounded text-white font-semibold"
            style={{
              background: darkMode ? "#64ffda" : "#0077ff",
              color: darkMode ? "black" : "white",
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
          </motion.button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <motion.p
          whileHover={{ scale: 1.05 }}
          className="text-center mt-4 cursor-pointer text-blue-400"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;
