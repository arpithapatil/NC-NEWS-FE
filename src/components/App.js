import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ArticleItem from './ArticleItem';
import ArticleList from './ArticleList';
import Article from './Article';
import Comments from './Comments';
import NavBar from './NavBar';
import NoMatch from './NoMatch';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div> 
        <BrowserRouter>
          <section>
            <div>
              <NavBar />
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/:topic' component={ArticleList} />
                <Route exact path='/articles' component={ArticleList} />
                <Route exact path='/articles/:article_id' component={ArticleItem} />
                <Route exact path='/articles/:article_id/comment' component={Article}/>
                <Route path='/articles/:article_id/comments' component={Comments} />
                <Route path='/*' component={NoMatch} />
              </Switch>
            </div>
          </section>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;