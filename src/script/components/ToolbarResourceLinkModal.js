import React from 'react';
import PropTypes from 'prop-types';
import {EditorState, SelectionState, RichUtils} from 'draft-js';

/**
 * 链接模态窗口
 */
export default class ToolbarResourceLinkModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {href: 'http://', target: '_self'};
        this._handleInputChange = (e) => {
            this.setState({href: e.target.value});
        };

        this._handleSelectChange = (e) => {
            this.setState({target: e.target.value});
        };

        this._currentLink = () => {
            const {editable} = this.props;

            const contentState = editable.editableEditorState.getCurrentContent();
            const selectionState = editable.editableEditorState.getSelection();
            const contentBlock = contentState.getBlockForKey(selectionState.getStartKey());
            const startKey = selectionState.getStartKey();
            const startOffset = selectionState.getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const entityKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            const entity = entityKey ? contentState.getEntity(entityKey) : null;
            if (entity && entity.getType() === 'LINK') return {
                entityKey: entityKey,
                blockKey: contentBlock.getKey(),
                data: entity.getData()
            };
            return null;
        };

        this._handleCancelButtonClick = () => {
            this.props.actions.setToolbarLinkModalVisible(false);
        };

        this._handleDeleteButtonClick = () => {
            const link = this._currentLink();
            const {editable, actions} = this.props;

            const selectionState = editable.editableEditorState.getSelection();
            const contentState = editable.editableEditorState.getCurrentContent();
            const contentBlock = contentState.getBlockForKey(selectionState.getStartKey());
            contentBlock.findEntityRanges((character) => {
                return character.getEntity() === link.entityKey;
            }, (start, end) => {
                let selection = SelectionState.createEmpty(contentBlock.getKey());
                selection = selection.merge({
                    anchorKey: link.blockKey,
                    anchorOffset: start,
                    focusKey: link.blockKey,
                    focusOffset: end
                });
                actions.setEditableEditorState(
                    EditorState.forceSelection(RichUtils.toggleLink(editable.editableEditorState, selection, null), selectionState)
                );
            });
            this._handleCancelButtonClick();
        };

        this._handleConfirmButtonClick = () => {
            const {href, target} = this.state;
            const {editable, actions} = this.props;

            const contentStateWithEntity = editable.editableEditorState.getCurrentContent().createEntity('LINK', 'MUTABLE', {
                href,
                target
            });
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = RichUtils.toggleLink(editable.editableEditorState, editable.editableEditorState.getSelection(), entityKey);
            actions.setEditableEditorState(
                EditorState.forceSelection(newEditorState, editable.editableEditorState.getSelection())
            );
            this._handleCancelButtonClick();
        };
    }

    componentDidMount() {
        // 不允许编辑
        const {actions} = this.props;
        actions.setEditableReadOnly(true);

        // 赋值
        const link = this._currentLink();
        if (link) {
            this.setState({
                href: link.data.href,
                target: link.data.target
            });
        }
    }

    componentWillUnmount() {
        // 允许编辑
        const {actions} = this.props;
        actions.setEditableReadOnly(false);
    }

    render() {
        const {href, target} = this.state;
        const {editable} = this.props;

        const deleteButtonClassNames = ['btn', 'btn-danger'];
        const confirmButtonClassNames = ['btn', 'btn-primary'];
        if (!this._currentLink()) deleteButtonClassNames.push('d-none');
        if (editable.editableEditorState.getSelection().isCollapsed()) confirmButtonClassNames.push('d-none');

        return (
            <div className="modal d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">添加超链接</h5>
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
                                <label htmlFor="toolbarLinkModalLinkInput">超链接：</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={href}
                                    onChange={this._handleInputChange}
                                    id="toolbarLinkModalLinkInput"
                                    placeholder="请输入带协议头的超链接"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="toolbarLinkModalLinkSelect">打开方式：</label>
                                <select
                                    className="custom-select"
                                    value={target}
                                    onChange={this._handleSelectChange}
                                    id="toolbarLinkModalLinkSelect"
                                >
                                    <option value="_self" >当前页打开</option>
                                    <option value="_blank">新窗口打开</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className={deleteButtonClassNames.join(' ')}
                                onClick={this._handleDeleteButtonClick}
                            >
                                清除
                            </button>
                            <button
                                type="button"
                                className={confirmButtonClassNames.join(' ')}
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
ToolbarResourceLinkModal.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
