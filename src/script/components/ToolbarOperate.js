import React from 'react';
import PropTypes from 'prop-types';
import {EditorState} from 'draft-js';

import operationStyles from '../constants/toolbarOperation';

/**
 * 操作工具组
 */
export default class ToolbarOperate extends React.Component {
    constructor(props) {
        super(props);

        this.handleUndoButtonClick = (e) => {
            if (e.button == 0) {
                e.preventDefault();
                const {editable, actions} = this.props;

                actions.setEditableEditorState(
                    EditorState.undo(editable.editableEditorState)
                );
            }
        };

        this.handleRepeatButtonClick = (e) => {
            if (e.button == 0) {
                e.preventDefault();
                const {editable, actions} = this.props;

                actions.setEditableEditorState(
                    EditorState.redo(editable.editableEditorState)
                );
            }
        };
    }

    render() {
        const {editable, actions} = this.props;
        const classNames = ['btn', 'btn-secondary'];
        const disabled = !editable.editableEditorState.getSelection().getHasFocus();
        if (disabled) classNames.push('disabled');

        return (
            <div className="btn-group btn-group-sm mb-2 ml-md-auto">
                <button
                    type="button"
                    className={classNames.join(' ')}
                    title={operationStyles.undo.title}
                    disabled={disabled}
                    onMouseDown={this.handleUndoButtonClick}
                >
                    {operationStyles.undo.children}
                </button>
                <button
                    type="button"
                    className={classNames.join(' ')}
                    title={operationStyles.repeat.title}
                    disabled={disabled}
                    onMouseDown={this.handleRepeatButtonClick}
                >
                    {operationStyles.repeat.children}
                </button>
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarOperate.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
