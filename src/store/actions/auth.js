import * as actionTypes from './actionTypes';
import axios from 'axios';
import { ROOT } from '../../constants/routes';

const authStart = () => ({
  type: actionTypes.AUTH_START
});

const authLoginStart = () => ({
  type: actionTypes.AUTH_LOGIN_START
});

const authSuccess = (idToken, localId, displayName) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  localId,
  displayName
});

const authFailed = (error) => ({
  type: actionTypes.AUTH_FAILED,
  error
});

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const authRedirectPath = (path) => ({
  type: actionTypes.AUTH_REDIRECT_PATH,
  redirectPath: path
});

const authProfileUpdateStart = () => ({
  type: actionTypes.AUTH_PROFILE_UPDATE_START
});

// const authProfileUpdateSuccess = () => ({
//   type: actionTypes.AUTH_PROFILE_UPDATE_SUCCESS
// });

const authProfileUpdateFailed = (error) => ({
  type: actionTypes.AUTH_PROFILE_UPDATE_FAILED,
  error
});

const authProfileUpdateComplete = () => ({
  type: actionTypes.AUTH_PROFILE_UPDATE_COMPLETE
});

export const authMessageErrorReset = () => ({
  type: actionTypes.AUTH_MESSAGE_ERROR_RESET
});

export const auth = (user) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAzUyIG5buO5C-ihnj2foId9jByUKzS0L8';

    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('idToken', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('localId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.displayName));
        const profileData = {
          idToken: response.data.idToken,
          displayName: user.firstname + " " + user.lastname
        };

        dispatch(authProfileUpdateStart());
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyAzUyIG5buO5C-ihnj2foId9jByUKzS0L8', profileData)
          .then(() => {
            dispatch(authProfileUpdateComplete());
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyAzUyIG5buO5C-ihnj2foId9jByUKzS0L8',
              { idToken: response.data.idToken })
              .then(response => {
                console.log(response.data)
              });
            dispatch(authRedirectPath(ROOT + profileData.displayName.split(" ").join("").toLowerCase()));
          })
          .catch((error) => {
            dispatch(authProfileUpdateFailed(error));
          });
      })
      .catch(error => {
        if (error.response) {
          dispatch(authFailed(error.response.data.error));
        } else {
          dispatch(authFailed(error));
        }
      });
  }
};

export const authLogin = (user) => {
  return dispatch => {
    dispatch(authLoginStart());

    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAzUyIG5buO5C-ihnj2foId9jByUKzS0L8';
    axios.post(url, authData)
      .then(response => {
        const data = response.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
        localStorage.setItem('idToken', data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('localId', data.localId);
        localStorage.setItem('displayName', data.displayName);
        dispatch(authSuccess(data.idToken, data.localId, data.displayName));
        dispatch(authRedirectPath(ROOT + data.displayName.split(" ").join("").toLowerCase()));
      })
      .catch(error => {
        if (error.response) {
          dispatch(authFailed(error.response.data.error));
        } else {
          dispatch(authFailed(error));
        }
      });
  };
};


export const authCheckState = () => {
  return dispatch => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const currentDate = new Date();
      if (expirationDate > currentDate) {
        const localId = localStorage.getItem('localId');
        const displayName = localStorage.getItem('displayName');
        dispatch(authSuccess(idToken, localId, displayName));
        dispatch(authRedirectPath(ROOT + displayName.split(" ").join("").toLowerCase()));
      } else {
        dispatch(authLogout());
      }
    }
  }
};
