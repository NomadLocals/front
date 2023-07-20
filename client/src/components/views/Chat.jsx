import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// const URL = "http://localhost:3001";
const URL = "https://serverpfnomadlocals.onrender.com";
const socket = io(URL); // Establecer conexión con el servidor de chat

const Chat = () => {
  const user = useSelector((state) => state.user);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const userName = user.userName;
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));

    socket.on("chat message", (data) => {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    localStorage.setItem("chatHistory", JSON.stringify(allMessages));

    scrollBottom()

    return () => {
      socket.off("connect");
      socket.off("chat message");
    };
  }, [allMessages]);

  const handleMessageChange = (event) => setNewMessage(event.target.value);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }
    socket.emit("chat message", {
      usuario: userName,
      message: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setAllMessages([]);
    localStorage.removeItem("chatHistory");
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Chat</h4>
      <div 
        ref={chatContainerRef}
        className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll"
        >
          {allMessages.map((message, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold">{message.usuario}: </span>
              <span>{message.message}</span>
            </div>
          ))}
      </div>
      <div className="flex mt-2 text-black">
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          className="border border-gray-300 rounded-md px-2 py-1 flex-grow mr-2"
          placeholder="Escribe un mensaje..."
        />
        <button
          className="bg-blue hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
        <button
          className="bg-blue hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline ml-2"
          onClick={handleClearChat}
        >
          Limpiar Chat
        </button>
      </div>
    </div>
  );
};

export default Chat;
