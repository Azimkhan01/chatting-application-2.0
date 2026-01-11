import { useSocket } from "@/context/SocketContext";
import {
  addTypingUserDev,
  removeTypingUserDev,
} from "@/Redux/DevMode/DevModeSlice";
import { addMessage } from "@/Redux/MessageSlice/MessageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DrawerDemo } from "./Drawer";

function Input() {
  const [message, setMessage] = useState("");

  const user = useSelector((s) => s.user.current);
  const allUser = useSelector((s) => s.user.allUser);
  const [personal, setPersonal] = useState({ selected: "All" });
  const socket = useSocket();
  const dispatch = useDispatch();

  // Disable send button if message is empty
  const isDisabled = message.trim().length === 0;

  useEffect(() => {
    if (!socket) return;
    socket.on("typing_dev", (data) => {
      dispatch(addTypingUserDev(data));
      //    console.log(data);
    });
    socket.on("typing_remove_dev", (data) => {
      // console.log("dev detect remove");
      dispatch(removeTypingUserDev(data));
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    if (!message) {
      socket.emit("typing_remove", { user, socketId: socket.id });
      return;
    }

    socket.emit("typing", { user, socketId: socket.id });
    const timeout = setTimeout(() => {
      socket.emit("typing_remove", { user, socketId: socket.id, message });
    }, 1500); // 1 sec after user stops typing

    return () => clearTimeout(timeout);
  }, [message]);

  useEffect(() => {
    if (!message) {
      socket.emit("typing_remove_dev", { user, socketId: socket.id, message });

      //   socket.emit("typing_remove", { user, socketId: socket.id });
      return;
    }

    socket.emit("typing_dev", { user, socketId: socket.id, message });
    const timeout = setTimeout(() => {
      socket.emit("typing_remove_dev", { user, socketId: socket.id, message });
    }, 5000); // 1 sec after user stops typing

    return () => clearTimeout(timeout);
  }, [message]);

  // Send message function
  function send() {
    if (!message.trim()) return;

    const payload = {
      name: user,
      message,
      socketId: socket.id, // sender socket
      to: personal.selected, // receiver socket OR "All"
    };

    if (personal.selected === "All") {
      socket.emit("message", payload); // broadcast
      dispatch(addMessage([payload]));
    } else {
      socket.emit("private_message", payload); // 🔒 private
      dispatch(addMessage([payload]));
    }

    // Optimistic UI
    setMessage("");
  }

  // Handle Enter key
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent new line
      send();
    }
  }

  function handleDevMode(e) {
    if (e.target.checked) {
      //   console.log("checked");
      socket.emit("join_room", { user });
    } else {
      //   console.log("not checked");
      socket.emit("leave_room", { user });
    }
  }

  return (
    <div className="flex justify-center items-center w-full p-3">
      <div
        className="
      w-full max-w-4xl
      flex flex-col gap-3
      md:flex-row md:items-center
    "
      >
        {/* User select */}
        <select
          value={personal.selected}
          onChange={(e) =>
            setPersonal({
              selected: e.target.value,
            })
          }
          className="
    w-full md:w-1/6
    border p-2 rounded
  "
        >
          <option value="All">All</option>

          {allUser &&
            Object.keys(allUser).length > 0 &&
            Object.keys(allUser).map((u) =>
              u !== user ? (
                <option key={u} value={allUser[u]}>
                  {u}
                </option>
              ) : null
            )}
        </select>

        {/* Message box */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter message here..."
          className="
        w-full md:flex-1
        h-14 p-2
        border border-black/30 rounded
        resize-none
        focus:outline-none focus:ring-2 focus:ring-green-400
      "
        />

        {/* Send button */}
        <button
          disabled={isDisabled}
          onClick={send}
          className={`
        w-full md:w-1/6
        h-14 rounded-lg text-white transition
        ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }
      `}
        >
          Send
        </button>

        {/* Dev tools (only everazim) */}
        {user === "everazim" && (
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <label className="text-sm">Dev Mode:</label>
            <input type="checkbox" onChange={handleDevMode} />
            <DrawerDemo />
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
