import { useSocket } from "@/context/SocketContext";
import { addTypingUser, removeTypingUser } from "@/Redux/Typing/typing";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

function Typing() {
  const socket = useSocket();
  const typingUser = useSelector((s) => s.usertyping.user);
  const dispatch = useDispatch();

  // Ten random colors
  const colors = useMemo(
    () => [
      "#FF6633", // reddish-orange
      "#FFB399", // muted orange/pink
      "#FF33FF", // magenta
      "#00B3E6", // blue
      "#E6B333", // golden-brown
      "#3366E6", // darker blue
      "#999966", // olive
      "#B34D4D", // dark red
    ],
    []
  );

  function handleTyping(data) {
    dispatch(addTypingUser(data.user));
  }

  function handleRemoveTyping(data) {
    dispatch(removeTypingUser(data.user));
  }

  useEffect(() => {
    socket.on("typing", handleTyping);
    socket.on("typing_remove", handleRemoveTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("typing_remove", handleRemoveTyping);
    };
  }, [socket]);

  if (!typingUser || typingUser.length < 1) return null;

  return (
    // Fixed container in bottom-left corner
    <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-50">
      {typingUser.map((data, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={i}
            className="rounded-full px-4 py-2 text-white text-sm font-semibold animate-popup"
            style={{ backgroundColor: color }}
          >
            {data} is typing...
          </div>
        );
      })}
    </div>
  );
}

export default Typing;
