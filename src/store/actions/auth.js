import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({
  type: actionTypes.AUTH_START
});

const authSuccess = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  localId
});

const authFailed = (error) => ({
  type: actionTypes.AUTH_FAILED,
  error
});

const authProfileUpdateStart = () => ({
  type: actionTypes.AUTH_PROFILE_UPDATE_START
});

const authProfileUpdateSuccess = () => ({
  type: actionTypes.AUTH_PROFILE_UPDATE_SUCCESS
});

const authProfileUpdateFailed = (error) => ({
  type: actionTypes.AUTH_PROFILE_UPDATE_FAILED,
  error
});

const authProfileUpdateComplete = () => ({
  type: actionTypes.AUTH_PROFILE_UPDATE_COMPLETE
});

export const auth = (user, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    };

    let url;
    if (isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAzUyIG5buO5C-ihnj2foId9jByUKzS0L8';
    } else {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAzUyIG5buO5C-ihnj2foId9jByUKzS0L8';
    }

    axios.post(url, authData)
      .then(response => {
        // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        // localStorage.setItem('token', response.data.idToken);
        // localStorage.setItem('expirationDate', expirationDate);
        // localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
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
          })
          .catch((error) => {
            dispatch(authProfileUpdateFailed(error));
          });
      })
      .catch(error => {
        dispatch(authFailed(error.response.data.error));
      });
  }
};