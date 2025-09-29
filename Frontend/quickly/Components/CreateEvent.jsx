import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../Utils/api.js";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  Clock,
  FileText,
  Rocket,
  LucideSparkles,
  LocationEdit,
  ClipboardPlusIcon,
} from "lucide-react";
import { motion, transform } from "framer-motion";

function CreateEvent() {
  const bgStyle = {
    background: `url("/images/CreateEvent1.jpg") no-repeat center center fixed `,
    backgroundSize: "100% 100%",
    position: "fixed",

    minHeight: "100vh",
    height: "100vh",
    filter: "blur(8px)",
    width: "100%",

    margin: "0px",
    padding: "0px",
  };
  const navigate = useNavigate();
  useEffect(() => {
    async function getUser() {
       try {
    await api.get("/getUser"); 
   
    } catch (error) {
      console.log(error);
      toast.error("Unauthorized");
         navigate("/Hero");
    }
  };

  
   
    getUser();
  }, []);

  const [Title, setTitle] = useState("");
  const [DateAndTime, setDateAndTime] = useState("");
  const [Description, setDescription] = useState("");
  const [Location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/event", {
        Title,
        DateAndTime,
        Description,
        Location,
      });
      toast.success("Event Created");
      setDateAndTime("");
      setTitle("");
      setLocation("");
      setDescription("");
      console.log(res.data);
    } catch (error) {
      console.log("error is:", error);
      toast.error(
        `Event Creation Failed. Please try again!:, ${error.message}`
      );
    }
  };
  return (
    <div>
      <div className="relative w-full flex items-center justify-center p-6  min-h-screen overflow-hidden">
        <div style={bgStyle}></div>
       
        <motion.div
          className="relative z-10 bg-white/30 max-w-5xl p-8 mx-auto rounded-3xl shadow-md w-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl mb-3 flex items-center text-cyan-700  font-bold">
            {" "}
            <LucideSparkles className="text-cyan-700    mr-2 mt-1 h-5 w-5" />
            Create your event!
          </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
  <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:gap-4">
    {/* Event Title */}
    <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
      <Tag className="text-cyan-700 mr-2 h-5 w-5 shrink-0" />
      <input
        type="text"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        className="text-lg border p-2 rounded-md text-cyan-700 w-full md:w-56"
        required
      />
    </div>

    {/* Event Location */}
    <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
      <LocationEdit className="text-cyan-700 mr-2 h-5 w-5 shrink-0" />
      <input
        type="text"
        value={Location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Event Location"
        className="text-lg border p-2 rounded-md text-cyan-700 w-full md:w-56"
        required
      />
    </div>

    {/* Event Date & Time */}
    <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
      <Clock className="text-cyan-700 mr-2 h-5 w-5 shrink-0" />
      <input
        type="datetime-local"
        value={DateAndTime}
        onChange={(e) => setDateAndTime(e.target.value)}
        className="text-lg border p-2 rounded-md text-cyan-700 w-full md:w-64"
        required
      />
    </div>

    {/* Event Description */}
    <div className="flex items-start w-full md:w-auto">
      <FileText className="text-cyan-700 mr-2 h-5 w-5 shrink-0 mt-2" />
      <textarea
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
        rows={2}
        className="text-lg border p-2 rounded-md text-cyan-700 w-full md:w-72"
      />
    </div>
  </div>

  {/* Submit button */}
  <button
    type="submit"
    className="flex items-center justify-center w-full md:w-auto text-pink-200 transition duration-300 opacity-85 bg-gradient-to-r from-orange-600 to-pink-600 px-5 py-3 rounded-lg hover:opacity-100"
  >
    <Rocket className="text-pink-300 mr-2 h-5 w-5" />
    Submit
  </button>
</form>

        </motion.div>
       
      </div>
    </div>
  );
}

export default CreateEvent;
