import React from 'react';
import {connect} from 'react-redux';
import {fetchArticlesByTopic, putVote} from '../actions/article';
import {NavLink} from 'react-router-dom';
import PT from 'prop-types';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.voteClickHandler = this.voteClickHandler.bind(this);
  }

  componentDidMount() {
    const topic = this.props.match.params.topic;
    this.props.fetchArticlesByTopic(topic);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.topic !== this.props.match.params.topic) {
      this.props.fetchArticlesByTopic(nextProps.match.params.topic);
    }
  }

  voteClickHandler(event) {
    event.preventDefault();
    const category = 'article';
    const id = event.target.id;
    const input = event.target.value;
    this.props.putVote(input, id, category);
  }

  render () {
    const topicTitle = this.props.match.params.topic[0].toUpperCase() + this.props.match.params.topic.slice(1);
    return (
      <div className='main container-fluid'>
        <div className='topic-articles'>
          <h2>{topicTitle}</h2>
          <div className='row'>
            {this.props.articles.map((article) => {
              const title = article.title.split(' ').map((word) => {
                return word[0].toUpperCase() + word.slice(1).toLowerCase();
              }).join(' ');
              return (
                <div key={article.title} className='col-xs-12 col-md-4 articles'>
                  <h4><NavLink to={`/articles/${article._id}`}>{title}</NavLink></h4>
                  {(() => {
                    if (article.title.length < 50) {
                      return (
                        <br/>  
                      );
                    }
                  })()}
                  <div className='row article-details'>
                    <div className='col-md-4 comments'>
                      <p className='col-md-4'><NavLink to={`/articles/${article._id}/comments`}>{article.comments} comments</NavLink></p>
                    </div>
                    <div className='col-md-4 votes'>
                      <img className='thumb' src='https://image.freepik.com/free-icon/thumbs-up-hand-symbol_318-41939.jpg' alt='votes' />
                      <p className='col-md-4'>{article.votes}</p>
                    </div> 
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles.data,
  loading: state.articles.loading,
  error: state.articles.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticlesByTopic: (topic) => {
    dispatch(fetchArticlesByTopic(topic));
  },
  putVote: (input, id, category) => {
    dispatch(putVote(input, id, category));
  }
});


ArticleList.propTypes = {
  articles: PT.array.isRequired,
  error: PT.any,
  fetchArticlesByTopic: PT.func.isRequired,
  putVote: PT.func.isRequired,
  match: PT.any.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);