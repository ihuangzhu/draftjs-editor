import React from 'react';
import PropTypes from 'prop-types';

import resourceStyles from '../constants/toolbarResource';

/**
 * 图片工具
 */
class ToolbarResourceImage extends React.Component {
    constructor(props) {
        super(props);

        this._handleImageButtonClick = (e) => {
            if (e.button == 0) {
                const {actions} = this.props;
                actions.setEditableReadOnly(true);
                actions.setToolbarImageModalVisible(true);
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
                title={resourceStyles.image.title}
                disabled={disabled}
                className={classNames.join(' ')}
                onMouseDown={this._handleImageButtonClick}
            >
                {resourceStyles.image.children}
            </button>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResourceImage.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default ToolbarResourceImage;
