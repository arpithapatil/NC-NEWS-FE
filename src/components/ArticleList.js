import React from 'react';
import {connect} from 'react-redux';
import {fetchArticlesByTopic} from '../actions/article';
import {NavLink} from 'react-router-dom';
import PT from 'prop-types';

class ArticleList extends React.Component {
  componentDidMount() {
    const topic = this.props.match.params.topic;
    this.props.fetchArticlesByTopic(topic);
  }

  render () {
    return (
      <div>
        <h1>Northcoders News</h1>
        <div className='topic-articles'>
          <h2>Articles</h2>
          {this.props.articles.map((article) => {
            const topic = article.belongs_to;
            return (
              <div key={article.title}>
                <p><NavLink to={`/articles/${article._id}`}>{article.title}</NavLink></p>
                <p>{topic}</p>
                <p>{article.votes}</p>
                <p><NavLink to={`/articles/${article._id}/comments`}>{article.comments}</NavLink></p>
              </div>
            );
          })}
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
  }
});


ArticleList.propTypes = {
  articles: PT.array.isRequired,
  error: PT.any,
  fetchArticlesByTopic: PT.func.isRequired,
  match: PT.any.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);