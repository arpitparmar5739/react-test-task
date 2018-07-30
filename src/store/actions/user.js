import * as actionTypes from './actionTypes';
import axios from '../../axios-firebase-db';

const updateUser = (user) => ({
  type: actionTypes.USER_DATA_UPDATE,
  user
});

export const loadUser = () => {
  return (dispatch, getState) => {
    axios.post("/users.json?auth=" + getState().auth.idToken)
      .then(response => {
        console.log(response.data);
      });

    const user = {
      status: "Well Done"
    };
    dispatch(updateUser(user));
  };
};