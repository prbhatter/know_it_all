import axios from 'axios';
 
export const raiseQuestion = (question) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const uname = question.uname
  // console.log('raise',uname) 
  try {
    const res = await axios.post(`${uname}/my-questions`, question, config);
    // console.log(res.data)
    dispatch({
      type: 'RAISE_QUESTION',
      payload: res.data,
    });
    dispatch(myQuestions(question.uname));
    dispatch(recentQuestions());
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

export const assignedQuestions = (uname) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json' ,
    },
  };

  try {
    const res = await axios.get(`${uname}/assigned-questions`);
    // console.log('myQuestions questionActions',res.data)
    dispatch({
      type: 'ASSIGNED_QUESTIONS',
      payload: res.data,
    });

    // dispatch(setAlert(res.data.message, 'success'));

    // dispatch(getPosts());
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));
    console.log(err)
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
    console.log('quesAct uname : ', uname);
    const res = await axios.get(`${uname}/my-questions`);
    // console.log('myQuestions questionActions',res.data)
    dispatch({
      type: 'MY_QUESTIONS',
      payload: res.data,
    });

    // dispatch(setAlert(res.data.message, 'success'));

    // dispatch(getPosts());
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));
    console.log(err)
    dispatch({
      type: 'QUESTION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

export const recentQuestions = () => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json' ,
    },
  };

  // console.log('recent questions')
  try {
    const res = await axios.get('recent-questions');
    // console.log('recent questions', res.data)
    dispatch({
      type: 'RECENT_QUESTIONS',
      payload: res.data,
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