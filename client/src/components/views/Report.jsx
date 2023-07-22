import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postReportUser, postReportEvent } from "../../Redux trad/actions.js";
import { useNavigate, useParams } from "react-router-dom";

const ReportForm = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const user = useSelector(state=> state.user);
  const navigate = useNavigate();
  const event = useSelector(state=> state.eventById);
  const eventUser = event.userId
  const userName = user.userName
  const userId = user.id
  const [formData, setFormData] = useState({
    reportType: "",
    reason: "",
    description: "",
    userNameUserReporter: userName,
    idEventReporte: id,
    idUserReporter: userId,
    idUserReporte: eventUser,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const {
      reportType,
      reason,
      description,
      userNameUserReporter,
      idEventReporte,
      idUserReporter,
      idUserReporte,
    } = formData;
    console.log(formData)
    if (
      (reportType === "event" &&
        (!reason ||
          !description ||
          !userName ||
          !userNameUserReporter ||
          !idEventReporte ||
          !idUserReporter ||
          !idUserReporte)) ||
      (reportType === "user" &&
        (!reason || !description || !idUserReporter || !idUserReporte))
    ) {
      setErrorMessage("Please fill in all fields.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");

    if (reportType === "event") {
      dispatch(
        postReportEvent({
          type: reason,
          description,
          userNameUserReporter,
          idEventReporte,
        })
      )
        .then(() => {
          setSuccessMessage("Report submitted successfully.");
          resetForm();
        })
        .catch((error) => {
          setSuccessMessage("");
          console.error(
            "An error occurred while submitting the report:",
            error
          );
        });
    } else if (reportType === "user") {
      dispatch(
        postReportUser({
          type: reason,
          description,
          idUserReporter,
          idUserReporte,
        })
      )
        .then(() => {
          setSuccessMessage("Report submitted successfully.");
          resetForm();
        })
        .catch((error) => {
          setSuccessMessage("");
          console.error(
            "An error occurred while submitting the report:",
            error
          );
        });
    }
  };

  const resetForm = () => {
    setFormData({
      reportType: "",
      reason: "",
      description: "",
      userNameUserReporter: userName,
      idEventReporte: id,
    idUserReporter: userId,
      idUserReporte: eventUser,
    });
  };

  return (
    <div className="bg-F1EFE7 min-h-screen py-8">
      <div className="max-w-md mx-auto bg-white p-6 shadow-md">
        <h2 className="text-2xl mb-4">Report Form</h2>
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reportType" className="block font-bold mb-1">
              Report Type:
            </label>
            <select
              id="reportType"
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select a report type</option>
              <option value="event">Event</option>
              <option value="user">User</option>
            </select>
          </div>
          {formData.reportType && (
            <div className="mb-4">
              <label htmlFor="reason" className="block font-bold mb-1">
                Reason:
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a reason</option>
                {formData.reportType === "event" ? (
                  <>
                    <option value="Scam">Scam</option>
                    <option value="Breach of Contract">
                      Breach of Contract
                    </option>
                    <option value="Violence">Violence</option>
                    <option value="Other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="Scam">Scam</option>
                    <option value="Breach of Contract">
                      Breach of Contract
                    </option>
                    <option value="Violence">Violence</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
            </div>
          )}
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
