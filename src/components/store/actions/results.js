import * as actionTypes from "./actionTypes";

export const saveResult = (result) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(storeResult(result));
      }, 2000);
    };
  };
  
  export const deleteResult = (resultId) => {
    return {
      type: actionTypes.DELETE_RESULT,
      resultId: resultId,
    };
  };
  
  ////////////////////
  const storeResult = (result) => {
    return {
      type: actionTypes.SAVE_RESULT,
      value: result,
    };
  };