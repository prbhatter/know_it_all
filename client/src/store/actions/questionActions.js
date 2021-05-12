import axios from 'axios';

/*export const raiseQuestion = (question) => {
    return async(dispatch, getState) => {
      // make async call to database
      dispatch({ type: 'RAISE_QUESTION', question });
    }
}*/


export const raiseAnswer = (answer) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const uname = answer.uname
   console.log('answer',answer.idd) 
  try {
    const res = await axios.post(`/answer-questions/${answer.idd}`, answer, config);
     console.log('answer actions',res.data)
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: res.data, 
    }); 
  //   // dispatch(myQuestions());
  //   // dispatch(recentQuestions());
  //   // dispatch(setAlert(res.data.message, 'success'));

  //   // dispatch(getPosts());
  } catch (err) {
  //   // dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: 'QUESTION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }};

  export const getQuestion= (quesid) => async (dispatch, getState) =>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const questionid=quesid;
    console.log('QUES ACTIONS ID',questionid);
    try {
      const res = await axios.get(`/getquestion/${questionid}`, {questionid}); 
       console.log('question actions',res.data)
      dispatch({ 
        type: 'GET_QUESTION',
        payload: res.data,
      });
    } catch (err) {
      // dispatch(setAlert(err.response.data.message, 'danger'));
  
      dispatch({
        type: 'QUESTION_ERROR',
        payload: {msg: err.response.statusText, status: err.response.status},
      });
    }
  };


export const checkComments= (quesid) => async (dispatch, getState) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const questionid=quesid;
  //console.log('QUES ACTIONS ID',questionid);
  try {
    const res = await axios.get(`/comments/${questionid}`, {questionid});
   //  console.log('question actions',res.data)
    dispatch({
      type: 'QUESTION_COMMENTS',
      payload: res.data,
    });
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: 'QUESTION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

export const raiseQuestion = (question) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('raise question', question)
  const uname = question.uname
  console.log('raise',uname)
  try {
    const res = await axios.post(`/${uname}/my-questions`, question, config);
    console.log('question actions',res.data)
    dispatch({
      type: res.data.type,
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

export const raiseComment = (comment) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const uname = comment.uname 
  // console.log('raise',uname) 
  try {
    const res = await axios.post(`/${uname}/${comment.quesid}/raisecomment`, comment, config);
     console.log('question actions raise comment',res.data)
    dispatch({
      type: 'RAISE_COMMENT',
      payload: res.data,
    });
    // dispatch(myQuestions(question.uname));
    // dispatch(recentQuestions());
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

export const checkAnswer = (id) => async (dispatch, getState) => {
  console.log('CHECK actions  ')
  const config = {
    headers: {
      'Content-Type': 'application/json' , 
    },
  };
  try {
    const res = await axios.get(`/check-answer/${id}`);
     console.log('CHECKQUESTION questionActions',res.data.checkquestion)
    dispatch({ 
      type: 'CHECK_ANSWER', 
      payload: res.data,
    });  
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));
    console.log(err)
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
    console.log('myQuestions questionActions',res.data)
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

export const sendMessage = (question, content, user) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('send message', question)
  try {
    const res = await axios.post(`/send-message`, {question, content, user}, config);
    console.log('question actions send message', res.data)
    dispatch({
      type: 'SEND_MESSAGE',
      payload: res.data,
    });
    dispatch(getMessages(question));
    // dispatch(setAlert(res.data.message, 'success'));

  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: 'QUESTION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

export const getMessages = (question) => async (dispatch, getState) =>{
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('get messages', question);
  const quesid = question._id
  try {
    const res = await axios.get(`/get-messages/${quesid}`);
    console.log('get messages', res.data)
    dispatch({ 
      type: 'GET_MESSAGES',
      payload: res.data,
    });
  } catch (err) {
    // dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: 'QUESTION_ERROR',
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

export const newMessage = (message) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('questionActions new message', message);
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
};