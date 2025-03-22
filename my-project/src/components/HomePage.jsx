import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [resume, setResume] = useState(null);
  const [qna, setQna] = useState({ question: "", answer: "" });
  const [qnaList, setQnaList] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      toast.success("Resume uploaded successfully!");
    }
  };

  const handleQnaSubmit = () => {
    if (!qna.question || !qna.answer) {
      toast.error("Both question and answer are required!");
      return;
    }
    setQnaList([...qnaList, qna]);
    setQna({ question: "", answer: "" });
    toast.success("QnA added!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col items-center p-6 ${
        darkMode ? "bg-[#0a192f] text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold">
        Welcome, {user?.name || "Guest"}! 🎉
      </h1>
      <p className="text-lg italic mt-2">
        "
        {
          [
            "Keep pushing forward!",
            "Code your dreams!",
            "Success is a journey!",
          ][Math.floor(Math.random() * 3)]
        }
        "
      </p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </motion.button>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold">💡 Skills-Based QnA</h2>
        <input
          type="text"
          placeholder="Enter Question"
          className="w-full p-2 mt-2 border rounded"
          value={qna.question}
          onChange={(e) => setQna({ ...qna, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter Answer"
          className="w-full p-2 mt-2 border rounded"
          value={qna.answer}
          onChange={(e) => setQna({ ...qna, answer: e.target.value })}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-lg"
          onClick={handleQnaSubmit}
        >
          Add QnA
        </motion.button>
        <ul className="mt-4">
          {qnaList.map((item, index) => (
            <li key={index} className="p-2 border rounded mt-2">
              <strong>Q:</strong> {item.question} <br />
              <strong>A:</strong> {item.answer}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold">📄 Resume Upload & Edit</h2>
        <input
          type="file"
          className="w-full p-2 border rounded mt-2"
          onChange={handleResumeUpload}
        />
        {resume && (
          <div className="mt-3 p-2 border rounded">
            <p>Uploaded: {resume.name}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mt-2 bg-green-500 text-white px-6 py-2 rounded-lg"
              onClick={() => setResume(null)}
            >
              Edit Resume
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;
