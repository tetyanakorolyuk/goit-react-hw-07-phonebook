import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import actions from './actions';

const filter = createReducer('', {
  [actions.filterContact]: (_, { payload }) => payload,
  });

  export default combineReducers({
    filter,
  });
