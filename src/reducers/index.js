import {combineReducers} from 'redux';

import test from './testReducer';
import articles from './articleReducer';
import comments from './commentReducer';
import topics from './topicReducer';

const reducer = combineReducers({
  test, articles, comments, topics
});

export default reducer;