import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <div>
    <h1>Something went wrong</h1>
    <br />
    <div>
      <Link to='/' className='nomatch'>Go back to homepage</Link>
    </div>
  </div>
);

export default NoMatch;