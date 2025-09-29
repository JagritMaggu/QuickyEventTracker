import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../Utils/api";
import Navbar from "./Navbar";
function Homepage() {
  const bgStyle = {
    background: `url("/images/QuickyAbout.jpg") no-repeat center center fixed `,
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
    }

    getUser();
  }, []);

  return (
    <div className="relative min-h-screen   w-full overflow-hidden">
      <div style={bgStyle} className="min-h-screen min-w-screen "></div>

      <Navbar />
      <div className="relative z-10 Border">
        <motion.div className="flex-1 relative text-3xl max-h-screen bg-black/40  rounded-lg max-w-full overflow-y-auto  p-2 m-6"
        >
         <motion.p
      className="text-3xl font-extralight text-violet-300 sm:text-lg md:text-xl lg:text-3xl"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  Life’s better when you’re in the right place, at the right time, with the right vibe. That’s exactly why we built this app—a fun, colorful, and effortless way to keep track of all your events and plans without the boring, complicated stuff.

Think of it as your personal vibe manager. From big moments like weddings, festivals, and concerts to casual meetups, game nights, and coffee runs, we make sure nothing slips through the cracks. No more digging through endless chats, sticky notes, or juggling multiple apps—everything you need to stay in sync is right here.

But we’re not just about reminders and schedules. We’re about energy. The excitement of looking forward to something. The fun of planning with friends. The joy of never missing out. With sleek design, playful features, and a touch of good vibes, our app turns organizing into something you’ll actually enjoy.

Because at the end of the day, life isn’t about ticking off a to-do list—it’s about creating memories, sharing laughs, and catching every single vibe along the way. And we’re here to make sure you never miss one.

 You don’t just plan events—you create moments, and we’re here to give those moments the spotlight they deserve.

So whether you’re the friend who organizes every hangout or the one who just shows up for the fun, this app makes life smoother, brighter, and a whole lot more exciting. Your vibe, your people, your time—perfectly tracked and never forgotten.

And the best part? You don’t need to be a “planner” to use it. Our simple design means anyone can hop in, check what’s happening, and join the fun without stress. It’s like a pocket-sized hype friend reminding you that the good times are waiting.

We believe every event, no matter how big or small, deserves to feel special. That’s why our mission is simple: to make planning feel effortless, to make memories easier to catch, and to keep the fun alive, one vibe at a time.
</motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default Homepage;
