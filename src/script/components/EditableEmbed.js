import React from "react";
import PropTypes from "prop-types";
import {EditorState, SelectionState, Modifier} from "draft-js";

/**
 * 嵌入
 */
export default class EditableEmbed extends React.Component {
    constructor(props) {
        super(props);

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
        const {blockProps} = this.props;
        const {data} = blockProps;

        return (
            <div className="text-center">
                <div className="btn-group btn-group-sm position-absolute p-1" role="group" aria-label="嵌入具组" style={{right: 0}}>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={this._handleRemoveButtonClick}
                        title="删除嵌入"
                    >
                        <span className="fa fa-trash"/>
                    </button>
                </div>
                <embed
                    className="mw-100 mb-2"
                    src={data.src}
                    width={data.width > 0 ? data.width : 'auto'}
                    height={data.height > 0 ? data.height : 'auto'}
                />
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
EditableEmbed.propTypes = {
    block: PropTypes.object.isRequired,
    offsetKey: PropTypes.string.isRequired,
    contentState: PropTypes.object.isRequired,
    blockProps: PropTypes.shape({
        data: PropTypes.object.isRequired,
        editable: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    })
};

