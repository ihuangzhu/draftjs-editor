import React from 'react';
import PropTypes from 'prop-types';

import resourceStyles from '../constants/toolbarResource';

/**
 * 链接工具
 */
export default class ToolbarResourceLink extends React.Component {
    constructor(props) {
        super(props);

        this._isLink = () => {
            const {editable} = this.props;

            const selection = editable.editableEditorState.getSelection();
            const contentState = editable.editableEditorState.getCurrentContent();
            const startKey = selection.getStartKey();
            const startOffset = selection.getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const entityKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            const entity = entityKey ? contentState.getEntity(entityKey) : null;
            return (entity && entity.getType() === 'LINK');
        };

        this._handleLinkButtonClick = (e) => {
            if (e.button == 0) {
                const {actions} = this.props;
                actions.setToolbarLinkModalVisible(true);
                e.preventDefault();
            }
        };
    }

    render() {
        const {editable} = this.props;
        const classNames = ['btn', 'btn-secondary'];
        const isLink = this._isLink();
        if (isLink) classNames.push('active');
        const disabled = !isLink && editable.editableEditorState.getSelection().isCollapsed();
        if (disabled) classNames.push('disabled');

        return (
            <button
                type="button"
                title={resourceStyles.link.title}
                disabled={disabled}
                className={classNames.join(' ')}
                onMouseDown={this._handleLinkButtonClick}
            >
                {resourceStyles.link.children}
            </button>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResourceLink.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
