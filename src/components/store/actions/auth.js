import * as actionTypes from "./actionTypes";
import axios from 'axios';

// export const saveNewUser = (user) => {
//     return (dispatch) => {
//       setTimeout(() => {
//         dispatch(storeResult(result));
//       }, 2000);
//     };
//   };
  
  export const saveAuthData = (authData) => {
    return {
      type: actionTypes.AUTH_DATA,
      payload: authData,
    };
  };
  
  const storeResult = (result) => {
    return {
      type: actionTypes.SAVE_RESULT,
      value: result,
    };
  };