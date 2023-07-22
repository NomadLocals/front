import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatPersonal = (userId ) => {
  const user = useSelector((state) => state.user);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const currentUserId = user.userId;
  const chatId = `${currentUserId}-${userId}`;
  const eventName = `chat personal ${chatId}`;

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));

    socket.on(eventName, (message) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off(eventName);
    };
  }, [eventName, socket]);

  const handleMessageChange = (event) => setNewMessage(event.target.value);

  const handleSendMessage = () => {
    socket.emit(eventName, {
      userId: currentUserId,
      message: newMessage,
    });
    setNewMessage("");
};
// console.log(handleSendMessage());

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">
        Chat personal con {userId}
      </h4>
      <div className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll">
        {chatMessages.map((message, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{message.userId}: </span>
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