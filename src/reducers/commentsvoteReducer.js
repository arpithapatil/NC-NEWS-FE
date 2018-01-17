import * as types from '../types/index';

export const initialState = {
  loading: false,
  error: null,
  data: []
};

export default (prevState = initialState, action) => {
  if (action.type === types.FETCH_COMMENTS_REQUEST) {
    let newState = Object.assign({}, prevState);
    newState.loading = true;
    newState.error = null;
    newState.data = [];
    return newState;
  }
  if (action.type === types.FETCH_COMMENTS_SUCCESS) {
    let newState = Object.assign({}, prevState);
    const comments = action.payload;
    newState.loading = false;
    newState.error = null;
    newState.data = comments;
    return newState;
  }
  if (action.type === types.FETCH_COMMENTS_FAILURE) {
    let newState = Object.assign({}, prevState);
    const error = action.payload;
    newState.loading = false;
    newState.error = error;
    newState.data = [];
    return newState;
  }
  if (action.type === types.POST_COMMENTS_REQUEST) {
    let newState = Object.assign({}, prevState);
    newState.loading = true;
    newState.error = null;
    newState.data = prevState.data;
    return newState;
  }
  if (action.type === types.POST_COMMENTS_SUCCESS) {
    let newState = Object.assign({}, prevState);
    const comments = action.payload;
    newState.loading = false;
    newState.error = null;
    newState.data = prevState.data.concat(comments);
    return newState;
  }
  if (action.type === types.POST_COMMENTS_FAILURE) {
    let newState = Object.assign({}, prevState);
    const error = action.payload;
    newState.loading = false;
    newState.error = error;
    newState.data = [];
    return newState;
  }

  if (action.type === types.VOTE_COMMENTS_REQUEST) {
    let newState = Object.assign({}, prevState);
    newState.loading = true;
    newState.error = null;
    newState.data = prevState.data;
    return newState;
  }
  if (action.type === types.VOTE_COMMENTS_SUCCESS) {
    let newState = Object.assign({}, prevState);
    const comments = action.payload[0];
    newState.loading = false;
    newState.error = null;
    newState.data = newState.data.map(comment => {
      if (comment._id === comments._id) comment.votes = comments.votes;
      return comment; 
    });
    return newState;
  }
  if (action.type === types.VOTE_COMMENTS_FAILURE) {
    let newState = Object.assign({}, prevState);
    const error = action.payload;
    newState.loading = false;
    newState.error = error;
    newState.data = [];
    return newState;
  }
  return prevState;
};
 