import {combineReducers} from 'redux'

import toolbar from './toolbar';
import editable from './editable';

export default combineReducers({
    toolbar,
    editable
});