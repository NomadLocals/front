import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { saveUserForm, getUserActivities } from "../../Redux trad/actions.js";

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    userName: "",
    age: "",
    gender: "",
    interests: "",
  });

  useEffect(() => {
    if (user) {
      setInput((prevInput) => ({
        ...prevInput,
        id: user.id || "",
        image: user.imageUrl || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phoneNumbers || [],
        email: user.emailAddresses?.[0]?.emailAddress || "",
        admin: false,
      }));
    }
  }, [user]);
  const [id, setId] = useState("");

  //logica para que no haya demora al renderizar mis actividades al ingresar.
  useEffect(() => {
    if (user) {
      setId(user.id);
    }
  }, [user]);
  useEffect(() => {
    dispatch(getUserActivities(id));
  }, [dispatch]);
  //

  const handleAge = (event) => {
    setInput({
      ...input,
      age: Number(event.target.value),
    });
  };

  const handleUserName = (event) => {
    setInput({
      ...input,
      userName: event.target.value,
    });
  };

  const handleGender = (event) => {
    setInput({
      ...input,
      gender: event.target.value,
    });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    console.log(user);
    dispatch(saveUserForm(input));
    navigate("/create-account2");
  };

  const handleInterest = (event) => {
    setInput({
      ...input,
      interests: event.target.value,
    });
  };

  return (
    <div className="bg-grey min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src="logonomad.png"
            className="mx-auto h-10 w-auto"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
            Dinos mas sobre ti
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-black"
              >
                ¿Cómo quieres que te llamemos?
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="userName"
                  value={input.userName}
                  onChange={handleUserName}
                  className="bg-grey block w-full rounded-md border-black py-1.5 text-black shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Edad
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={handleAge}
                  id="age"
                  name="age"
                  type="number"
                  value={input.age}
                  className="bg-grey block w-full rounded-md border-black py-1.5 text-black shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Género
                </label>
              </div>
              <div className="mt-2">
                <select
                  onChange={handleGender}
                  name="gender"
                  value={input.gender}
                  className="block w-full rounded-md border-black py-1.5 text-black shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled defaultValue>
                    seleccione su género
                  </option>
                  <option key="male" value="Male">
                    Hombre
                  </option>
                  <option key="female" value="Female">
                    Mujer
                  </option>
                  <option key="notspecified" value="No specified">
                    Sin especificar
                  </option>
                  <option key="other" value="Other">
                    Otro
                  </option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="interest"
                className="block text-sm font-medium leading-6 text-black"
              >
                ¿Qué busco en Nomad Locals?
              </label>
            </div>
            <div className="mt-2">
              <select
                onChange={handleInterest}
                name="interest"
                value={input.interests}
                className="block w-full rounded-md border-black py-1.5 text-black shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>seleccione una opción</option>
                <option key="hobbie" value="hobbie">
                  Explorar un pasatiempo
                </option>
                <option key="connecting" value="connecting">
                  Conocer nuevas personas con intereses parecidos
                </option>
                <option key="notalone" value="notalone">
                  Buscar personas para no dejar de realizar mis pasatiempos
                </option>
                <option key="other" value="other">
                  Otro
                </option>
              </select>
            </div>
            <div className="block text-sm font-medium leading-6 text-black">
              <button
                onClick={handleSubmit}
                className="bg-blue block w-full rounded-md border-black py-1.5 text-white bg-black shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                Ir a mi locación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountForm;
