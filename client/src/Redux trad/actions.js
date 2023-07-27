import axios from "axios";
//ActionsName:
import {
  GET_ACTIVITIES,
  GET_FILTERED_AVTIVITIES,
  SET_EVENT_LOCATION,
  SET_FILTERS,
  POST_USER,
  SAVE_USER_FORM,
  RESET_FILTER,
  POST_REPORT_EVENT_SUCCESS,
  POST_REPORT_EVENT_FAILURE,
  POST_REPORT_USER_SUCCESS,
  POST_REPORT_USER_FAILURE,
  POST_REVIEW_USER,
  POST_REVIEW_EVENT,
  SET_PLACE_NAME,
  GET_USER_ACTIVITIES,
  GET_EVENT_BY_ID,
  SUSCRIBE_EVENT,
  FETCH_PLACE_NAME,
  VACIAR_USER,
  POST_EVENT,
  GET_USER_BY_ID,
  UNSUSCRIBE_EVENT,
  CHECK_USER_BY_ID,
  EDIT_USER,
  GET_OTHERS,
  POST_IMAGES,
  DELETE_IMAGE,
  GET_USERS,
  DELETE_USERS,
  DELETE_EVENTS,
  ADMIN_GET_REPORTS,
  ADMIN_GET_REPORTS_USERS,
  ADMIN_GET_REVIEWS_EVENTS,
  ADMIN_GET_REVIEWS_USERS,
  ADMIN_GET_ACTIVITIES,
  GET_HISTORIAL_CHAT_EVENTS,
  GET_HISTORIAL_CHAT_PERSONAL,
  CLEAN_CHAT_PERSONAL,
  CLEAN_CHAT_HISTORY,
  ADMIN_RETRIEVE_USERS,
  CLEAN_COMPONENT,
  ADMIN_EMAIL_DELETE_EVENT,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  RESET_PAGE,
  INIT_SESION,
} from "./action-types.js";

// const URL = "http://localhost:3001"; //* servidor
// const URL = import.meta.env.SERVER_URL;
// const URL = "https://serverpfnomadlocals.onrender.com";
// const URL = "https://serverpredeploy.onrender.com";
const URL = "https://lastservernomad.onrender.com";

const USER = "users";
const EVENT = "events";
const FILTER = "filter";

const REPORT_USER = "reportuser";
const REPORT_EVENT = "reportevent";
// eslint-disable-next-line no-unused-vars
const REVIEW_EVENT = "reviewevent";
// eslint-disable-next-line no-unused-vars
const REVIEW_USER = "reviewuser";

//Actions:

export const getActivities = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${EVENT}`);
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      // console.log(error.message);
    }
  };
};

export const getFilteredActivities = (filtros) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${FILTER}`, {
        params: filtros,
      });

      return dispatch({
        type: GET_FILTERED_AVTIVITIES,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_FILTERED_AVTIVITIES,
        payload: [],
      });
    }
  };
};

export const setFilters = (order) => {
  return {
    type: SET_FILTERS,
    payload: order,
  };
};

export const setEventLocation = (location) => {
  return {
    type: SET_EVENT_LOCATION,
    payload: location,
  };
};

export const saveUserForm = (input) => {
  return {
    type: SAVE_USER_FORM,
    payload: input,
  };
};

export const postUser = (userData) => {
  return async (dispatch) => {
    console.log(userData);
    try {
      const endPoint = `${URL}/${USER}`;
      const { data } = await axios.post(endPoint, userData);
      await axios.post(`${URL}/send-mail/register`, userData);
      dispatch({
        type: POST_USER,
        payload: data,
      });
    } catch (error) {
      dispatch(initFalse());

      console.log("Usuario no creado");
    }
  };
};

export const initFalse = () => {
  return {
    type: INIT_SESION,
  };
};
export const resetFilters = () => {
  return {
    type: RESET_FILTER,
  };
};

//Reports

export const reviewEvent = (reviewE) => {
  return async (dispatch) => {
    console.log(reviewE);
    try {
      const endPoint = `${URL}/${REVIEW_EVENT}`;
      const { data } = await axios.post(endPoint, reviewE);
      dispatch({
        type: POST_REVIEW_EVENT,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};
export const reviewUser = (review) => {
  return async (dispatch) => {
    console.log(review);
    try {
      const endPoint = `${URL}/${REVIEW_USER}`;

      const { data } = await axios.post(endPoint, review);
      dispatch({
        type: POST_REVIEW_USER,
        payload: data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
};

export const postReportEvent = (formData) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      const response = await axios.post(`${URL}/${REPORT_EVENT}`, formData);

      if (!response || !response?.data) {
        throw new Error("Failed to create Report");
      }

      dispatch(postReportEventSuccess(response.data));
    } catch (error) {
      dispatch(postReportEventFailure(error.message));
    }
  };
};

export const postReportEventSuccess = (report) => {
  return {
    type: POST_REPORT_EVENT_SUCCESS,
    payload: report,
  };
};

export const postReportEventFailure = (error) => {
  return {
    type: POST_REPORT_EVENT_FAILURE,
    payload: error,
  };
};

export const postReportUser = (report) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/${REPORT_USER}`, report);
      dispatch(postReportUserSuccess(response.data));
    } catch (error) {
      dispatch(postReportUserFailure(error.message));
    }
  };
};

export const postReportUserSuccess = (report) => {
  return {
    type: POST_REPORT_USER_SUCCESS,
    payload: report,
  };
};

export const postReportUserFailure = (error) => {
  return {
    type: POST_REPORT_USER_FAILURE,
    payload: error,
  };
};

export const setPlaceName = (place) => {
  return {
    type: SET_PLACE_NAME,
    payload: place,
  };
};

export const getUserActivities = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${USER}/${id}`);
      const events = data.Events;

      return dispatch({
        type: GET_USER_ACTIVITIES,
        payload: events,
      });
    } catch (error) {
      // console.log(error.response.data);
    }
  };
};
export const getActivityDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/events/${id}`);

      return dispatch({
        type: GET_EVENT_BY_ID,
        payload: data,
      });
    } catch (error) {
      window.alert("El evento ah sido eliminado");
    }
  };
};

//GET USER BY ID
export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${USER}/${id}`);
      if (data) {
        return dispatch({
          type: GET_USER_BY_ID,
          payload: data,
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };
};

export const checkUserById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${USER}/${id}`);
      console.log(data);
      let saved = "";
      if (data) {
        saved = true;
      }

      return dispatch({
        type: CHECK_USER_BY_ID,
        payload: saved,
      });
    } catch (error) {
      // console.log(error);
      let saved = false;
      return dispatch({
        type: CHECK_USER_BY_ID,
        payload: saved,
      });
    }
  };
};

export const suscribeEvent = (id, userId, eventDate, place, email, name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/events/${id}/users`, {
        userId,
      });
      await axios.post(`${URL}/send-mail/suscribe-event`, {
        eventDate,
        email,
        place,
        name,
      });

      return dispatch({
        type: SUSCRIBE_EVENT,
      });
    } catch (error) {
      // console.log(error);
    }
  };
};
export const unsuscribeEvent = (id, userId, eventDate, place, email, name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${URL}/events/${id}/users?userId=${userId}`
      );
      await axios.post(`${URL}/send-mail/unsuscribe-event`, {
        eventDate,
        email,
        place,
        name,
      });

      return dispatch({
        type: UNSUSCRIBE_EVENT,
      });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const setSingOut = (userVacio) => {
  return {
    type: VACIAR_USER,
    payload: userVacio,
  };
};

export const postEvent = (activityData, userName, email) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/events`, activityData);
      console.log(response);
      await axios.post(`${URL}/send-mail/newEventCreated`, {
        userName,
        email,
        activityData,
      });

      return dispatch({
        type: POST_EVENT,
      });
    } catch (error) {
      console.log(error);
      // window.alert(error);
    }
  };
};

// dani
export const getHistorialMessages = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/events/${id}/chat/event`);

      return dispatch({
        type: GET_HISTORIAL_CHAT_EVENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getPersonalMessages = (roomName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/chat/personal/${roomName}`);

      return dispatch({
        type: GET_HISTORIAL_CHAT_PERSONAL,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const clearChatHistory = () => {
  return {
    type: CLEAN_CHAT_HISTORY,
    payload: "",
  };
};

export const clearChatPersonal = () => {
  return {
    type: CLEAN_CHAT_PERSONAL,
    payload: [],
  };
};
// //dani

export const fetchPlaceName = (latitude, longitude) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const { address } = response.data;
      const { city, country } = address;
      const placeName = city ? `${city}, ${country}` : country;
      return dispatch({
        type: FETCH_PLACE_NAME,
        payload: placeName,
      });
    } catch (error) {
      // console.error(error);
    }
  };
};
export const editUser = (userId, userData) => {
  return async (dispatch) => {
    console.log(userData);
    try {
      const endPoint = `${URL}/${USER}/${userId}`;
      const { data } = await axios.put(endPoint, userData);
      console.log(userId);
      return dispatch({
        type: EDIT_USER,
        payload: data,
      });
    } catch (error) {
      // alert(error.message);
    }
  };
};

export const getOthersById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${USER}/${id}`);
      if (data) {
        return dispatch({
          type: GET_OTHERS,
          payload: data,
        });
      }
    } catch (error) {
      // alert(error);
    }
  };
};

export const postImage = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dwit2djhy/image/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      const fileURL = data.secure_url;

      return dispatch({
        type: POST_IMAGES,
        payload: fileURL,
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };
};

export const deleteImage = () => {
  return {
    type: DELETE_IMAGE,
  };
};

export const getAllUsers = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/admin/${id}/${USER}`);

      return dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const deleteUser = (id, email) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}/${USER}/${id}`);
      await axios.post(`${URL}/send-mail/delete`, { email });
      return dispatch({
        type: DELETE_USERS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`${URL}/${EVENT}/${id}`);

      return dispatch({
        type: DELETE_EVENTS,
        payload: id,
      });
    } catch (error) {
      // alert(error);
    }
  };
};
export const deleteEventEmail = (email, event) => {
  return async (dispatch) => {
    try {
      await axios.post(`${URL}/send-mail/delete-event`, { email, event });

      return dispatch({
        type: ADMIN_EMAIL_DELETE_EVENT,
        payload: id,
      });
    } catch (error) {
      // alert(error);
    }
  };
};

export const getEventsReportsAdmin = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/admin/${id}/reportevent`);
      if (data) {
        return dispatch({
          type: ADMIN_GET_REPORTS,
          payload: data,
        });
      }
    } catch (error) {
      // alert(error);
    }
  };
};
export const getUsersReportsAdmin = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/admin/${id}/reportuser`);
      if (data) {
        return dispatch({
          type: ADMIN_GET_REPORTS_USERS,
          payload: data,
        });
      }
    } catch (error) {
      // alert(error);
    }
  };
};
export const getEventsReviewsAdmin = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/admin/${id}/reviewevent`);
      if (data) {
        return dispatch({
          type: ADMIN_GET_REVIEWS_EVENTS,
          payload: data,
        });
      }
    } catch (error) {
      // alert(error);
    }
  };
};
export const getUsersReviewsAdmin = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/admin/${id}/reviewuser`);
      if (data) {
        return dispatch({
          type: ADMIN_GET_REVIEWS_USERS,
          payload: data,
        });
      }
    } catch (error) {
      // alert(error);
    }
  };
};
export const adminGetActivities = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/admin/${id}/${EVENT}`);
      return dispatch({
        type: ADMIN_GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      // console.log(error.message);
    }
  };
};
export const adminRetrieveUsers = (id, adminId, email) => {
  return async (dispatch) => {
    try {
      console.log(`${URL}/admin/${adminId}/userreset?idUser=${id}`);
      const { data } = await axios.get(
        `${URL}/admin/${adminId}/userreset?idUser=${id}`
      );
      await axios.post(`${URL}/send-mail/retrieve`, { email });
      console.log(data);
      return dispatch({
        type: ADMIN_RETRIEVE_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cleanComponent = (component) => {
  return {
    type: CLEAN_COMPONENT,
    payload: component,
  };
};

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};
export const previousPage = () => {
  return {
    type: PREVIOUS_PAGE,
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};
