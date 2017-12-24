import {expect} from 'chai';
import articlesReducer, {getInitialState} from '../../src/reducers/articleReducer';

import * as actionCreators from '../../src/actions/article';

describe('articleReducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = getInitialState();
      const action = {type: 'whatever'};
      const newState = articlesReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = articlesReducer(undefined, action);
      expect(newState).to.eql(getInitialState()); 
    });
  });
  describe('fetchArticles', () => {
    it('handles FETCH_ARTICLES_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.fetchArticlesRequest();
      const newState = articlesReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles FETCH_ARTICLES_SUCCESS', () => {
      const data = [3,6,9,12];
      const prevState = getInitialState();
      const action = actionCreators.fetchArticlesSuccess(data);
      const newState = articlesReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [3,6,9,12];
      const prevState = getInitialState();
      const action = actionCreators.fetchArticlesSuccess(data);
      const newState = articlesReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_ARTICLES_FAILURE', () => {
      const err = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.fetchArticlesFailure(err);
      const newState = articlesReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(err);
    });
  });

  describe('fetchArticle', () => {
    it('handles FETCH_ONE_ARTICLE_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.fetchOneArticleRequest();
      const newState = articlesReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles FETCH_ONE_ARTICLE_SUCCESS', () => {
      const data = [3,6,9,12];
      const prevState = getInitialState();
      const action = actionCreators.fetchOneArticleSuccess(data);
      const newState = articlesReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [3,6,9,12];
      const prevState = getInitialState();
      const action = actionCreators.fetchOneArticleSuccess(data);
      const newState = articlesReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles FETCH_ONE_ARTICLE_FAILURE', () => {
      const err = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.fetchOneArticleFailure(err);
      const newState = articlesReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(err);
    });
  });
});