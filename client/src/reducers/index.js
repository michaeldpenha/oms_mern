import { combineReducers } from 'redux';
import items from './items';

export default combineReducers({
    data: items
})