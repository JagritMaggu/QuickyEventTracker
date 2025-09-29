import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, PlusCircle } from "lucide-react";

function HeroSection() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const bgStyle = {
    background: `url("/images/CreateEvent2.jpg") no-repeat center center fixed`,
    backgroundSize: "cover", // ✅ keeps aspect ratio
    minHeight: "100vh",
    height: "100vh",
    position: "fixed",
    filter: "blur(8px)",
    transform: "scale(1.05)",
    width: "100%",
    margin: "0px",
    padding: "0px",
  };

  function navigateToSignup() {
    navigate("/signup");
  }
  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div style={bgStyle}></div>

        <div className="relative bg-white/30 rounded-3xl p-6 sm:p-10 mx-4 sm:mx-auto z-10 grid gap-8 justify-items-center w-full max-w-2xl">
          {/* Title + Logo */}
          <div className="text-center text-pink-600 opacity-95 font-bold">
            <span className="block text-2xl sm:text-3xl lg:text-4xl mb-4">
              Welcome to
            </span>
            <div className="flex items-center justify-center text-4xl sm:text-5xl lg:text-7xl mb-4">
              <img
                src="/images/QuiclyBronz.png"
                alt="QuiclyLogo"
                className="h-14 w-14 sm:h-20 sm:w-20 mt-1.5 mr-2 rounded-xl"
              />
              <span>Quickly</span>
            </div>
            <p className="text-lg sm:text-xl">An app to sync with the vibe</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={navigateToSignup}
              className="w-full sm:w-auto text-pink-100 text-lg sm:text-xl flex items-center justify-center transition duration-300 opacity-90 bg-gradient-to-r from-orange-400 to-yellow-400 px-5 py-3.5 border-0 rounded-2xl hover:opacity-100"
            >
              <PlusCircle className="text-pink-200 mr-2 h-5 w-5" /> Signup
            </button>

            <button
              onClick={navigateToLogin}
              className="w-full sm:w-auto text-pink-100 text-lg sm:text-xl flex items-center justify-center transition duration-300 bg-gradient-to-r from-purple-400 to-pink-400 px-5 py-3.5 border-0 rounded-2xl hover:opacity-100"
            >
              <LogIn className="text-pink-200 mr-2 h-5 w-5" /> Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;