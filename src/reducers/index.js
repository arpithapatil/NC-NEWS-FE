import {combineReducers} from 'redux';

import test from './test';
import articles from './articleReducer';

const reducer = combineReducers({
  test, articles
});

export default reducer;