import axios from 'axios';
import * as types from '../types';
import {API_URL} from '../../config';

export const fetchUsersRequest = (username) => ({
  type: types.FETCH_USERS_REQUEST,
  payload: username
});

export const fetchUsersSuccess = (data) => ({
  type: types.FETCH_USERS_SUCCESS,
  payload: data
});

export const fetchUsersFailure = (error) => ({
  type: types.FETCH_USERS_FAILURE,
  payload: error
});

export const fetchUsers = (username) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest(username));
    return axios.get(`${API_URL}/users/${username}`)
      .then(({data}) => {
        dispatch(fetchUsersSuccess(data.users));
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const fetchUsersData = (username) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest(username));
    return axios.get(`${API_URL}/users/${username}/repos`)
      .then(({data}) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};