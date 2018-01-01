import React from 'react';
import { NavLink } from 'react-router-dom';
const topics = ['football', 'cooking', 'coding'];

const NavBar = () => {
  return (
    <nav className='navbar navbar-default'>
      <div className='container'>
        <div className="navbar-left">
          <ul className='nav navbar-nav'>
            <li><h2><NavLink to={'/'} className='nav-title'>Northcoders News</NavLink></h2></li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul className='nav navbar-nav'>
            {topics.map((topic) => {
              return (
                <li key={topic}>
                  <h4><NavLink to={`/${topic}`} className='nav-topic'>{topic}</NavLink></h4>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;