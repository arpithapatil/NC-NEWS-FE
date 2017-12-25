import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../../config';
const mockStore = configureMockStore([thunk]);

import  {
  fetchUsers, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, fetchUsersData
} from '../../src/actions/user';


describe('Users actions', () => {
  describe('fetchUsers', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('dispatches FETCH_USERS_SUCCESS when getting user by username and responds with 200 and data', () => {
      const username = 'tickle122';
      const users = [
        {
          '_id': '5a033990e03644b9fab52893',
          'username': 'tickle122',
          'name': 'Tom Tickle',
          'avatar_url': 'http://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
          '__v': 0
        }
      ];
      nock(API_URL)
        .get(`/users/${username}`)
        .reply(200, {users});
    
      const expectedActions = [
        fetchUsersRequest(username),
        fetchUsersSuccess(users)
      ];

      const store = mockStore();

      return store.dispatch(fetchUsers(username))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });

    });
    it('dispatched FETCH_USERS_FAILURE when getting user and responds with an error when repo does not exsist', () => {
      const wrong_username = 'apple';
      const error = 'USERNAME NOT FOUND';
      nock(API_URL)
        .get(`/users/${wrong_username}`)
        .replyWithError({'message': error});
    
      const expectedActions = [
        fetchUsersRequest(wrong_username),
        fetchUsersFailure(error)
      ];

      const store = mockStore();
    
      return store.dispatch(fetchUsers(wrong_username))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});

describe('fetchUsersData', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('dispatches FETCH_USERS_SUCCESS when getting user repo by username and responds with 200 and data', () => {
    const username = 'tickle122';
    const data = {
      articles: [1],
      comments: [1]
    };
    nock(API_URL)
      .get(`/users/${username}/repos`)
      .reply(200, data);
      
    const expectedActions = [
      fetchUsersRequest(username),
      fetchUsersSuccess(data)
    ];
  
    const store = mockStore();
  
    return store.dispatch(fetchUsersData(username))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  
  });
});

 

  
  