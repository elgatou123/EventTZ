import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // fix import here
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

// ================ Initial State ================
const initialState = {
  auth: {
    userInfo: localStorage.getItem('user') 
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    loading: false,
    error: null,
    isAuthenticated: false,
    role: null
  },
  events: {
    data: [],
    selectedEvent: null,
    loading: false,
    error: null
  },
  services: {
    data: [],
    loading: false,
    error: null
  },
  reservations: {
    data: [],
    loading: false,
    error: null
  },
  invites: {
    data: [],
    currentInvite: null,
    loading: false,
    error: null
  }
};

// ================ Action Types ================
const ActionTypes = {
  // Auth Actions
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  
  // Event Actions
  EVENTS_LOAD_REQUEST: 'EVENTS_LOAD_REQUEST',
  EVENTS_LOAD_SUCCESS: 'EVENTS_LOAD_SUCCESS',
  EVENTS_LOAD_FAILURE: 'EVENTS_LOAD_FAILURE',
  EVENT_CREATE_REQUEST: 'EVENT_CREATE_REQUEST',
  EVENT_CREATE_SUCCESS: 'EVENT_CREATE_SUCCESS',
  EVENT_CREATE_FAILURE: 'EVENT_CREATE_FAILURE',
  
  // Service Actions
  SERVICES_LOAD_REQUEST: 'SERVICES_LOAD_REQUEST',
  SERVICES_LOAD_SUCCESS: 'SERVICES_LOAD_SUCCESS',
  SERVICES_LOAD_FAILURE: 'SERVICES_LOAD_FAILURE',
  SERVICE_CREATE_REQUEST: 'SERVICE_CREATE_REQUEST',
  SERVICE_CREATE_SUCCESS: 'SERVICE_CREATE_SUCCESS',
  SERVICE_CREATE_FAILURE: 'SERVICE_CREATE_FAILURE',
  
  // Reservation Actions
  RESERVATIONS_LOAD_REQUEST: 'RESERVATIONS_LOAD_REQUEST',
  RESERVATIONS_LOAD_SUCCESS: 'RESERVATIONS_LOAD_SUCCESS',
  RESERVATIONS_LOAD_FAILURE: 'RESERVATIONS_LOAD_FAILURE',
  RESERVATION_CREATE_REQUEST: 'RESERVATION_CREATE_REQUEST',
  RESERVATION_CREATE_SUCCESS: 'RESERVATION_CREATE_SUCCESS',
  RESERVATION_CREATE_FAILURE: 'RESERVATION_CREATE_FAILURE',
  
  // Invite Actions
  INVITE_LOAD_REQUEST: 'INVITE_LOAD_REQUEST',
  INVITE_LOAD_SUCCESS: 'INVITE_LOAD_SUCCESS',
  INVITE_LOAD_FAILURE: 'INVITE_LOAD_FAILURE',
  INVITE_UPDATE_REQUEST: 'INVITE_UPDATE_REQUEST',
  INVITE_UPDATE_SUCCESS: 'INVITE_UPDATE_SUCCESS',
  INVITE_UPDATE_FAILURE: 'INVITE_UPDATE_FAILURE'
};

// ================ Action Creators ================
const Actions = {
getEvents: () => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EVENTS_LOAD_REQUEST });
    const { data } = await axios.get(`${API_BASE}/events`);
    dispatch({
      type: ActionTypes.EVENTS_LOAD_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch({ type: ActionTypes.EVENTS_LOAD_FAILURE, payload: message });
  }
},
  login: (email, password) => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.AUTH_REQUEST });

      const { data } = await axios.post(`${API_BASE}/login`, {
        email: String(email).trim(),
        password: String(password)
      });

      const userInfo = {
        token: data.access_token,
        user: data.user,
        role: data.user.role
      };

      dispatch({ 
        type: ActionTypes.AUTH_SUCCESS, 
        payload: userInfo 
      });
      
      localStorage.setItem('user', JSON.stringify(userInfo));
      return userInfo;
    } catch (error) {
      const message = error.response?.data?.message || 
                     error.message || 
                     'Login failed';
      dispatch({ type: ActionTypes.AUTH_FAILURE, payload: message });
      throw message;
    }
  },

  register: (userData) => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.AUTH_REQUEST });

      const { data } = await axios.post(`${API_BASE}/register`, userData);

      const userInfo = {
        token: data.access_token,
        user: data.user,
        role: data.user.role
      };

      dispatch({
        type: ActionTypes.AUTH_SUCCESS,
        payload: userInfo
      });

      localStorage.setItem('user', JSON.stringify(userInfo));
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.AUTH_FAILURE, payload: message });
      throw message;
    }
  },

  logout: () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch({ type: ActionTypes.AUTH_LOGOUT });
  },

  // Event Actions
  loadEvents: () => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.EVENTS_LOAD_REQUEST });

      const { data } = await axios.get(`${API_BASE}/events`);

      dispatch({
        type: ActionTypes.EVENTS_LOAD_SUCCESS,
        payload: data
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.EVENTS_LOAD_FAILURE, payload: message });
    }
  },

  createEvent: (eventData) => async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.EVENT_CREATE_REQUEST });

      const { auth: { userInfo } } = getState();
      
      if (!userInfo || userInfo.role !== 'organizer') {
        throw new Error('Only organizers can create events');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${API_BASE}/events`,
        eventData,
        config
      );

      dispatch({
        type: ActionTypes.EVENT_CREATE_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.EVENT_CREATE_FAILURE, payload: message });
      throw message;
    }
  },

  // Service Actions
  loadServices: () => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.SERVICES_LOAD_REQUEST });

      const { data } = await axios.get(`${API_BASE}/services`);

      dispatch({
        type: ActionTypes.SERVICES_LOAD_SUCCESS,
        payload: data
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.SERVICES_LOAD_FAILURE, payload: message });
    }
  },

  createService: (serviceData) => async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.SERVICE_CREATE_REQUEST });

      const { auth: { userInfo } } = getState();
      
      if (!userInfo || userInfo.role !== 'organizer') {
        throw new Error('Only organizers can create services');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${API_BASE}/services`,
        serviceData,
        config
      );

      dispatch({
        type: ActionTypes.SERVICE_CREATE_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.SERVICE_CREATE_FAILURE, payload: message });
      throw message;
    }
  },

  // Reservation Actions
  loadReservations: () => async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.RESERVATIONS_LOAD_REQUEST });

      const { auth: { userInfo } } = getState();
      
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.get(
        `${API_BASE}/reservations/my`,
        config
      );

      dispatch({
        type: ActionTypes.RESERVATIONS_LOAD_SUCCESS,
        payload: data
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.RESERVATIONS_LOAD_FAILURE, payload: message });
    }
  },

  createReservation: (reservationData) => async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.RESERVATION_CREATE_REQUEST });

      const { auth: { userInfo } } = getState();
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.post(
        `${API_BASE}/reservations`,
        reservationData,
        config
      );

      dispatch({
        type: ActionTypes.RESERVATION_CREATE_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.RESERVATION_CREATE_FAILURE, payload: message });
      throw message;
    }
  },

  // Invite Actions
  loadInvite: (token) => async (dispatch) => {
    try {
      dispatch({ type: ActionTypes.INVITE_LOAD_REQUEST });

      const { data } = await axios.get(`${API_BASE}/invites/${token}`);

      dispatch({
        type: ActionTypes.INVITE_LOAD_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.INVITE_LOAD_FAILURE, payload: message });
      throw message;
    }
  },

  updateInvite: (inviteId, updateData) => async (dispatch, getState) => {
    try {
      dispatch({ type: ActionTypes.INVITE_UPDATE_REQUEST });

      const { auth: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      };

      const { data } = await axios.put(
        `${API_BASE}/invites/${inviteId}`,
        updateData,
        config
      );

      dispatch({
        type: ActionTypes.INVITE_UPDATE_SUCCESS,
        payload: data
      });

      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch({ type: ActionTypes.INVITE_UPDATE_FAILURE, payload: message });
      throw message;
    }
  }
};

// ================ Reducers ================

// Auth Reducer
const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        isAuthenticated: true,
        role: action.payload.role,
        error: null
      };
    case ActionTypes.AUTH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.AUTH_LOGOUT:
      return {
        userInfo: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        role: null
      };
    default:
      return state;
  }
};

// Events Reducer
const eventsReducer = (state = initialState.events, action) => {
  switch (action.type) {
    case ActionTypes.EVENTS_LOAD_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.EVENTS_LOAD_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case ActionTypes.EVENTS_LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.EVENT_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.EVENT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: null
      };
    case ActionTypes.EVENT_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Services Reducer
const servicesReducer = (state = initialState.services, action) => {
  switch (action.type) {
    case ActionTypes.SERVICES_LOAD_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.SERVICES_LOAD_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case ActionTypes.SERVICES_LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.SERVICE_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.SERVICE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: null
      };
    case ActionTypes.SERVICE_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reservations Reducer
const reservationsReducer = (state = initialState.reservations, action) => {
  switch (action.type) {
    case ActionTypes.RESERVATIONS_LOAD_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.RESERVATIONS_LOAD_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case ActionTypes.RESERVATIONS_LOAD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.RESERVATION_CREATE_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.RESERVATION_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: null
      };
    case ActionTypes.RESERVATION_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Invites Reducer
const invitesReducer = (state = initialState.invites, action) => {
  switch (action.type) {
    case ActionTypes.INVITE_LOAD_REQUEST:
    case ActionTypes.INVITE_UPDATE_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.INVITE_LOAD_SUCCESS:
      return { ...state, loading: false, currentInvite: action.payload, error: null };
    case ActionTypes.INVITE_LOAD_FAILURE:
    case ActionTypes.INVITE_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.INVITE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentInvite: action.payload,
        data: state.data
          ? state.data.map(invite => invite.id === action.payload.id ? action.payload : invite)
          : [],
        error: null
      };
    default:
      return state;
  }
};

// ================ Root Reducer ================
const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  services: servicesReducer,
  reservations: reservationsReducer,
  invites: invitesReducer,
});

// ================ Store Setup ================
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export { ActionTypes, Actions };
export default store;
