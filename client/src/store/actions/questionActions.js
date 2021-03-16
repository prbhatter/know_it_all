import axios from 'axios';

/*export const raiseQuestion = (question) => {
    return async(dispatch, getState) => {
      // make async call to database
      dispatch({ type: 'RAISE_QUESTION', question });
    }
}*/

export const raiseQuestion = (question) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/prbhatter/my-questions', question, config);
    console.log(res.data.data)
    dispatch({
      type: 'RAISE_QUESTION',
      payload: res.data.data,
    });

    // dispatch(setAlert(res.data.message, 'success'));

    // dispatch(getPosts());
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: 'QUESTION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};


export const myQuestions = (uname) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json' ,
    },
  };

  try {
    const res = await axios.get(`/${uname}/my-questions`);
    console.log(res.data.data)
    dispatch({
      type: 'MY_QUESTIONS',
      payload: res.data.data,
    });

    // dispatch(setAlert(res.data.message, 'success'));

    // dispatch(getPosts());
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: 'QUESTION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};