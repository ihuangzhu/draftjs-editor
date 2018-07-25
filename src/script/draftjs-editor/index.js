import React from 'react';
import PropTypes from 'prop-types';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducers';
import MyEditor from './containers/MyEditor';
import {HandlerContext, handlers} from './constants/contexts';
import {convertToRaw} from "draft-js";

const store = createStore(reducer);

export default class DraftjsEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            handlers: Object.assign({}, handlers, props.handlers)
        };

        this.getCurrentContent = () => {
            const {editable} = store.getState();
            return convertToRaw(editable.editableEditorState.getCurrentContent());
        }
    }

    render() {
        return (
            <HandlerContext.Provider value={this.state.handlers}>
                <Provider store={store}>
                    <HandlerContext.Consumer>
                        {({editorInitHandler}) => (
                            <MyEditor initHandle={editorInitHandler}/>
                        )}
                    </HandlerContext.Consumer>
                </Provider>
            </HandlerContext.Provider>
        );
    }
};

/**
 * 声明数据类型
 */
DraftjsEditor.propTypes = {
    handlers: PropTypes.object
};
