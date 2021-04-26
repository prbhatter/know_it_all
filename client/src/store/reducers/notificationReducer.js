
const initState = {
    notifications: []
  }
  
  const notificationReducer = (state = initState, action) => {

    switch (action.type) {
      case 'NEW_NOTIFICATION':
        console.log('NEW_NOTIFICATION reducer', action.payload);
        return {
          ...state,
          notifications: [action.payload, ...state.notifications]
        }
      case 'MY_NOTIFICATIONS':
         console.log('MY_NOTIFICATIONS reducer', action.payload);
         return {
          ...state,
          notifications: action.payload.mynotifications
        }
      default:
        // console.log('default questionReducer', state);
        return state
    }
  };
  
  export default notificationReducer;