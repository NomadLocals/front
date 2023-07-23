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
      setErrorMessage("Escribe una descripción de hasta 200 caracteres");
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
    <div>
      <NavBar />
      <div className="bg-F1EFE7 min-h-screen py-8">
        <div className="max-w-md mx-auto bg-white p-6 shadow-md">
          <h2 className="text-2xl mb-4">Formulario de Reporte de Usuario</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
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
                className="w-full p-2 border border-gray-300 rounded"
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
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full xl:w-auto bg-blue text-black py-2 px-8 rounded-xl text-xl"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/home");
              }}
              className="px-6 py-2 rounded-lg bg-blue text-black font-semibold hover:bg-gray-400"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportUser;
