import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducers';
import MyEditor from './containers/MyEditor';

const store = createStore(reducer);

ReactDOM.render((
    <Provider store={store}>
        <MyEditor />
    </Provider>
), document.getElementById('editor'));
