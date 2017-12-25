import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {fetchArticles, fetchArticlesByTopic,fetchArticlesRequest,fetchArticlesSuccess, fetchArticlesFailure, fetchOneArticleRequest, fetchOneArticleSuccess, fetchOneArticleFailure,
  fetchArticleById, putVote, voteArticleFailure, voteArticleSuccess, voteArticleRequest, getMostPopular
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
    const topic = 'orange';
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

describe('fetchArticlesById', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('dispatches FETCH_ONE_ARTICLE_SUCCESS and responds with status code 200 and correct article', () => {
    const article_id = '5a13f64ad7681349fcb82bb1';
    nock(API_URL)
      .get(`/articles/${article_id}`)
      .reply(200, ['article']);
    
    const expectedActions = [
      fetchOneArticleRequest(),
      fetchOneArticleSuccess(['article'])
    ];

    const store = mockStore();
    return store.dispatch(fetchArticleById(article_id))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('dispatches FETCH_ONE_ARTICLE_FAILURE when responds with an error', () => {
    const error = 'Invalid article ID';
    const article_id = '786';
    nock(API_URL)
      .get(`/articles/${article_id}`)
      .replyWithError({'message': error});
    
    const expectedActions = [
      fetchOneArticleRequest(),
      fetchOneArticleFailure(error)
    ];

    const store = mockStore();
    return store.dispatch(fetchArticleById(article_id))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});

describe('putVote', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('dispatches VOTE_ARTICLE_SUCCESS and responds with status code 200 and article', () => {
    const article_id = '5a13f64ad7681349fcb82bb1';
    const input = 'up';
    const item = 'article';
    nock(API_URL)
      .put(`/articles/${article_id}?vote=${input}`)
      .reply(200, ['article']);
    
    const expectedActions = [
      voteArticleRequest(),
      voteArticleSuccess(['article'])
    ];

    const store = mockStore();
    return store.dispatch(putVote(input, article_id, item))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('dispatches VOTE_ARTICLE_FAILURE when responds with an error', () => {
    const error = 'Invalid article ID';
    const article_id = '123';
    const input = 'up';
    const item = 'article';
    nock(API_URL)
      .put(`/articles/${article_id}?vote=${input}`)
      .replyWithError({'message': error});
    
    const expectedActions = [
      voteArticleRequest(),
      voteArticleFailure(error)
    ];

    const store = mockStore();
    return store.dispatch(putVote(input, article_id, item))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});

describe('getMostPopular', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('dispatches FETCH_ARTICLES_SUCCESS and responds with status code 200 and articles', () => {
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
    const error = 'page not found';
    nock(API_URL)
      .get('/articles')
      .replyWithError({'message': error});
    
    const expectedActions = [
      fetchArticlesRequest(),
      fetchArticlesFailure(error)
    ];

    const store = mockStore();
    return store.dispatch(getMostPopular())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});
