import React from 'react';
import {connect} from 'react-redux';
import {getMostPopular} from '../actions/article';
import {NavLink} from 'react-router-dom';
import PT from 'prop-types';

export class HomePage extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.getMostPopular();
  }

  render () {
    return (
      <div className='main container-fluid'>
        <div className='appear-articles'>
          <h2 className='mostpopular'>Most Popular Stories</h2>
          <div className='row'>
            {this.props.articles.map((article, i) => {
              const title = article.title.split(' ').map((word) => {
                if (word.toLowerCase().match(/[aeiou]/)) {
                  return word[0].toUpperCase() + word.slice(1).toLowerCase();
                }
                else return word.toUpperCase();
              }).join(' ');
              while (i < 15) {
                return (
                  <div key={article.title} className=' col-xs-8 col-md-offset-6 articles '>
                    <div className='row'>
                      <div className='col-md-2'>
                        {/* <img className='arrowup' src='https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/256x256/plain/arrow_up.png' alt='votes' /> */}
                        <p className='num'>{article.votes} votes</p>
                        {/* <img className='arrowdown' src='https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/arrow_down.png' alt='votes' /> */}
                      </div>
                      <div className='col-md-8 '>
                        <h3><NavLink to={`/articles/${article._id}`} className='article-title-box'>{title}<br /></NavLink></h3>
                      </div>
                      <div className='col-md-2'>
                        <p><NavLink className='comment-link' commentflag='true' to={`/articles/${article._id}/comment`}>{article.comments}<br />comments</NavLink></p>
                      </div>
                    </div>
                  </div>

                );
              }
            }

            )}
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
  getMostPopular: () => {
    dispatch(getMostPopular());
  }

});

HomePage.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  getMostPopular: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);