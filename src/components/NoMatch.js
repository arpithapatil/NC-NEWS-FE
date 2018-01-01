import React from 'react';
import {Link} from 'react-router-dom';

const NoMatch = () => (
  <div>
    <h1>Something went wrong</h1>
    <br/>
    <Link to ='/'>Go back to homepage</Link>
  </div>
);

export default NoMatch;