import axios from 'axios';
import * as types from '../types';
import {API_URL} from '../../config';

export const fetchCommentsRequest = (article_id) => ({
  type: types.FETCH_COMMENTS_REQUEST,
  payload: article_id
});

export const fetchCommentsSuccess = (data) => ({
  type: types.FETCH_COMMENTS_SUCCESS,
  payload: data
});

export const fetchCommentsFailure = (error) => ({
  type: types.FETCH_COMMENTS_FAILURE,
  payload: error
});

export const postCommentRequest = () => ({
  type: types.POST_COMMENTS_REQUEST
});
  
export const postCommentSuccess = (data) => ({
  type: types.POST_COMMENTS_SUCCESS,
  payload: data
});
  
export const postCommentFailure = (error) => ({
  type: types.POST_COMMENTS_FAILURE,
  payload: error
});

export const voteCommentRequest = () => ({
  type: types.VOTE_COMMENTS_REQUEST
});
  
export const voteCommentSuccess = (data) => ({
  type: types.VOTE_COMMENTS_SUCCESS,
  payload: data
});
  
export const voteCommentFailure = (error) => ({
  type: types.VOTE_COMMENTS_FAILURE,
  payload: error
});


export const fetchComments = (id) => {
  return (dispatch) => {
    dispatch(fetchCommentsRequest());
    return axios.get(`${API_URL}/articles/${id}/comments`)
      .then((res) => {
        return res.data.sort((a, b) => {
          return b.created_at - a.created_at;
        });
      })
      .then((sortedComments) => {
        dispatch(fetchCommentsSuccess(sortedComments));
      })
      .catch((error) => {
        dispatch(fetchCommentsFailure(error.message));
      });
  };
};

export const postComment = (id, comment) => {
  return (dispatch) => {
    dispatch(postCommentRequest());
    return axios.post(`${API_URL}/articles/${id}/comments`, {'comment': comment})
      .then((res) => {
        if (res.data.length > 1) {
          return res.data.filter((comment) => {
            return comment.belongs_to === id; 
          }).sort((a, b) => {
            return b.created_at - a.created_at;
          });
        }
        else return res.data;
      })
      .then((comments) => {
        dispatch(postCommentSuccess(comments));
      })
      .catch((error) => {
        dispatch(postCommentFailure(error.message));
      });
  };

};

export const putVote = (input, id, item, article_id) => {
  let category;
  if (item === 'comment') {
    category = 'comments';
    return (dispatch) => {
      dispatch(voteCommentRequest());
      return axios.put(`${API_URL}/${category}/${id}?vote=${input}`, {'article_id': article_id})
        .then((res) => {
          return res.data.sort((a, b) => {
            return b.created_at - a.created_at;
          });
        })
        .then((sortedComments) => {
          dispatch(voteCommentSuccess(sortedComments));
        })
        .catch((error) => {
          dispatch(voteCommentFailure(error.message));
        });
    };
  }
};