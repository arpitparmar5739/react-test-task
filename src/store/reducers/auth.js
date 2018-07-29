import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  localId: null,
  expiresIn: null,
  error: null,
  message: null,
  submitting: false,
  displayName: null,
  authRedirectPath: null
};

const authStart = () => ({
  ...initialState,
  message: "Signing Up, Please wait...",
  submitting: true
});

const authLoginStart = () => ({
  ...initialState,
  message: "Logging In, Please wait...",
  submitting: true
});

const authSuccess = (state, action) => ({
  ...state,
  idToken: action.idToken,
  localId: action.localId,
  displayName: action.displayName,
  message: null,
  submitting: false
});

const authFailed = (state, action) => ({
  ...state,
  message: null,
  error: action.error.message,
  submitting: false
});

const authProfileUpdateStart = (state, action) => ({
  ...state,
  error: null,
  message: "Updating your profile please wait..."
});

const authProfileUpdateSuccess = (state, action) => ({
  ...state,
  message: "Profile has been updated successfully",
  submitting: false
});

const authProfileUpdateFailed = (state, action) => ({
  ...state,
  message: null,
  error: action.error,
  submitting: false
});

const authProfileUpdateComplete = (state, action) => ({
  ...state,
  message: null,
  error: null,
  submitting: false
});

const authRedirect = (state, action) => ({
  ...state,
  authRedirectPath: action.redirectPath
});

const authLogout = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('localId');
  localStorage.removeItem('displayName');
  localStorage.removeItem('expirationDate');
  return { ...initialState }
};

const authMessageErrorReset = (state) => ({
  ...initialState,
  error: null,
  message: null
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart();
    case actionTypes.AUTH_LOGIN_START: return authLoginStart();
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAILED: return authFailed(state, action);
    case actionTypes.AUTH_MESSAGE_ERROR_RESET: return authMessageErrorReset(state);
    case actionTypes.AUTH_PROFILE_UPDATE_START: return authProfileUpdateStart(state, action);
    case actionTypes.AUTH_PROFILE_UPDATE_SUCCESS: return authProfileUpdateSuccess(state, action);
    case actionTypes.AUTH_PROFILE_UPDATE_FAILED: return authProfileUpdateFailed(state, action);
    case actionTypes.AUTH_PROFILE_UPDATE_COMPLETE: return authProfileUpdateComplete(state, action);
    case actionTypes.AUTH_REDIRECT_PATH: return authRedirect(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout();
    default: break;
  }

  return state;
};

export default authReducer;