import { useDispatch, useSelector } from "react-redux";
import MapSelect from "./Map.jsx";
import { postUser } from "../../Redux trad/actions.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CreateAccountPlace() {

  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate();
  const location = useSelector((state) => state.eventLocation);
  const dispatch = useDispatch();
  const place = useSelector((state) => state.placeName);

  useEffect(() => {
    console.log(userData)
    if (user) {
      setUserData((prevData) => ({
        ...prevData,
        place: place,
        geolocation: location,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(postUser(userData));
      navigate("/home");
      console.log(userData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-grey min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="1.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            ¿En dónde te encuentras?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
            method="POST"
          >
            <div className="max-w-md max-h-md mx-auto">
              <MapSelect />
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className=" bg-blue text-sm font-semibold leading-6 text-white bg-f1efef rounded-md py-1.5 px-4 shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue text-sm font-semibold leading-6 text-white bg-black rounded-md py-1.5 px-4 shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
