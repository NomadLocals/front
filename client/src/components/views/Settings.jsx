import React from "react";
import NavBar from "./NavBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../Redux trad/actions.js";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Estados globales
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const userName = user.userName;
  const bio = user.bio
  const [inputs, setInputs] = useState({ userName: userName, bio: bio });

  const handleOnChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  console.log(inputs);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit called!");
    //DESPACHAR ACCION CON OBJETO DE ACTIVIDAD A POSTEAR
    dispatch(editUser(userId, inputs));
    //REINICIO estado local:
    setInputs({userName: userName, bio: bio})
    navigate(`/profile/${userId}`);
  };
  return (
    <>
      <NavBar />
      <div className="bg-grey min-h-screen pt-2 font-mono my-16 mt-0 font-quick">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-black font-spartan">
              Configuraciones de tu cuenta
            </h2>
            <form className="mt-6 pt-4" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="personal w-full border-t border-gray-400 pt-4">
                  <h2 className="text-2xl text-gray-900 mb-7 font-spartan">
                    Información personal:
                  </h2>

                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Nombre de usuario
                    </label>
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
                      type="text"
                      name="userName"
                      placeholder="name..."
                      onChange={handleOnChange}
                      value={inputs.userName}
                    />
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Bio
                    </label>
                    <textarea
                      className="bg-gray-100 rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inner border border-gray-400 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                      type="text"
                      name="bio"
                      placeholder="Cuentanos sobre vos..."
                      onChange={handleOnChange}
                      value={inputs.bio}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="appearance-none bg-black text-grey font-quick px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                      type="submit"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
