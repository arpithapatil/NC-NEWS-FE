import React from 'react';
import {fetchArticleById, putVote} from '../actions/article';
import {connect} from 'react-redux';
import Comments from './Comments';
import PT from 'prop-types';


class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCoin: false
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.showComments = this.showComments.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchArticleById(id);
  }

  voteClickHandler(event) {
    event.preventDefault();
    const mode = 'article';
    const id = event.target.id;
    const input = event.target.name;
    this.props.putVote(input, id, mode);
  }

  showComments() {
    this.setState({
      commentCoin: true
    });
  }


  render () {
    return (
      <div className='main container-fluid'>
        <div className='article-item row'>
          <p className ='article-title'>{this.props.articles.title}</p>
          <p className ='article-author'>By {this.props.articles.created_by}</p>
          <p>{this.props.articles.body}</p>
        </div>
        <div className='article-comments row'>
          <div className='col-md-6 votes'>
            <input type="image" src="https://image.freepik.com/free-icon/thumbs-up-hand-symbol_318-41939.jpg" name="up" onClick={this.voteClickHandler} className="butTxt submit" id={this.props.articles._id} />
            <input type="image" src="https://image.freepik.com/free-icon/thumbs-down-silhouette_318-41911.jpg" name="down" onClick={this.voteClickHandler} className="butTxt submit" id={this.props.articles._id} />
            <p>{this.props.articles.votes}</p>
          </div>
          <div className='col-md-6 comments'>
            <a className='comment-coin' onClick={this.showComments}>{this.props.articles.comments} comments</a>      
          </div>
        </div>
        <div className='comment-component'>
          {(() => {
            if (this.state.commentCoin) {
              return (
                <Comments article_id={this.props.match.params.article_id}/>
              );
            }
          })()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles.data[0],
  loading: state.articles.loading,
  error: state.articles.error,
});

const mapDispatchToProps = dispatch => ({
  fetchArticleById: (id) => {
    dispatch(fetchArticleById(id));
  },
  changeVote: (input, id, mode) => {
    dispatch(putVote(input, id, mode));
  }
});

ArticleItem.propTypes = {
  articles: PT.array.isRequired,
  error: PT.any,
  fetchArticleById: PT.func.isRequired,
  putVote: PT.func.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);