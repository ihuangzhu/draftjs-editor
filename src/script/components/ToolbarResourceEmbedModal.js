import React from 'react';
import PropTypes from 'prop-types';
import {EditorState, AtomicBlockUtils} from 'draft-js';

/**
 * 嵌入模态窗口
 */
export default class ToolbarResourceEmbedModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            src: '',
            width: 0,
            height: 0
        };

        this._handleSrcInputChange = (e) => {
            this.setState({src: e.target.value});
        };

        this._handleWidthInputChange = (e) => {
            this.setState({width: e.target.value});
        };

        this._handleHeightInputChange = (e) => {
            this.setState({height: e.target.value});
        };

        this._handleCancelButtonClick = () => {
            const {actions} = this.props;
            actions.setEditableReadOnly(false);
            actions.setToolbarEmbedModalVisible(false);
        };

        this._handleConfirmButtonClick = () => {
            const {src, width, height} = this.state;
            const {editable, actions} = this.props;

            // 使用Entity存放数据
            const contentState = editable.editableEditorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'EMBED',
                'IMMUTABLE',
                {
                    src,
                    width,
                    height
                }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editable.editableEditorState, {currentContent: contentStateWithEntity});
            actions.setEditableEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '➕'));

            this._handleCancelButtonClick();
        };
    }

    render() {
        const {src, width, height} = this.state;
        return (
            <div className="modal d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">嵌入</h5>
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
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="toolbarResourceModalSrcInput">链接：</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={src}
                                    onChange={this._handleSrcInputChange}
                                    id="toolbarResourceModalSrcInput"
                                    placeholder="请输入带协议头的超链接"
                                />
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={width}
                                        onChange={this._handleWidthInputChange}
                                        placeholder="嵌入窗口宽度"
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={height}
                                        onChange={this._handleHeightInputChange}
                                        placeholder="嵌入窗口高度"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this._handleConfirmButtonClick}
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResourceEmbedModal.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
