import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
import Homepage from './HomePage';
import NoMatch from './NoMatch';

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <section>
          <div>
            <Switch>
              <Route exact path='/' component= {Homepage}/>
              <Route component= {NoMatch}/>
            </Switch>
          </div>
        </section>
      </BrowserRouter>
    );
  }
}

export default App;