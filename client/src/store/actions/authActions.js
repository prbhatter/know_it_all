import axios from 'axios';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: 'USER_LOADED',
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

// Register User
export const register = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(user);

  try {
    // console.log('authActions register')
    const res = await axios.post('/register', body, config);
    // console.log(res.data)
    if(res.data.type === 'USER_EXISTS' || res.data.type === 'EMAIL_EXISTS') {
      console.log('user exists')
      dispatch({
        type: res.data.type,
      })
    } else {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
    }

  } catch (err) {
    console.log('error',err)
    dispatch({
      type: 'REGISTER_FAIL',
    });
  }
};

// Login User
export const login = ({uname, password}) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // console.log('login authActions')
  const body = JSON.stringify({uname, password});
  // console.log(body)
  try {
    const res = await axios.post('/login', body, config);
    // console.log('login authActions data recieved', res.data)
    if(res.data.type == 'NO_ACCESS') {
      console.log('Login no acees')
      dispatch({
        type: 'NO_ACCESS',
        payload: res.data
      })
    } else if(res.data.type == 'ALREADY_LOGGEDIN') {
      console.log('already loggend in')
      dispatch({
        type: 'ALREADY_LOGGEDIN',
        payload: res.data
      })
    } else {
      console.log('login succes authactions')
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
    }

    // dispatch(setAlert(res.data.message, 'success'));

    // dispatch(loadUser());
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));
    console.log('error',err)
    dispatch({
      type: 'LOGIN_FAILED',
    });
  }
};

//LOGOUT
export const logout = () => async(dispatch) => {
//   dispatch(setAlert('User has logged out', 'success'));
  // console.log('logout authActions')
  const res = await axios.delete('/logout');
  dispatch({type: 'LOGOUT_SUCCESS'});
}; 