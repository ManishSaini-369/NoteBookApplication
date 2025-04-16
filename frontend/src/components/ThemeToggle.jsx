import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/user/userSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user?.theme || "light");

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 border rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition absolute bottom-3 left-3"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
