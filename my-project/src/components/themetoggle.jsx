import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button
      className="absolute top-5 right-5 p-2 rounded-full bg-gray-700 text-white"
      onClick={() => dispatch(toggleTheme())}
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
