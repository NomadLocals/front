import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReportEvent } from "../../Redux trad/actions.js";
import { useNavigate, useParams } from "react-router-dom";

const ReportForm = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const user = useSelector(state=> state.user);
  const navigate = useNavigate();
  const userName = user.userName
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    userNameUserReporter: userName,
    idEventReporte: id,
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

    if(formData.type.trim() === ""){
      setErrorMessage("Elige el motivo de reporte")
      isValid= false
    }
    if(formData.description.trim() === ""){
      setErrorMessage("Escribe una descripción")
      isValid= false
    }
    if(isValid){
    dispatch(
        postReportEvent(formData)
      )
        .then(() => {
          resetForm();
          setErrorMessage("")
          navigate("/home")
          console.log("creado correctamente")
        })
        .catch((error) => {
          console.error(
            "An error occurred while submitting the report:",
            error
          );
        });
      }
  };

  const resetForm = () => {
    setFormData({
      type: "",
      description: "",
      userNameUserReporter: userName,
      idEventReporte: id,
    });
  };

  return (
    <div className="bg-F1EFE7 min-h-screen py-8">
      <div className="max-w-md mx-auto bg-white p-6 shadow-md">
        <h2 className="text-2xl mb-4">Report Form</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="type" className="block font-bold mb-1">
                Reason:
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a reason</option>
                    <option value="Scam">Scam</option>
                    <option value="Breach of Contract">
                      Breach of Contract
                    </option>
                    <option value="Violence">Violence</option>
                    <option value="Other">Other</option>
              </select>
            </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-1">
              Description:
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
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/home")
            }}
            className="px-6 py-2 rounded-lg bg-blue text-black font-semibold hover:bg-gray-400"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
