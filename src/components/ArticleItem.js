import React from 'react';
import { fetchArticleById, putVote } from '../actions/article';
import { connect } from 'react-redux';
import Comments from './Comments';
import PT from 'prop-types';
import Loading from './Load';

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentFlag: false,
      votes: 0
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.showComments = this.showComments.bind(this);
    this.hideComments = this.hideComments.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchArticleById(id);
   
  }
 
  voteClickHandler(event) {
    event.preventDefault();
    const category = 'article';
    const id = event.target.id;
    const input = event.target.name;
    const prevVotes = this.props.articles[0].votes;
    let newVotes;
    if (input === 'up') newVotes = prevVotes + 1;
    else newVotes = prevVotes - 1;
    this.setState({
      votes: newVotes
    });
    this.props.putVote(input, id, category);
  }

  showComments() {
    this.setState({
      commentFlag: true
    });
  }
  hideComments() {
    this.setState({
      commentFlag: false
    });
  }

  render() {

    if (this.props.articles.length > 0) {
      const title = this.props.articles[0].title.split(' ').map((word) => {
        if (word.toLowerCase().match(/[aeiou]/)) {
          return word[0].toUpperCase() + word.slice(1).toLowerCase();
        }
        else return word.toUpperCase();
      }).join(' ');
      return (
        <div className='main container-fluid fulldisplay'>
          <div className='article-item'>
            <div className='art-title row'>
              <div className='col-xs-12 col-md-1 votes-article-item'>

                <input type="image" src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/256x256/plain/arrow_up.png" name="up" onClick={this.voteClickHandler} className="vote-btn1" id={this.props.articles[0]._id} />

                {(() => {
                  if (this.props.loading) {
                    return (
                      <p className='vote-count'>{this.state.votes} votes</p>
                    );
                  }
                  else {
                    return (
                      <p className='vote-count'>{this.props.articles[0].votes} votes</p>
                    );
                  }
                })()}

                <input type="image" src="https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/arrow_down.png" name="down" onClick={this.voteClickHandler} className="vote-btn2" id={this.props.articles[0]._id} />

              </div>
              <p className='col-xs-12 col-md-11 article-title'>{title}</p>
              <p className='col-xs-12 col-md-11 article-author'>By {this.props.articles[0].created_by}</p>
            </div>
            <p>{this.props.articles[0].body}</p>
            {(() => {
              if (this.state.commentFlag) {
                return (
                  <button className='comment-p' onClick={this.hideComments}>Hide comments</button>
                );
              }
              else return (
                <button className='comment-p' onClick={this.showComments}>Show comments</button>
              );
            })()}
          </div>

          {(() => {
            if (this.state.commentFlag) {
              return (
                <div className='comment-component'>
                  <Comments article_id={this.props.match.params.article_id} />
                </div>
              );
            }
          })()}
        </div>
      );
    }
    else {
      return (
        <Loading />
      );
    }

  }

}

const mapStateToProps = (state) => ({
  articles: state.articles.data,
  loading: state.articles.loading,
  error: state.articles.error,
});

const mapDispatchToProps = dispatch => ({
  fetchArticleById: (id) => {
    dispatch(fetchArticleById(id));
  },
  putVote: (input, id, category) => {
    dispatch(putVote(input, id, category));
  }
});

ArticleItem.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticleById: PT.func.isRequired,
  putVote: PT.func.isRequired,
  match: PT.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);