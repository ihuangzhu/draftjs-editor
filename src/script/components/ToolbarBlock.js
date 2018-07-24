import React from 'react';
import PropTypes from 'prop-types';
import {RichUtils} from 'draft-js';

import blockStyles from '../constants/toolbarBlock';
import ToolbarBlockHeader from './ToolbarBlockHeader';

/**
 * 块工具组
 */
class ToolbarBlock extends React.Component {
    constructor(props) {
        super(props);

        this._handleBlockStyleChange = (e, style) => {
            const {editable, actions} = this.props;

            if (e.button == 0) {
                e.preventDefault();
                actions.setEditableEditorState(
                    RichUtils.toggleBlockType(editable.editableEditorState, style)
                );
            }
        };
    }

    render() {
        const {editable} = this.props;
        const disabled = !editable.editableEditorState.getSelection().getHasFocus();
        const blockStyle = editable.editableEditorState.getCurrentContent().getBlockForKey(
            editable.editableEditorState.getSelection().getStartKey()
        ).getType();

        return (
            <div className="btn-group btn-group-sm mb-2 mr-2" role="group" aria-label="First group">
                <ToolbarBlockHeader
                    disabled={disabled}
                    currentBlockStyle={blockStyle}
                    onBlockStyleChange={this._handleBlockStyleChange}
                />
                {blockStyles.map((block, index) => {
                    const classNames = ['btn', 'btn-secondary'];
                    if (disabled) classNames.push('disabled');
                    if (block.style === blockStyle) classNames.push('active');
                    return (
                        <button
                            key={index}
                            type="button"
                            title={block.title}
                            disabled={disabled}
                            className={classNames.join(' ')}
                            onMouseDown={e => this._handleBlockStyleChange(e, block.style)}
                        >
                            {block.children}
                        </button>
                    );
                })}
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarBlock.propTypes = {
    toolbar: PropTypes.object.isRequired,
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default ToolbarBlock;
