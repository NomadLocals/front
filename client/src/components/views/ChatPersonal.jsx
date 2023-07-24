import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  io  from "socket.io-client";

const socket = io('http://localhost:3001');


const ChatPersonal = () => {
  
  const others = useSelector((state) => state.others);
  const user = useSelector((state) => state.user);
  const startChat = useSelector((state) => state.startChat);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false); // Estado para controlar si el chat se ha iniciado
  const dispatch = useDispatch()

  const handleMessageChange = (event) => setNewMessage(event.target.value);

  const handleSendMessage = () => {
    console.log(newMessage)
    socket.emit("chatPersonalMessage", {
      senderId: user.id,
      senderUsername: user.username,
      receiverId: others.id,
      message: newMessage,
    });
    setNewMessage("");
  };


  console.log(others)
  //   dispatch(startChatPersonal(data))
  //   setChatStarted(true); // Actualizamos el estado para mostrar el chat una vez iniciado
  // };

  useEffect(() => {
    socket.on("startPersonalChat",
      setIsConnected (true),
      setChatStarted(true));
    socket.emit("joinPersonalChat", others.id);

    socket.on("chatPersonalMessage", (message) => {
      setChatMessages([...chatMessages, message]);
    });

    // socket.on("personalChatCreated", (newPersonalChat) => {
    //   // Recibimos el chat personal recién creado desde el servidor
    //   setChatMessages(newPersonalChat.messages);
    //   setChatStarted(true);
    // });

    return () => {
      socket.off("startPersonalChat");
      socket.off("chatPersonalMessage");
      // socket.off("personalChatCreated");
    };
  }, [socket]);
  
  
  
  return (
    <div className="mt-4">
      {(
        <>
          <h4 className="text-lg font-semibold mb-2">
            Chat personal con {others.userName}
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
        </>
      )}
    </div>
  );
};

export default ChatPersonal;