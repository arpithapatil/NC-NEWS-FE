import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {fetchComments,fetchCommentsRequest, fetchCommentsSuccess, fetchCommentsFailure, postCommentFailure, postCommentSuccess, postCommentRequest, postComment}
  from '../../src/actions/comment';

import {API_URL} from '../../config';

const mockStore = configureMockStore([thunk]);

describe('Comment actions', () => {
  describe('fetchComments', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('dispatches FETCH_COMMENTS_SUCCESS and responds with status code 200 and article comments', () => {
      const article_id = '5a3ec848c2d8580b88825a5a';
      nock(API_URL)
        .get(`/articles/${article_id}/comments`)
        .reply(200, [1,2,3]);
          
      const expectedActions = [
        fetchCommentsRequest(),
        fetchCommentsSuccess([1,2,3])
      ];
      
      const store = mockStore();
      return store.dispatch(fetchComments(article_id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_COMMENTS_FAILURE when responds with an error', () => {
      const article_id = 'apple';
      const error = 'Page not found';
      nock(API_URL)
        .get(`/articles/${article_id}/comments`)
        .replyWithError({'message': error});
          
      const expectedActions = [
        fetchCommentsRequest(),
        fetchCommentsFailure(error)
      ];
      
      const store = mockStore();
      return store.dispatch(fetchComments(article_id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });

  describe('postComments', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('dispatches POST_COMMENT_SUCCESS and responds with status code 200 and comments', () => {
      const article_id = '5a13f64ad7681349fcb82bb1';
      const comment = 'good morning';
      nock(API_URL)
        .post(`/articles/${article_id}/comments`, {'comment': comment})
        .reply(200, [{
          body: comment, created_by: 'northcoder'
        }]);
      
      const expectedActions = [
        postCommentRequest(),
        postCommentSuccess([{body: comment, created_by: 'northcoder'}])
      ];
  
      const store = mockStore();
      return store.dispatch(postComment(article_id, comment))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches POST_COMMENT_FAILURE when responds with an error', () => {
      const article_id = '3786';
      const comment = 'good morning';
      const error = 'Invalid article ID';
      nock(API_URL)
        .post(`/articles/${article_id}/comments`, {'comment': comment})
        .replyWithError({'message': error});
      
      const expectedActions = [
        postCommentRequest(),
        postCommentFailure(error)
      ];
  
      const store = mockStore();
      return store.dispatch(postComment(article_id, comment))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});