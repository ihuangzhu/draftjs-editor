import React from 'react';
import PropTypes from 'prop-types';
import {EditorState, AtomicBlockUtils} from 'draft-js';

import resourceStyles from '../constants/toolbarResource';

/**
 * 嵌入工具
 */
export default class ToolbarResourceEmbed extends React.Component {
    constructor(props) {
        super(props);

        this._handleEmbedButtonClick = (e) => {
            if (e.button == 0) {
                const {actions} = this.props;
                actions.setEditableReadOnly(true);
                actions.setToolbarEmbedModalVisible(true);
                e.preventDefault();
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
                title={resourceStyles.embed.title}
                disabled={disabled}
                className={classNames.join(' ')}
                onMouseDown={this._handleEmbedButtonClick}
            >
                {resourceStyles.embed.children}
            </button>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResourceEmbed.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
