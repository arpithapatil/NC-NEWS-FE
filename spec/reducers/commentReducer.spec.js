import {expect} from 'chai';
import commentsReducer, {getInitialState} from '../../src/reducers/commentReducer';
import *  as actionCreators from '../../src/actions/comment';

describe('comments reducer', () => {
  const topic = 'coding';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const prevState = getInitialState();  
      const action = {type: 'whatever'};
      const newState = commentsReducer(prevState, action);
      expect(newState).to.equal(prevState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = commentsReducer(undefined, action);
      expect(newState).to.eql(getInitialState());
    });
  });
  describe('fetchComments', () => {
    it('handles FETCH_COMMENTS_REQUEST', () => {
      const action =actionCreators.fetchCommentsRequest(topic);
      const newState = commentsReducer(undefined, action);
      expect(newState.loading).to.be.true;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql([]);
    });
    it('handles FETCH_COMMENTS_SUCCESS', () => {
      const prevState = commentsReducer(undefined, actionCreators.fetchCommentsRequest(topic));
      const data = [1,2,3];
      const action = actionCreators.fetchCommentsSuccess(data);
      const newState = commentsReducer(prevState, action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.be.null;
      expect(newState.data).to.eql(data);
    });

    it('should not mutate previous state', () => {
      const data = [2,7,5];
      const prevState = getInitialState();
      const action = actionCreators.fetchCommentsSuccess(data);
      const newState = commentsReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
      
    it('handles FETCH_COMMENTS_FAILURE', () => {
      const prevState = commentsReducer(undefined, actionCreators.fetchCommentsRequest());
      const error = 'Something went wrong';
      const action = actionCreators.fetchCommentsFailure(error);
      const newState = commentsReducer(prevState,action);
      expect(newState.loading).to.be.false;
      expect(newState.error).to.eql(error);
      expect(newState.data).to.eql([]);
    });
  });

  describe('postComment', () => {
    const id = '5a13f64ad7681349fcb82bbe';
    const comment = 'good morning';
    it('handles POST_COMMENTS_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.postCommentRequest(id, comment);
      const newState = commentsReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles POST_COMMENTS_SUCCESS', () => {
      const data = [{body: 'good morning'}];
      const prevState = getInitialState();
      const action = actionCreators.postCommentSuccess(data);
      const newState = commentsReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [{body: 'good morning'}];
      const prevState = getInitialState();
      const action = actionCreators.postCommentSuccess(data);
      const newState = commentsReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles POST_COMMENTS_FAILURE', () => {
      const error = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.postCommentFailure(error);
      const newState = commentsReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(error);
    });
  });

  describe('putVote', () => {
    it('handles VOTE_COMMENT_REQUEST', () => {
      const prevState = getInitialState();
      const action = actionCreators.voteCommentRequest();
      const newState = commentsReducer(prevState, action);
      expect(newState.loading).to.equal(true);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(null);
    });
    it('handles VOTE_COMMENT_SUCCESS', () => {
      const data = [1,2,3];
      const prevState = getInitialState();
      const action = actionCreators.voteCommentSuccess(data);
      const newState = commentsReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql(data);
      expect(newState.error).to.equal(null);
    });
    it('should not mutate previous state', () => {
      const data = [1,2,3];
      const prevState = getInitialState();
      const action = actionCreators.voteCommentSuccess(data);
      const newState = commentsReducer(prevState, action);
      expect(newState).to.not.equal(prevState);
      expect(newState.data).to.not.equal(prevState.data);
    });
    it('handles VOTE_COMMENT_FAILURE', () => {
      const error = 'something went wrong';
      const prevState = getInitialState();
      const action = actionCreators.voteCommentFailure(error);
      const newState = commentsReducer(prevState, action);
      expect(newState.loading).to.equal(false);
      expect(newState.data).to.eql([]);
      expect(newState.error).to.equal(error);
    });
  });
});