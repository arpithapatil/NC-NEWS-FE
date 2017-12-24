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