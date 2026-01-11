import { useSocket } from "@/context/SocketContext";
import { setAllUser, setCurrent } from "@/Redux/UserSlice/UserSlice";
import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Pop() {
  const [name, setName] = useState("");
  
  const [hidden, setHidden] = useState(false);
  const socket = useSocket();
  const dispatch = useDispatch();
  // ✅ Load name from localStorage once
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // ✅ Socket listener
  useEffect(() => {
    if (!socket) return;

    const handleUserAdded = (data) => {
      console.log(data.allUser);
      
    //   dispatch(setCurrent(data.name));
      dispatch(setAllUser(data.allUser));
      console.log("user added successfully ..");
      setHidden(true);
    };

    socket.on("new_user_added", handleUserAdded);

    return () => {
      socket.off("new_user_added", handleUserAdded);
    };
  }, [socket]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    localStorage.setItem("username", name);
    socket?.emit("new_user", { name });
      dispatch(setCurrent(name));
    unlockSpeech();
  };

  const unlockSpeech = () => {
  const utterance = new SpeechSynthesisUtterance(""); // empty text
  window.speechSynthesis.speak(utterance);
};


  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 ${
        hidden && "hidden"
      }`}
    >
      <div
        className="flex flex-col bg-black p-6 rounded-lg w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="text-white bg-transparent border border-white/40 p-3 text-lg font-semibold rounded outline-none focus:border-green-400"
        />

        <button
          className=" border border-white/40 mt-4 py-2 rounded text-white font-semibold hover:bg-green-500 hover:border-green-500 transition disabled:opacity-50"
          onClick={handleSubmit}
          disabled={!name.trim()}
        >
          Enter
        </button>
      </div>
    </section>
  );
}

export default Pop;
