import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReportUser } from "../../Redux trad/actions.js";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar.jsx";

const ReportUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = user.id;
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    idUserReporter: userId,
    idUserReporte: id,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    if (formData.type.trim() === "") {
      setErrorMessage("Elige el motivo de reporte");
      isValid = false;
    }
    if (
      formData.description.trim() === "" ||
      formData.description.length > 200
    ) {
      setErrorMessage("Escribe una descripción de no más de 200 caracteres");
      isValid = false;
    }
    if (isValid) {
      dispatch(postReportUser(formData))
        .then(() => {
          resetForm();
          setErrorMessage("");
          navigate("/home");
          console.log("creado correctamente");
        })
        .catch((error) => {
          console.error("Ocurrió un error al enviar el informe:", error);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      type: "",
      description: "",
      idUserReporter: userId,
      idUserReporte: id,
    });
  };

  return (
    <>
      <NavBar />
      <div className="bg-grey min-h-screen lg:min-w-52 flex justify-center font-quick">
        <div className="mt-10 lg:w-8/12 shadow-2xl rounded-lg overflow-hidden flex flex-col justify-center items-center p-5">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-center font-spartan">Formulario de Reporte de Usuario</h2>
          {errorMessage && <p className="text-blue bg-yellow mb-3">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="type" className="block font-bold mb-1">
                Motivo:
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="block px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Selecciona un Motivo</option>
                <option value="Scam">
                  Comportamiento fraudulento o engañoso
                </option>
                <option value="Breach of Contract">
                  Violación de derechos de autor o propiedad intelectual
                </option>
                <option value="Violence">
                  Comportamiento ofensivo o abusivo
                </option>
                <option value="Inappropriate">
                  Contenido inapropiado o inadecuado
                </option>
                <option value="Other">Otros</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-1">
                Descripción:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                cols="30"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 mx-2 py-2 rounded-lg bg-blue text-white font-semibold hover:bg-gray-400"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/home");
              }}
              className="px-6 py-2 rounded-lg bg-blue text-white font-semibold hover:bg-gray-400"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReportUser;