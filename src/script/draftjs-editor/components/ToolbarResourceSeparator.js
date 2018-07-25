import React from 'react';
import PropTypes from 'prop-types';
import {EditorState, AtomicBlockUtils} from 'draft-js';

import resourceStyles from '../constants/toolbarResource';

/**
 * 分割线工具
 */
class ToolbarResourceSeparator extends React.Component {
    constructor(props) {
        super(props);

        this._handleSeparatorButtonClick = (e) => {
            if (e.button == 0) {
                e.preventDefault();
                const {editable, actions} =this.props;

                const contentState = editable.editableEditorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                    'SEPARATOR',
                    'IMMUTABLE',
                    {
                        styleType: 'ellipsis'
                    }
                );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editable.editableEditorState, {currentContent: contentStateWithEntity});
                actions.setEditableEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '-'));
            }
        };
    }

    render() {
        const {editable} =this.props;
        const classNames = ['btn', 'btn-secondary'];
        const disabled = !editable.editableEditorState.getSelection().getHasFocus();
        if (disabled) classNames.push('disabled');

        return (
            <button
                type="button"
                title={resourceStyles.separator.title}
                disabled={disabled}
                className={classNames.join(' ')}
                onMouseDown={this._handleSeparatorButtonClick}
            >
                {resourceStyles.separator.children}
            </button>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResourceSeparator.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default ToolbarResourceSeparator;
