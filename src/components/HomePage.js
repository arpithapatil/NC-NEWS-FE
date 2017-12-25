import React from 'react';
import {connect} from 'react-redux';
import {getMostPopular} from '../actions/article';
import {NavLink} from 'react-router-dom';
import PT from 'prop-types';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMostPopular();
  }
  render () {
    return (
      <div>
        <div className='pop-articles'>
          <h2>Most Popular Stories</h2>
          {this.props.articles.map((article, i) => {
            const topic = article.belongs_to;
            while (i < 6) {
              return (
                <div key={article.title}>
                  <p><NavLink to={`/articles/${article._id}`}>{article.title}</NavLink></p>
                  <p><NavLink to={`/${topic}`}>{topic}</NavLink></p>
                  <p>{article.votes}</p>
                  <p><NavLink to={`/articles/${article._id}/comments`}>{article.comments}</NavLink></p>
                </div>
              );
            }
          }
          )}
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
  getMostPopular: () => {
    dispatch(getMostPopular());
  }
});

Homepage.propTypes = {
  articles: PT.array.isRequired,
  error: PT.any,
  getMostPopular: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);