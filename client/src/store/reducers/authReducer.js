// const initState = {}

// const authReducer = (state = initState, action) => {
//   return state;
// };

// export default authReducer;

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  // return state
  // console.log('authReducer', action.type)
  switch (action.type) {
  //   case 'USER_LOADED': 
  //     return {
  //       ...state,
  //       user: action.payload, 
  //       isAuthenticated: true,
  //       loading: false,
  //     };

    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      console.log('LOGIN_SUCCESS authReducer', action.payload)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'EMAIL_EXISTS':
    case 'USER_EXISTS': 
    console.log('USER_EXISTS authReducer',)
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      }
  //   case 'REGISTER_FAIL':
  //   case 'AUTH_ERROR':
    case 'NO_ACCESS':
      console.log('NO_ACCESS authReducer')
      return {
        ...state,
  //       token: null,
        isAuthenticated: false,
        loading: false, 
      };
    case 'LOGIN_FAILED':
      console.log('LOGIN_FAILED authRed')
    case 'LOGOUT_SUCCESS':
       console.log('LOGOUT_SUCCESS authReducer', state)
      return {
        ...state, 
  //       token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'ALREADY_LOGGEDIN':
      return {
        ...state,
  //    token: null,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer