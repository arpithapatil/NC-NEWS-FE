import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {fetchTopics, fetchTopicsRequest,fetchTopicsSuccess, fetchTopicsFailure
  
} from '../../src/actions/topic';

import  {API_URL} from '../../config';

const mockStore = configureMockStore([thunk]);


describe('topics actions', () => {
  describe('fetchTopics', () => {
    it('dispatches FETCH_TOPICS_SUCCESS when recieving data with status code 200', () => {
      nock(API_URL)
        .get('/topics')
        .reply(200, {
          topics: ['topic1', 'topic2', 'topic3']
        });

      const expectedActions = [
        fetchTopicsRequest(),
        fetchTopicsSuccess(['topic1', 'topic2', 'topic3'])
      ];
      const store = mockStore();

      return store.dispatch(fetchTopics())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches FETCH_TOPICS_FAILURE when receiving an error', () => {
      const error = { message: 'error - topics not available' };
      nock(API_URL)
        .get('/topics')
        .replyWithError(error.message);

      const expectedActions = [
        fetchTopicsRequest(),
        fetchTopicsFailure(error.message)
      ];

      const store = mockStore();

      return store.dispatch(fetchTopics())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});

