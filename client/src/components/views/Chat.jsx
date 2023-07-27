import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
// const URL = "https://serverpfnomadlocals.onrender.com";
// const socket = io("http://localhost:3001");

// const socket = io("https://serverpredeploy.onrender.com");
const socket = io("https://lastservernomad.onrender.com");

const Chat = () => {
  const user = useSelector((state) => state.user);
  const historialChat = useSelector((state) => state.historialChat);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState(historialChat);

  const userName = user.userName;
  const { id } = useParams();

  console.log(historialChat);
  const handleMessageChange = (event) => setNewMessage(event.target.value);

  const handleSendMessage = () => {
    socket.emit("chatEventMessage", {
      eventId: id,
      senderId: user.id,
      message: newMessage,
      userName: userName,
    });
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));

    socket.on("getMessagesEvent", (data) => {
      // console.log(data)
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("chatEventMessage", (data) => {
      console.log(data);
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("chatEventMessage");
    };
  }, [allMessages]);

  console.log(allMessages);

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Chat</h4>
      <div
        // ref={chatContainerRef}
        className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll"
      >
        {allMessages &&
          allMessages?.map((message, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold">{message.userName}: </span>
              <span>{message.message}</span>
            </div>
          ))}
      </div>
      <div className="flex mt-2 text-black">
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          // onKeyDown={handleKeyDown} // Agregamos el evento onKeyDown
          className="border border-gray-300 rounded-md px-2 py-1 flex-grow mr-2"
          placeholder="Escribe un mensaje..."
        />
        <button
          className="bg-blue border-2 border-black hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
