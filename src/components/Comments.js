import React from 'react';
import {connect} from 'react-redux';
import {fetchComments, postComment, putVote} from '../actions/comment';
import PT from 'prop-types';


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
    const id = this.props.article_id;
    this.props.fetchComments(id);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.comments.length !== this.props.comments.length) {
      this.props.fetchComments(this.props.article_id);
    }
  }

  voteClickHandler(event) {
    event.preventDefault();
    const category = 'comment';
    const id = event.target.id;
    const input = event.target.name;
    this.props.putVote(input, id, category);
  }
  changeHandler(event) {
    event.preventDefault();
    const input = event.target.value;
    this.setState({
      comment: input
    });
  }
  submitHandler(event) {
    event.preventDefault();
    const id = this.props.article_id;
    const comment = this.state.comment;
    this.props.postComment(id, comment);
  }
  
  render () {
    return (
      <div className='main container-fluid'>  
        <div>
          {this.props.comments.map((comment) => {
            return (
              <div key={comment.created_at} className='comment-item'>
                <p>{comment.created_at}</p>
                <p className='comment-body'>{comment.body}</p>
                <p className='comment-author'>By {comment.created_by}</p>
                <div className='votes'>
                  <p>{comment.votes}</p>  
                  <input type="image" src="https://image.freepik.com/free-icon/thumbs-up-hand-symbol_318-41939.jpg" name="up" onClick={this.voteClickHandler} className="butTxt submit" id={comment._id} />
                  <input type="image" src="https://image.freepik.com/free-icon/thumbs-down-silhouette_318-41911.jpg" name="down" onClick={this.voteClickHandler} className="butTxt submit" id={comment._id} />
                </div>
              </div>
            );
          })}
          <div className = "comment-form">
            <form>
              <input onChange={this.changeHandler} type='text' placeholder="Type your comment here..."></input>
              <br></br>
              <input onClick={this.submitHandler} type='submit' value="Submit"></input>
            </form>
          </div>
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
  fetchComments: (id) => {
    dispatch(fetchComments(id));
  },
  changeVote: (input, id, category) => {
    dispatch(putVote(input, id, category));
  },
  addComment: (id, comment) => {
    dispatch(postComment(id, comment));
  }
});

Comments.propTypes = {
  comments: PT.array.isRequired,
  error: PT.any,
  article_id:PT.string.isRequired,
  fetchComments: PT.func.isRequired,
  putVote: PT.func.isRequired,
  postComment: PT.func.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);