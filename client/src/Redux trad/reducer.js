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
  GET_USER_BY_ID,
  VACIAR_USER,
  CHECK_USER_BY_ID,
  FETCH_PLACE_NAME,
  GET_OTHERS,
  POST_IMAGES,
  DELETE_IMAGE,
  GET_USERS,
  DELETE_EVENTS,
  ADMIN_GET_REPORTS,
  ADMIN_GET_REPORTS_USERS,
  ADMIN_GET_REVIEWS_EVENTS,
  ADMIN_GET_REVIEWS_USERS,
  ADMIN_GET_ACTIVITIES,
} from "./action-types.js";

const initialState = {
  activities: [],
  filter: {},
  eventLocation: {},
  user: {},
  userReport: null,
  eventReport: null,
  userReview: {},
  reviewEvent: {},
  placeName: "",
  eventById: {},
  initSesion: "",
  others: {},
  activityImage: "",
  allUsers: [],
  allEventsReports: [],
  allUsersReports: [],
  allEventsReviews: [],
  allUsersReviews: [],
  allActivities: [],
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
    case POST_REVIEW_USER:
      return {
        ...state,
        userReview: action.payload,
        error: null,
      };
    case POST_REVIEW_EVENT:
      return {
        ...state,
        eventReview: action.payload,
        error: null,
      };
    case POST_REPORT_EVENT_SUCCESS:
      return {
        ...state,
        eventReport: action.payload,
        error: null,
      };
    case POST_REPORT_EVENT_FAILURE:
      return {
        ...state,
        eventReport: null,
        error: action.payload,
      };

    case POST_REPORT_USER_SUCCESS:
      return {
        ...state,
        userReport: action.payload,
        error: null,
      };
    case POST_REPORT_USER_FAILURE:
      return {
        ...state,
        userReport: null,
        error: action.payload,
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
    case GET_OTHERS:
      return {
        ...state,
        others: action.payload,
      };
    case POST_IMAGES:
      return {
        ...state,
        activityImage: action.payload,
      };
    case DELETE_IMAGE:
      return {
        ...state,
        activityImage: "",
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case DELETE_EVENTS:
      return {
        ...state,
        events: state.activities.filter((event) => event.id !== action.payload),
      };
    case ADMIN_GET_REPORTS:
      return {
        ...state,
        allEventsReports: action.payload,
      };
    case ADMIN_GET_REPORTS_USERS:
      return {
        ...state,
        allUsersReports: action.payload,
      };
    case ADMIN_GET_REVIEWS_EVENTS:
      return {
        ...state,
        allEventsReviews: action.payload,
      };
    case ADMIN_GET_REVIEWS_USERS:
      return {
        ...state,
        allUsersReviews: action.payload,
      };
    case ADMIN_GET_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
