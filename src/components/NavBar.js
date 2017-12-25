import React from 'react';
import {NavLink} from 'react-router-dom';
const topics = ['football', 'cooking', 'coding'];
class NavBar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className='container'>
          <div className="navbar-left">
            <ul className='nav navbar-nav'>
              <li><h2><NavLink to={'/'} data-toggle="collapse" data-target=".navbar-collapse.in">Northcoders News</NavLink></h2></li>
            </ul>
          </div>
          <div className="navbar-right">
            <ul className='nav navbar-nav'>
              {topics.map((topic) => {
                return (
                  <li key={topic}>
                    <NavLink to={`/${topic}`} data-toggle="collapse" data-target=".navbar-collapse.in">{topic}</NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
  
export default NavBar;