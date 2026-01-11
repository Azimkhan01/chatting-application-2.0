import React, { useEffect, useState, useRef } from "react";
import Reciever from "./Reciever";
import Sender from "./Sender";
import Typing from "./Typing";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";
import { setAllUser } from "@/Redux/UserSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/Redux/MessageSlice/MessageSlice";

function Display() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const message = useSelector((s) => s.message.message);
  const user = useSelector((s) => s.user);

  const [typingUsers, setTypingUsers] = useState([]);

  // ✅ Ref for messages container auto-scroll
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll down whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    if (!socket) return;

    // Handle new user joining
    const handleNewUserJoined = (data) => {
      dispatch(setAllUser(data.allUser));

      let msg = `${data.new_user} joined the chat.`;
      if (data.new_user.toLowerCase() === "kaif") {
        msg = `${data.new_user} chutiya joined the chat.`;
      }

      // Show toast
      toast.info(msg);

      // ✅ Text-to-speech (works after first user interaction on iOS)
      const utterance = new SpeechSynthesisUtterance(msg);
      window.speechSynthesis.speak(utterance);
    };

    const handlePrivateMessage = (data) => {
        
       dispatch(addMessage([data]));
    }

    // Handle new messages
    const handleMessage = (msg) => {
      dispatch(addMessage([msg]));
    };

    socket.on("new_user_joined", handleNewUserJoined);
    socket.on("message", handleMessage);
    socket.on("private_message",handlePrivateMessage)
    return () => {
      socket.off("new_user_joined", handleNewUserJoined);
      socket.off("message", handleMessage);
    socket.off("private_message",handlePrivateMessage)

    };
  }, [socket, dispatch]);

  return (
    <section className="h-[88%] border border-green-400 shadow-xl m-2 rounded-lg flex flex-col justify-between">
      {/* Messages */}
      <div className="flex flex-col overflow-y-auto p-2">
        {message?.length > 0 &&
          message.map((data, index) => {
            if (data.name === user.current) {
              return <Reciever key={index} name={data.name} message={data.message} />;
            } else {
              return <Sender key={index} name={data.name} to={data.to} message={data.message} />;
            }
          })}

        {/* dummy div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator */}
      <Typing user={typingUsers.length ? typingUsers : ["Azim", "Karim"]} />
    </section>
  );
}

export default Display;
