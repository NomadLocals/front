import { useState } from "react";
import { useDispatch } from "react-redux";
import { postReportUser, postReportEvent } from "../../Redux trad/actions.js";

const ReportForm = () => {
  const dispatch = useDispatch();
  const [reportType, setReportType] = useState("");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setReason("");
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (reportType === "user") {
      dispatch(postReportUser({ reason, description }));
    } else if (reportType === "event") {
      dispatch(postReportEvent({ reason, description }));
    }
    setReportType("");
    setReason("");
    setDescription("");
  };

  return (
    <div>
      <h2>Report Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reportType">Report Type: </label>
          <select
            id="reportType"
            value={reportType}
            onChange={handleReportTypeChange}
          >
            <option value="">Select a report type</option>
            <option value="user">User</option>
            <option value="event">Event</option>
          </select>
        </div>
        {reportType && (
          <div>
            <label htmlFor="reason">Reason:</label>
            <select id="reason" value={reason} onChange={handleReasonChange}>
              <option value="">Select a reason</option>
              {reportType === "user" ? (
                <>
                  <option value="harassment">Harassment</option>
                  <option value="spam">Spam</option>
                  <option value="inappropriate-content">
                    Inappropriate Content
                  </option>
                  <option value="impersonation">Impersonation</option>
                  <option value="other">Other</option>
                </>
              ) : (
                <>
                  <option value="racism">Racism</option>
                  <option value="inappropriate-content">
                    Inappropriate Content
                  </option>
                  <option value="spam">Spam</option>
                  <option value="other">Other</option>
                </>
              )}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportForm;
