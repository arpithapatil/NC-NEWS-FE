import {combineReducers} from 'redux';

import test from './testReducer';
import articles from './articleReducer';
import comments from './commentReducer';
import commentsvote from './commentsvoteReducer';
import topics from './topicReducer';
import users from './userReducer';

const reducer = combineReducers({
  test, articles, comments, topics, users, commentsvote
});

export default reducer;