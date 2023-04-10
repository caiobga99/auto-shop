import UserActionTypes from "./action-types";
import analyticsEventTracker from "../../analyticsEventTracker";

const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  const gaEventTracker = analyticsEventTracker(action.payload?.name);
  switch (action.type) {
    case UserActionTypes.LOGIN:
      gaEventTracker("Entrou com sua conta!");
      return { ...state, currentUser: action.payload };
    case UserActionTypes.LOGOUT:
      gaEventTracker("Saiu de sua conta!");
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default userReducer;
