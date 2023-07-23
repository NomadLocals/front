import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import  io  from "socket.io-client";

const socket = io('http://localhost:3001');


const ChatPersonal = ({receiverId}) => {
  
  const user = useSelector((state) => state.user);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  
  const handleMessageChange = (event) => setNewMessage(event.target.value);

  const handleSendMessage = () => {
    socket.emit("chatPersonalMessage", {
      senderId: socket.id,
      senderUsername: user.username,
      receiverId: receiverId,
      message: newMessage,
    });
    setNewMessage("");
};

  useEffect(() => {
    socket.on("connectPersonal", () => setIsConnected(true));
    socket.emit("joinPersonalChat", receiverId);
    
    console.log(message)
    socket.on("chatPersonalMessage", (message) => {
      setChatMessages([...chatMessages, message]);
    });
    
    return () => {
      socket.off("connectPersonal");
      socket.off("chatPersonalMessage");
    };
  }, [socket, receiverId]);
  
  
  
  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">
        Chat personal con {user.username}
      </h4>
      <div className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll">
        {chatMessages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{message.senderUsername}: </span>
            <span>{message.message}</span>
          </div>
        ))}
      </div>
      <div className="flex mt-2 text-black">
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          className="border border-gray-300 rounded-md px-2 py-1 flex-grow mr-2"
          placeholder="Escribe un mensaje..."
        />
        <button
          className="bg-blue hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatPersonal;