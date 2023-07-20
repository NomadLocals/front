import {
  GET_ACTIVITIES,
  GET_FILTERED_AVTIVITIES,
  SET_EVENT_LOCATION,
  SET_FILTERS,
  POST_USER,
  SAVE_USER_FORM,
  RESET_FILTER,
  POST_REPORT_USER,
  POST_REPORT_EVENT,
  SET_PLACE_NAME,
  GET_USER_ACTIVITIES,
  GET_EVENT_BY_ID,
  GET_USER_BY_ID,
  VACIAR_USER,
  CHECK_USER_BY_ID,
  FETCH_PLACE_NAME,
} from "./action-types.js";

const initialState = {
  activities: [],
  filter: {},
  eventLocation: {},
  user: {},
  userReport: null,
  eventReport: null,
  placeName: "",
  eventById: {},
  initSesion: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_FILTERED_AVTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };
    case SET_EVENT_LOCATION:
      return {
        ...state,
        eventLocation: action.payload,
      };
    case RESET_FILTER:
      return {
        ...state,
        filter: {
          activityType: "",
          minCost: "",
          eventDate: "",
          location: "",
        },
      };
    case SAVE_USER_FORM:
      return {
        ...state,
        user: action.payload,
      };

    //Report YAM
    case POST_REPORT_USER:
      return {
        ...state,
        userReport: action.payload,
      };
    case POST_REPORT_EVENT:
      return {
        ...state,
        eventReport: action.payload,
      };
    case SET_PLACE_NAME:
      return {
        ...state,
        placeName: action.payload,
      };
    case GET_USER_ACTIVITIES:
      return {
        ...state,
        user: { ...state.user, Events: action.payload },
      };
    case FETCH_PLACE_NAME:
      return {
        ...state,
        placeName: action.payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
      };
    case CHECK_USER_BY_ID:
      return {
        ...state,
        initSesion: action.payload,
      };
    case VACIAR_USER:
      return {
        ...state,
        user: action.payload,
        eventById: action.payload,
        initSesion: action.payload,
        filter: action.payload,
      };
    case GET_EVENT_BY_ID:
      return {
        ...state,
        eventById: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
