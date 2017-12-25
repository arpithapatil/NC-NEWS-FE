import * as types from '../types';
import axios from 'axios';
import { API_URL } from '../../config';

export const fetchTopicsRequest = () => ({
  type: types.FETCH_TOPICS_REQUEST
});

export const fetchTopicsSuccess = topics => ({
  type: types.FETCH_TOPICS_SUCCESS,
  payload: topics
});

export const fetchTopicsFailure = error => ({
  type: types.FETCH_TOPICS_FAILURE,
  payload: error
});

export const fetchTopics = () => {
  return (dispatch) => {
    const PATH = 'topics';
    dispatch(fetchTopicsRequest());
    return axios.get(`${API_URL}/${PATH}`)
      .then(res => {
        dispatch(fetchTopicsSuccess(res.data.topics));
      })
      .catch(error => dispatch(fetchTopicsFailure(error.message)));
  };
};