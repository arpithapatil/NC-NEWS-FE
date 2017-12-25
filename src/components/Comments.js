import React from 'react';
import {connect} from 'react-redux';
import {fetchComments} from '../actions/comment';
import PT from 'prop-types';

class Comments extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchComments(id);
  }
  render () {
    return (
      <div>
        <h1>Comments</h1>
        {this.props.comments.map((comment) => {
          return (
            <div key={comment.created_at}>
              <p>{comment.created_at}</p>
              <p>{comment.body}</p>
              <p>{comment.created_by}</p>
              <p>{comment.votes}</p>
            </div>
          );
        })}
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
  }
});

Comments.propTypes = {
  comments: PT.array.isRequired,
  error: PT.any,
  fetchComments: PT.func.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);