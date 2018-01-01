import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
import HomePage from './HomePage';
import NoMatch from './NoMatch';
import ArticleList from './ArticleList';
import ArticleItem from './ArticleItem';
import Comments from './Comments';
import NavBar from './NavBar';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <BrowserRouter>
        <section>
          <div className='body'>
            <NavBar/>
            <Switch>
              <Route exact path='/' component= {HomePage}/>
              <Route exact path='/:topic' component= {ArticleList}/>
              <Route exact path='/articles' component= {ArticleList}/>
              <Route exact path='/articles/:article_id' component= {ArticleItem}/>
              <Route path='/articles/:article_id/comments' component= {Comments}/>
              <Route path='/*' component= {NoMatch}/>
            </Switch>
          </div>
        </section>
      </BrowserRouter>
    );
  }
}

export default App;