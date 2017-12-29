import React from 'react';
import {connect} from 'react-redux';
import {getMostPopular} from '../actions/article';
import {NavLink} from 'react-router-dom';
import PT from 'prop-types';

export class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMostPopular();
  }
  render () {
    return (
      <div className='main container-fluid'>
        <div className='pop-articles'>
          <h2>Most Popular Stories</h2>
          <div className='row'>
            {this.props.articles.map((article, i) => {
              const title = article.title.split(' ').map((word) => {
                return word[0].toUpperCase() + word.slice(1).toLowerCase();
              }).join(' ');
              while (i < 12) {
                return (
                  <div key={article.title} className='col-xs-12 col-md-4 articles '>
                    <h4><NavLink to={`/articles/${article._id}`}>{title}<br/></NavLink></h4>
                    {(() => {
                      if (article.title.length < 50) {
                        return (
                          <br/>  
                        );
                      }
                    })()}
                    <div className='row article-details'>
                      <div className='col-md-4 comments'>
                        <p className='col-md-4'><NavLink to={`/articles/${article._id}/comments`}>{article.comments}<br/>comments</NavLink></p>
                      </div>
                      <div className='col-md-4 votes'>
                        <img className='thumb' src='https://image.freepik.com/free-icon/thumbs-up-hand-symbol_318-41939.jpg' alt='votes' />
                        <p className='col-md-4'>{article.votes}</p>
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

Homepage.propTypes = {
  articles: PT.array.isRequired,
  error: PT.any,
  getMostPopular: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);