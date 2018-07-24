import React from 'react';
import PropTypes from 'prop-types';
import {EditorState, AtomicBlockUtils} from 'draft-js';

import ToolbarResourceImageUpload from './ToolbarResourceImageUpload';

/**
 * 图片模态窗口
 */
export default class ToolbarResourceImageModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {image: null};
        this._handleImageChange = (image) => {
            this.setState({image});
        };

        this._handleCancelButtonClick = () => {
            const {actions} = this.props;
            actions.setEditableReadOnly(false);
            actions.setToolbarImageModalVisible(false);
            this.setState({image: null});
        };

        this._handleConfirmButtonClick = () => {
            const {image} = this.state;
            const {editable, actions} = this.props;

            // 使用Entity存放数据
            const contentState = editable.editableEditorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'IMAGE',
                'IMMUTABLE',
                Object.assign({}, image, {remark: ''})
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editable.editableEditorState, {currentContent: contentStateWithEntity});
            actions.setEditableEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '📷'));

            this._handleCancelButtonClick();
        };
    }

    render() {
        const {image} = this.state;
        return (
            <div className="modal d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">插入图片</h5>
                            <button
                                type="button"
                                className="close"
                                onMouseDown={this._handleCancelButtonClick}
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{maxHeight: '360px', overflow: 'auto'}}>
                            {image ? (
                                    <div className="text-center">
                                        <img className="mw-100" src={image.src}/>
                                    </div>
                                ) : (
                                    <ToolbarResourceImageUpload
                                        handleImageChange={this._handleImageChange}
                                    />
                                )}
                        </div>
                        {image && (
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={this._handleConfirmButtonClick}
                                >
                                    确定
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResourceImageModal.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
