import React from "react";
import PropTypes from "prop-types";
import {EditorState, SelectionState, Modifier} from "draft-js";

import EditableImageRemark from './EditableImageRemark';

/**
 * 图片
 */
export default class EditableImage extends React.Component {
    constructor(props) {
        super(props);

        this._handleSetCoverButtonClick = () => {
            const {blockProps} = this.props;
            const {data, actions} = blockProps;

            actions.setFormCoverValue(data);
        };

        this._handleRemoveButtonClick = () => {
            const {block, contentState, blockProps} = this.props;
            const {editable, actions} = blockProps;

            let selection = SelectionState.createEmpty(block.getKey());
            selection = selection.merge({
                anchorKey: block.getKey(),
                anchorOffset: 0,
                focusKey: block.getKey(),
                focusOffset: block.getLength()
            });

            let newContentState = Modifier.removeRange(contentState, selection, 'backward');
            newContentState = Modifier.setBlockType(newContentState, newContentState.getSelectionAfter(), 'unstyled');

            actions.setEditableEditorState(
                EditorState.forceSelection(
                    EditorState.push(editable.editableEditorState, newContentState, 'remove-range'), newContentState.getSelectionAfter()
                )
            );
        };
    }

    render() {
        const {block, blockProps} = this.props;
        const {data, editable, actions} = blockProps;

        return (
            <div className="text-center">
                <div className="btn-group btn-group-sm position-absolute p-1" role="group" aria-label="图片工具组" style={{right: 0}}>
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={this._handleSetCoverButtonClick}
                        title="设为封面"
                    >
                        <span className="fa fa-image"/>
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this._handleRemoveButtonClick}
                        title="删除图片"
                    >
                        <span className="fa fa-trash"/>
                    </button>
                </div>
                <img src={data.src} className="mw-100 mb-2" />
                <EditableImageRemark
                    value={data.remark}
                    block={block}
                    editable={editable}
                    actions={actions}
                />
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
EditableImage.propTypes = {
    block: PropTypes.object.isRequired,
    offsetKey: PropTypes.string.isRequired,
    contentState: PropTypes.object.isRequired,
    blockProps: PropTypes.shape({
        data: PropTypes.object.isRequired,
        editable: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    })
};

