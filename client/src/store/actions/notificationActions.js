import axios from 'axios';

export const newNotification = (notification) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('notificationActions', notification);
    dispatch({
      type: 'NEW_NOTIFICATION',
      payload: notification,
    });
};

export const myNotifications = (uname) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json' ,
    },
  };

  try {
    console.log('notificationActions myNotifications uname : ', uname);
    const res = await axios.get(`${uname}/my-notifications`);
    dispatch({
      type: 'MY_NOTIFICATIONS',
      payload: res.data,
    });

    // dispatch(setAlert(res.data.message, 'success'));

    // dispatch(getPosts());
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));
    console.log(err)
    dispatch({
      type: 'NOTIFICATION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};