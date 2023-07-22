import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkUserById, getUserById } from "../../Redux trad/actions.js";
import logoImage from "../../images/5.png";

const Loading = () => {
  const initSesion = useSelector((state) => state.initSesion);
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
  }, [user]);

  useEffect(() => {
    const checkUser = async () => {
      if (id) {
        dispatch(checkUserById(id));
      }
    };
  
    checkUser();
  }, [id, dispatch]);
  
  useEffect(() => {
    if (initSesion !== "") {
      if (initSesion === true) {
        console.log("navigate home");
        navigate("/home");
      } else {
        console.log("navigate form");
        navigate("/create-account1");
      }
    }
  }, [initSesion, navigate]);

  return (
    <div
      style={{
        backgroundColor: "#F1EFE7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <img
        src={logoImage}
        alt="Loading"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  );
};

export default Loading;
