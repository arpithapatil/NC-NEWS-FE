import {expect} from 'chai';
import UsersReducer, {initialState} from '../../src/reducers/userReducer';

import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess
} from '../../src/actions/user';

describe('Users reducer', () => {
  const username = 'tickle122';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = UsersReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = UsersReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles GET_USER_REQUEST', () => {
    const action = fetchUsersRequest(username);
    const newState = UsersReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles GET_USER_SUCCESS', () => {
    const prevState = UsersReducer(undefined, fetchUsersRequest(username));
    const data = [1];
    const action = fetchUsersSuccess(data);
    const newState = UsersReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles GET_USER_FAILURE', () => {
    const prevState = UsersReducer(undefined, fetchUsersRequest());
    const error = 'USERNAME NOT FOUND';
    const action = fetchUsersFailure(error);
    const newState = UsersReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});