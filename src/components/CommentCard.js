import React from 'react';
import {connect} from 'react-redux';
import {putVote} from '../actions/comment';
import PT from 'prop-types';
import moment from 'moment';

class CommentCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      votes: this.props.comment.votes
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
  }
  
  render () {
    const comment = this.props.comment;
    return (
      <div className='comment-item'>
        <div className='row'>
          <div className='votes'>
            <div className='col-xs-12 col-md-12'>
              <input type="image" src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/256x256/plain/arrow_up.png" name="up" onClick={this.voteClickHandler} className="vote-btn1c" id={comment._id} />
            
              {(() => {
                if (this.props.loading) {
                  return (
                    <p className='vote-countc'>{this.state.votes} votes</p>
                  );
                }
                else {
                  return (
                    <p className='vote-countc'>{comment.votes} votes</p>
                  );
                } 
              })()}
              <input type="image" src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/arrow_down.png" name="down" onClick={this.voteClickHandler} className="vote-btn2c" id={comment._id} />
            </div>
          </div>
          <p className='comment-author  col-md-4'>By {comment.created_by}</p>
          <button className='comment-rmv-btn ' name={comment.belongs_to} id={comment._id} onClick={this.props.removeHandler}> remove </button>
          
        </div>
        <div className='row comment-body'>
          <p className='comment-bod'>{comment.body}</p>
           
          <p className='comment-date'>{moment(comment.created_at).fromNow()}</p>
        </div>
       
          
         
        
      </div>
    );
  }

  voteClickHandler (e) {
    e.preventDefault();
    const article_id = this.props.article_id;
    const mode = 'comment';
    const id = e.target.id;
    const input = e.target.name;
    const prevVotes = this.props.comment.votes;
    let newVotes;
    if (input === 'up') newVotes = prevVotes + 1;
    else  newVotes = prevVotes - 1;
    this.setState({
      votes: newVotes
    });
    this.props.putVote(input, id, mode, article_id);
  }
}
  
const mapStateToProps = state => ({
  comments: state.comments.data,
  loading: state.comments.loading,
  error: state.comments.error
});

const mapDispatchToProps = dispatch => ({
  putVote: (input, id, mode, article_id) => {
    dispatch(putVote(input, id, mode, article_id));
  }
});

CommentCard.propTypes = {
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  putVote: PT.func.isRequired,
  article_id: PT.string.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);