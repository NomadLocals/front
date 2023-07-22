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
  DELETE_IMAGE
} from "./action-types.js";

// const URL = "http://localhost:3001";
// const URL = "https://serverpfnomadlocals.onrender.com";
const URL = "https://serverpredeploy.onrender.com"

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
      dispatch({
        type: POST_USER,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
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
      alert(error.message);
    }
  };
};

export const postReportEvent = (report) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/${REPORT_EVENT}`, report);

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
      console.log(error);
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
      window.alert("Este es el alert de activity detail");
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
      alert(error);
    }
  };
};

export const checkUserById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/${USER}/${id}`);

      let saved = "";
      if (data) {
        saved = true;
      }

      return dispatch({
        type: CHECK_USER_BY_ID,
        payload: saved,
      });
    } catch (error) {
      let saved = false;
      return dispatch({
        type: CHECK_USER_BY_ID,
        payload: saved,
      });
    }
  };
};

export const suscribeEvent = (id, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/events/${id}/users`, {
        userId,
      });

      return dispatch({
        type: SUSCRIBE_EVENT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const unsuscribeEvent = (id, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${URL}/events/${id}/users?userId=${userId}`
      );
      console.log(data);
      return dispatch({
        type: UNSUSCRIBE_EVENT,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSingOut = (userVacio) => {
  return {
    type: VACIAR_USER,
    payload: userVacio,
  };
};

export const postEvent = (activityData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/events`, activityData);
      console.log(response);
      return dispatch({
        type: POST_EVENT,
      });
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
};

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
      console.error(error);
    }
  };
};
export const editUser = (userId, userData) => {
  return async (dispatch) => {
    console.log(userData);
    try {
      const endPoint = `${URL}/${USER}/${userId}`;
      const { data } = await axios.put(endPoint, userData);
      dispatch({
        type: EDIT_USER,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
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
      alert(error);
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
