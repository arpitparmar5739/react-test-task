import { combineReducers } from 'redux';
import authReducer from './auth';
import userReducer from './user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userReducer
});

export default rootReducer; 