import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../Utils/api";
import { Clipboard, LogOut, Sparkles, Sparkle } from "lucide-react";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  function createEvent() {
    navigate("/createEvent");
  }
  function eventList() {
    navigate("/myEvents");
  }

  async function handleLogout() {
    try {
      const res = await api.post("/logout");

      if (res.data.message === "Logged out") {
        navigate("/Hero");
        toast.success("Logged Out Successfully!");
      }
    } catch (error) {
      toast.error("Logout unsuccessful", error.message);
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-transparent m-4 px-4 py-3">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-end  space-x-6">
        <button
          className="text-pink-100 flex items-center duration-300 bg-gradient-to-r from-fuchsia-600 to-rose-600 px-4 py-4 rounded-lg hover:scale-105 transition"
          onClick={createEvent}
        >
          <Sparkle className="text-pink-300 mr-2 h-5 w-5" /> Create Event
        </button>
        <button
          className="text-pink-100 flex items-center duration-300 bg-gradient-to-r from-red-600 to-orange-600 px-4 py-4 rounded-lg hover:scale-105 transition"
          onClick={eventList}
        >
          <Sparkles className="text-pink-300 mr-2 h-5 w-5" /> My Events
        </button>
        <button
          onClick={handleLogout}
          className="text-pink-100 flex items-center duration-300 bg-gradient-to-r from-rose-600 to-red-700 px-4 py-4 rounded-lg hover:scale-105 transition"
        >
          <LogOut className="text-amber-100 mr-2 h-5 w-5" /> Logout
        </button>
      </div>

      {/* Mobile Navbar */}
      <div className="flex flex-col gap-3 md:hidden mt-2">
        <button
          className="w-full text-pink-100 flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-rose-600 px-4 py-2 rounded-lg hover:opacity-90"
          onClick={createEvent}
        >
          <Sparkle className="text-pink-300 mr-2 h-5 w-5" /> Create Event
        </button>
        <button
          className="w-full text-pink-100 flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg hover:opacity-90"
          onClick={eventList}
        >
          <Sparkles className="text-pink-300 mr-2 h-5 w-5" /> My Events
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-pink-100 flex items-center justify-center bg-gradient-to-r from-rose-600 to-red-700 px-4 py-2 rounded-lg hover:opacity-90"
        >
          <LogOut className="text-amber-100 mr-2 h-5 w-5" /> Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;