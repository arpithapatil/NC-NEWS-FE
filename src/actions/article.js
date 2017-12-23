import axios from 'axios';
import * as types from '../types';

import {API_URL} from '../../config';

export const fetchArticlesRequest = () => ({
  type: types.FETCH_ARTICLES_REQUEST
});

export const fetchArticlesSuccess = (data) => ({
  type: types.FETCH_ARTICLES_SUCCESS,
  payload: data
});

export const fetchArticlesFailure = (error) => ({
  type: types.FETCH_ARTICLES_FAILURE,
  payload: error
});

export const fetchArticles = () => {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    return axios.get(`${API_URL}/articles`)
      .then(res => {
        dispatch(fetchArticlesSuccess(res.data));
      }) 
      .catch(error => {
        dispatch(fetchArticlesFailure(error.message));
      });
  };
};

export const fetchArticlesByTopic = (topic) => {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    return axios.get(`${API_URL}/topics/${topic}/articles`)
      .then((res) => {
        dispatch(fetchArticlesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchArticlesFailure(error.message));
      });
  };
};