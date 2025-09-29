import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FileText, Tag, Hash, Edit, Trash, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import api from "../Utils/api";
import toast from "react-hot-toast";

function MyEvents() {  
  
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState({});
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {   await api.get("/getUser"); 
   
        const res = await api.get("/event");
        setEvents(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        
        navigate("/Hero");
      }
    }
    fetchEvents();
  }, []);

  const now = new Date();
  const filteredEvents = events.filter((e) => {
    const eventDate = new Date(e.DateAndTime);
    if (filter === "upcoming") return eventDate > now;
    if (filter === "past") return eventDate < now;
    return true; // all
  });

  async function handleDelete(id) {
    try {
      await api.delete(`/event/${id}`);
      setEvents(events.filter((e) => e._id !== id));
      toast.success("Event deleted");
    } catch (error) {
      toast.error("Sorry couldn't delete");
    }
  }

  async function handleUpdate(id, updatedFields) {
    try {
      const res = await api.put(`/event/${id}`, updatedFields);
      setEvents((prev) =>
        prev.map((e) => (e._id === id ? { ...e, ...res.data } : e))
      );
      toast.success("Event updated!");
      setEditing((prev) => ({ ...prev, [id]: false }));
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to update Event");
    }
  }

  return (
    <div className="border flex flex-col gap-6 min-h-screen p-3 rounded shadow bg-gray-700">
      {events.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center"
        >
          <p className="text-2xl text-gray-200">No Events found!</p>
          <Link
            className="text-yellow-600 ml-2 text-lg mt-2 duration-700 hover:underline"
            to="/createEvent"
          >
            Click Here to Register
          </Link>
        </motion.div>
      ) : (
        <>
        
<div className="flex flex-col sm:flex-row sm:space-x-3 gap-2 mb-4 w-full">
  <button
    className="text-white flex items-center justify-center transition duration-300 
               bg-red-500 px-4 py-2 sm:px-6 sm:py-3.5 border-0 rounded-lg hover:scale-105"
    onClick={() => setFilter("all")}
  >
    All
  </button>
  <button
    className="text-white flex items-center justify-center transition duration-300 
               bg-pink-400 px-4 py-2 sm:px-6 sm:py-3.5 border-0 rounded-lg hover:scale-105"
    onClick={() => setFilter("upcoming")}
  >
    Upcoming
  </button>
  <button
    className="text-white flex items-center justify-center transition duration-300 
               bg-gray-300 px-4 py-2 sm:px-6 sm:py-3.5 border-0 rounded-lg hover:scale-105"
    onClick={() => setFilter("past")}
  >
    Past
  </button>
</div>



          {filteredEvents.map((e) => (
            <div key={e._id}>
              {editing[e._id] ? (
                <div className="bg-gray-200">
                  <label className="text-2xl font-semibold ml-3 text-gray-600 mb-6">
                    Edit Event Title:
                  </label>
                  <input
                    type="text"
                    value={e.Title}
                    className="text-2xl p-1 m-3 border rounded-md text-gray-500"
                    onChange={(event) =>
                      setEvents((prev) =>
                        prev.map((ev) =>
                          ev._id === e._id ? { ...ev, Title: event.target.value } : ev
                        )
                      )
                    }
                  />

                  <label className="text-2xl font-semibold ml-3 text-gray-600 mb-6">
                    Edit Location:
                  </label>
                  <input
                    type="text"
                    value={e.Location}
                    className="text-2xl p-1 m-3.5 border rounded-md text-gray-500"
                    onChange={(event) =>
                      setEvents((prev) =>
                        prev.map((ev) =>
                          ev._id === e._id ? { ...ev, Location: event.target.value } : ev
                        )
                      )
                    }
                  />

                  <input
                    type="datetime-local"
                    value={e.DateAndTime}
                    className="text-2xl p-1 m-3.5 border rounded-md text-gray-500"
                    onChange={(event) =>
                      setEvents((prev) =>
                        prev.map((ev) =>
                          ev._id === e._id ? { ...ev, DateAndTime: event.target.value } : ev
                        )
                      )
                    }
                  />

                  <div className="flex items-center">
                    <label className="text-2xl font-semibold ml-3 text-gray-600">
                      Edit Description:
                    </label>
                    <textarea
                      value={e.Description}
                      className="text-2xl p-1 border rounded-md m-3 text-gray-500"
                      onChange={(event) =>
                        setEvents((prev) =>
                          prev.map((ev) =>
                            ev._id === e._id
                              ? { ...ev, Description: event.target.value }
                              : ev
                          )
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleUpdate(e._id, {
                          Title: e.Title,
                          Description: e.Description,
                          Location: e.Location,
                          DateAndTime: e.DateAndTime,
                        })
                      }
                      className="text-white flex items-center ml-3.5 mb-3 justify-center transition duration-300 bg-green-600 px-3 py-3 rounded-lg hover:bg-green-700"
                    >
                      <Check className="text-gray-300 mr-2 h-5 w-5" />
                      Save
                    </button>

                    <button
                      onClick={() =>
                        setEditing((prev) => ({ ...prev, [e._id]: false }))
                      }
                      className="text-white flex items-center ml-3.5 mb-3 justify-center transition duration-300 bg-gray-800 px-3 py-3 rounded-lg hover:bg-gray-700"
                    >
                      <X className="text-gray-300 mr-2 h-5 w-5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="bg-gray-200 z-10 p-8 mx-auto rounded shadow-8xl w-full"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="bg-gray-200 m-0 py-2 pl-6">
                    <h2 className="text-2xl flex items-center m-3.5 text-gray-500">
                      <Tag className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                      <strong>Event Title:</strong>
                      <p className="pl-2">{e.Title}</p>
                    </h2>

                    <div className="text-2xl flex items-center m-3.5 text-gray-500">
                      <FileText className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                      <strong>Description:</strong>
                      <p className="pl-2">{e.Description}</p>
                    </div>

                    <div className="text-2xl flex items-center m-3.5 text-gray-500">
                      <Hash className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                      <strong>Date & Time:</strong>
                      <p className="ml-2">
                        {new Date(e.DateAndTime).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    <div className="text-2xl flex items-center m-3.5 text-gray-500">
                      <Hash className="text-gray-400 mr-2 mt-1 h-5 w-5" />
                      <strong>Location:</strong>
                      <p className="ml-2">
                      {e.Location}
                      </p>
                    </div>

                    <div className="grid grid-cols-16 mb-3.5 mt-4.5">
                      <button
                        onClick={() =>
                          setEditing((prev) => ({ ...prev, [e._id]: true }))
                        }
                        className="text-white flex items-center ml-3.5 justify-center transition duration-300 bg-blue-600 px-3 py-3 rounded-lg hover:bg-blue-700"
                      >
                        <Edit className="text-gray-400 mr-2 h-5 w-5" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(e._id)}
                        className="text-white flex items-center ml-3.5 justify-center transition duration-300 bg-red-700 px-3 py-3 rounded-lg hover:bg-red-800"
                      >
                        <Trash className="text-gray-400 mr-2 h-5 w-5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MyEvents;
