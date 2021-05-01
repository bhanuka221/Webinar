import * as actionTypes from "../actions/actionTypes";

const initialState = {
  auth: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_DATA:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
