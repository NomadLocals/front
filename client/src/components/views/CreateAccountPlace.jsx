import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MapSelect from "./Map.jsx";
import { postUser } from "../../Redux trad/actions.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function CreateAccountPlace() {

  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(user);
  const navigate = useNavigate();
  const location = useSelector((state) => state.eventLocation);
  const dispatch = useDispatch();
  const place = useSelector((state) => state.placeName);

  useEffect(() => {
    if (user) {
      setUserData((prevData) => ({
        ...prevData,
        place: place,
        geolocation: location,
      }));
    }
  }, [user, place, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(postUser(userData));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-grey min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153676/Nomadlocals/Logos/1_z79ppu.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            ¿En dónde te encuentras?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-grey p-6 rounded-lg shadow-lg"
            method="POST"
          >
            <div className="max-w-md max-h-md mx-auto">
            <Link to="/create-account1">
              <button
                type="button"
                className="text-xl font-spartan leading-6 text-black rounded-md py-4 shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <RiArrowGoBackFill />
              </button>
              </Link>
              <MapSelect />
            </div>
            <div className="mt-6 items-center justify-center gap-x-6">
              <button
                type="submit"
                className="location-button font-quick"
              >
                ¡Estoy aquí!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
