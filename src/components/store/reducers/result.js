import * as actionTypes from "../actions/actionTypes";

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_RESULT:
      return {
        ...state,
        results: state.results.concat({ value: action.value, id: new Date() }),
      };
    case actionTypes.DELETE_RESULT:
      return {
        ...state,
        results: state.results.filter(
          (result) => result.id !== action.resultId
        ),
      };

    default:
      return state;
  }
};

export default reducer;
