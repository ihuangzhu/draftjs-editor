import React from 'react';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import {
    Editor,
    RichUtils,
    DefaultDraftBlockRenderMap
} from 'draft-js';

import EditableImage from '../components/EditableImage';
import EditableEmbed from '../components/EditableEmbed';
import EditableSeparator from '../components/EditableSeparator';

/**
 * 可编辑区域
 */
export default class Editable extends React.Component {
    constructor(props) {
        super(props);

        this._handleTab = e => {
            const maxDepth = 2;
            const {editable, actions} = this.props;
            actions.setEditableEditorState(
                RichUtils.onTab(e, editable.editableEditorState, maxDepth)
            );
        };

        this._handleKeyCommand = (command, editorState) => {
            const {actions} = this.props;
            if (command === 'save-article') {
                return 'handled';
            }
            const newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                actions.setEditableEditorState(newState);
                return 'handled';
            }
            return 'not-handled';
        };

        this._blockRenderFn = (block) => {
            const {editable, actions} = this.props;
            return Editable.blockRenderFn(block, {editable, actions});
        };
    }

    render() {
        const {editable, actions} = this.props;

        return (
            <div className="card-body">
                <Editor
                    onTab={this._handleTab}
                    handleKeyCommand={this._handleKeyCommand}
                    blockStyleFn={Editable.blockStyleFn}
                    blockRendererFn={this._blockRenderFn}
                    blockRenderMap={Editable.blockRenderMap}
                    editorState={editable.editableEditorState}
                    onChange={actions.setEditableEditorState}
                    readOnly={editable.editableReadOnly}
                    stripPastedStyles="true"
                    placeholder='写下你的故事……'
                />
            </div>
        );
    }
}

/**
 * 块样式
 */
Editable.blockStyleFn = () => 'mb-2';

/**
 * 块渲染样式
 */
Editable.blockRenderMap = DefaultDraftBlockRenderMap.merge(
    Map({
        'code-block': {
            element: 'code',
            wrapper: DefaultDraftBlockRenderMap.get('code-block').wrapper
        },
        'atomic': {
            element: 'figure'
        }
    })
);

/**
 * 原子块渲染样式
 */
Editable.blockRenderFn = (block, {editable, actions}) => {
    if (block.getType() !== 'atomic') return null;

    const contentState = editable.editableEditorState.getCurrentContent();
    const entity = contentState.getEntity(block.getEntityAt(0));
    const data = entity.getData();

    switch (entity.getType()) {
        case 'IMAGE':
            return {
                component: EditableImage,
                editable: false,
                props: {
                    data,
                    editable,
                    actions
                }
            };
        case 'EMBED':
            return {
                component: EditableEmbed,
                editable: false,
                props: {
                    data,
                    editable,
                    actions
                }
            };
        case 'SEPARATOR':
            return {
                component: EditableSeparator,
                editable: false
            };
        default:
            return null;
    }
};

/**
 * 声明数据类型
 */
Editable.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};
