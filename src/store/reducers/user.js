import * as actionTypes from '../actions/actionTypes';

const initialState = {
  status: null
};

const userDataUpdate = (user) => {
  return { ...user }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DATA_UPDATE: return userDataUpdate(action.user);
  }
  return state;
};

export default userReducer;