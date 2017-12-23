import {combineReducers} from 'redux';

import test from './testReducer';
import articles from './articleReducer';

const reducer = combineReducers({
  test, articles
});

export default reducer;