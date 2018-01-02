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

export const fetchOneArticleRequest = () => ({
  type: types.FETCH_ONE_ARTICLE_REQUEST
});

export const fetchOneArticleSuccess = (data) => ({
  type: types.FETCH_ONE_ARTICLE_SUCCESS,
  payload: data
});

export const fetchOneArticleFailure = (error) => ({
  type: types.FETCH_ONE_ARTICLE_FAILURE,
  payload: error
});

export const voteArticleRequest = () => ({
  type: types.VOTE_ARTICLES_REQUEST
});
  
export const voteArticleSuccess = (data) => ({
  type: types.VOTE_ARTICLES_SUCCESS,
  payload: data
});

export const voteArticleFailure = (error) => ({
  type: types.VOTE_ARTICLES_FAILURE,
  payload: error
});


export const fetchArticles = () => {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    return axios.get(`${API_URL}/articles`)
      .then((res) => {
        dispatch(fetchArticlesSuccess(res.data));
      })
      .catch((error) => {
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


export const fetchArticleById = (id) => {
  return (dispatch) => {
    dispatch(fetchOneArticleRequest());
    return axios.get(`${API_URL}/articles/${id}`)
      .then((res) => {
        dispatch(fetchOneArticleSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchOneArticleFailure(error.message));
      });
  };
};

export const putVote = (input, id, item) => {
  let category;
  if (item === 'article') {
    category = 'articles';
    return (dispatch) => {
      dispatch(voteArticleRequest());
      return axios.put(`${API_URL}/${category}/${id}?vote=${input}`)
        .then((res) => {
          dispatch(voteArticleSuccess(res.data));
        })
        .catch((error) => {
          dispatch(voteArticleFailure(error.message));
        });
    };
  }  
};

export const getMostPopular = () => {
  return (dispatch) => {
    dispatch(fetchArticlesRequest());
    return axios.get(`${API_URL}/articles`)
      .then((res) => {
        return res.data.sort((a, b) => {
          return b.votes - a.votes;
        });
      })
      .then((result) => {
        dispatch(fetchArticlesSuccess(result));
      })
      .catch((error) => {
        dispatch(fetchArticlesFailure(error.message));
      });
  };
};