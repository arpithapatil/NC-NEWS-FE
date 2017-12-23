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

export const fetchComments = (article_id) => {
  return (dispatch) => {
    dispatch(fetchCommentsRequest(article_id));
    return axios.get(`${API_URL}/articles/${article_id}/comments`)
      .then(({data}) => {
        dispatch(fetchCommentsSuccess(data.comments));
      })
      .catch(error => {
        dispatch(fetchCommentsFailure(error.message));
      });
  };
};