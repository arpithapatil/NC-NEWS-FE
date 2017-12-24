import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {fetchArticles, fetchArticlesByTopic,fetchArticlesRequest,fetchArticlesSuccess, fetchArticlesFailure
  
} from '../../src/actions/article';

import  {API_URL} from '../../config';

const mockStore = configureMockStore([thunk]);

describe('Article actions', () => {
  describe('fetchArticles', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('dispatches FETCH_ARTICLES_SUCCESS and responds with status code 200 and all articles', () => {
      nock(API_URL)
        .get('/articles')
        .reply(200, [1,2,3]);
        
      const expectedActions = [
        fetchArticlesRequest(),
        fetchArticlesSuccess([1,2,3])
      ];
    
      const store = mockStore();
      return store.dispatch(fetchArticles())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_ARTICLES_FAILURE when responds with an error', () => {
      nock(API_URL)
        .get('/articles')
        .replyWithError({'message': 'error'});
        
      const expectedActions = [
        fetchArticlesRequest(),
        fetchArticlesFailure('error')
      ];
    
      const store = mockStore();
      return store.dispatch(fetchArticles())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });

    
});describe('fetchArticlesByTopic', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('dispatches FETCH_ARTICLES_SUCCESS and responds with status code 200 and articles', () => {
    const topic = 'coding';
    nock(API_URL)
      .get(`/topics/${topic}/articles`)
      .reply(200, [1,2,3]);
    
    const expectedActions = [
      fetchArticlesRequest(),
      fetchArticlesSuccess([1,2,3])
    ];

    const store = mockStore();
    return store.dispatch(fetchArticlesByTopic(topic))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('dispatches FETCH_ARTICLES_FAILURE when responds with an error', () => {
    const error = 'Topic not Found';
    const topic = 'blue';
    nock(API_URL)
      .get(`/topics/${topic}/articles`)
      .replyWithError({'message': error});
    
    const expectedActions = [
      fetchArticlesRequest(),
      fetchArticlesFailure(error)
    ];

    const store = mockStore();
    return store.dispatch(fetchArticlesByTopic(topic))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});