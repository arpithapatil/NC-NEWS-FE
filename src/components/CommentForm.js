import React from 'react';
import {connect} from 'react-redux';
import {putVote} from '../actions/comments';
import PT from 'prop-types';
import moment from 'moment';

class CommentForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      votes: this.props.comments.votes
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
  }

  voteClickHandler (event) {
    event.preventDefault();
    const article_id = this.props.article_id;
    const category = 'comment';
    const id = event.target.id;
    const input = event.target.name;
    const prevVotes = this.props.comments.votes;
    let newVotes;
    if (input === 'up') newVotes = prevVotes + 1;
    else  newVotes = prevVotes - 1;
    this.setState({
      votes: newVotes
    });
    this.props.putVote(input, id, category, article_id);
  }
  
  render () {
    const comment = this.props.comments;
    return (
      <div className='comment-form'>
        <div className='row'>
          <p className='comment-date'>{moment(comment.created_at).fromNow()}</p>
          <button className='comment-rmv-btn' name={comment.belongs_to} id={comment._id} onClick={this.props.removeHandler}> Remove </button>
        </div>
        <div className='row comment-body'>
          <p className='comment-b'>{comment.body}</p>
          <p className='comment-author'>By {comment.created_by}</p>
        </div>
        <div className='votes'>
          {(() => {
            if (this.props.loading) {
              return (
                <p className='vote-count'>{this.state.votes} votes</p>
              );
            }
            else {
              return (
                <p className='vote-count'>{comment.votes} votes</p>
              );
            } 
          })()}
          <input type="image" src="https://image.freepik.com/free-icon/thumbs-up-hand-symbol_318-41939.jpg" name="up" onClick={this.voteClickHandler} className="vote-btn" id={comment._id} />
          <input type="image" src="https://image.freepik.com/free-icon/thumbs-down-silhouette_318-41911.jpg" name="down" onClick={this.voteClickHandler} className="vote-btn" id={comment._id} />
        </div>
      </div>
    );
  }

  
}
  
const mapStateToProps = state => ({
  comments: state.comments.data,
  loading: state.comments.loading,
  error: state.comments.error
});

const mapDispatchToProps = dispatch => ({
  putVote: (input, id, category, article_id) => {
    dispatch(putVote(input, id, category, article_id));
  }
});

CommentForm.propTypes = {
  votes: PT.array.isRequired,
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  putVote: PT.func.isRequired,
  article_id: PT.string.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);