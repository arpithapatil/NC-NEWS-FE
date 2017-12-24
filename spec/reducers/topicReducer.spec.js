import {expect} from 'chai';
import topicsReducer, {initialState} from '../../src/reducers/topicReducer';
import {
  fetchTopicsRequest,
  fetchTopicsSuccess,
  fetchTopicsFailure
} from '../../src/actions/topic';


describe('topics reducer', () => {
  describe('fetchTopics', () => {
    it('updates the state loading property when requesting topics', () => {
      const action = fetchTopicsRequest();
      const newState = topicsReducer(initialState, action);
  
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('does not modify the original state when handling a request action', () => {
      const action = fetchTopicsRequest();
      const newState = topicsReducer(initialState, action);
  
      expect(newState).to.not.equal(initialState);
    });
    it('updates the state with the correct data when succesfully receiving topics', () => {
      const data = ['topic1', 'topic2', 'topic3'];
      const prevState = topicsReducer(initialState, fetchTopicsRequest());
      const action = fetchTopicsSuccess(data);
      const newState = topicsReducer(prevState, action);
  
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
    });
    it('does not modify the original state when handling a succesful fetchTopics action', () => {
      const data = ['topic1', 'topic2', 'topic3'];
      const prevState = topicsReducer(initialState, fetchTopicsRequest());
      const action = fetchTopicsSuccess(data);
      const newState = topicsReducer(prevState, action);
  
      expect(newState).to.not.equal(prevState);
    });
    it('updates the state correctly when recieving an error message', () => {
      const error = 'error - unsuccessful request';
      const prevState = topicsReducer(initialState,fetchTopicsRequest());
      const action = fetchTopicsFailure(error);
      const newState = topicsReducer(prevState, action);
  
      expect(newState.loading).to.be.false;
      expect(newState.error).to.equal(error);
      expect(newState.data).to.eql([]);
    });
    it('does not modify the original state when handling a fetch failure action', () => {
      const error = 'error - unsuccessful request';
      const prevState = topicsReducer(initialState, fetchTopicsRequest());
      const action = fetchTopicsFailure(error);
      const newState = topicsReducer(prevState, action);
  
      expect(newState).to.not.equal(prevState);
    });
  });
  
});