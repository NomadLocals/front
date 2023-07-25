import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  io  from "socket.io-client";
import { getPersonalMessages } from "../../Redux trad/actions";

const socket = io('http://localhost:3001');


const ChatPersonal = () => {

  //* importacion de estados... 

  const others = useSelector((state) => state.others);
  const user = useSelector((state) => state.user);
  const historialChatPersonal = useSelector((state) => state.historialChatPersonal);
  console.log(user)
  const dispatch = useDispatch()
  //* Estados locales para funcionalidad de Chat...
  const [newMessage, setNewMessage] = useState("") //? Para cada mensaje que se envie..
  
  const [isConnected, setIsConnected] = useState(false); //? para conexion
  const [chatMessages, setChatMessages] = useState(historialChatPersonal) //? para historial..

  


  const handleMessageChange = (event) => setNewMessage(event.target.value);

  const handleSendMessage = () => {
    // console.log(chatMessages)
    socket.emit("chatPersonalMessage", {
      senderId: user.id,
      receiverId: others.id,
      senderUserName: user.userName,
      message: newMessage,
    });
    setNewMessage("");
  };



  const data = {
    senderId : user.id,
    receiverId: others.id,
  }

  useEffect(() => {
    dispatch(getPersonalMessages(data))
    
    socket.emit('startPersonalChat', {
      senderId: user.id,
      receiverId: others.id,
    })
    socket.on("joinPersonalChat", others.id);

    socket.on("startPersonalChat",()=>{
      setIsConnected (true)
    });

    
    socket.on("chatPersonalMessage", (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

      
    socket.on('getPersonalMessage', (data) => {
    setChatMessages((prevMessages) => [...prevMessages, data])
    })
    
    return () => {
    socket.off("startPersonalChat");
    socket.off("chatPersonalMessage");
    };
  }, [socket]);
  
  console.log(historialChatPersonal);
  
  // console.log(chatMessages)
  return (
    <div className="mt-4">
      {(
        <>
          <h4 className="text-lg font-semibold mb-2">
            Chat personal con {others.userName}
          </h4>
          <div className="border border-gray-300 rounded-lg p-2 h-40 overflow-y-scroll">
            {chatMessages?.map((message, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{message.sender.userName}: </span>
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