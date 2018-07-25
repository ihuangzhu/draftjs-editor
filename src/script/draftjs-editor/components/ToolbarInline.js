import React from 'react';
import PropTypes from 'prop-types';
import {RichUtils} from 'draft-js';

import inlineStyles from '../constants/toolbarInline';

/**
 * 行工具组
 */
class ToolbarInline extends React.Component {
    constructor(props) {
        super(props);

        this._handleInlineStyleChange = (e, style) => {
            const {editable, actions} = this.props;

            if (e.button == 0) {
                e.preventDefault();
                actions.setEditableEditorState(
                    RichUtils.toggleInlineStyle(editable.editableEditorState, style)
                );
            }
        }
    }

    render() {
        const {editable} = this.props;
        const disabled = !editable.editableEditorState.getSelection().getHasFocus();
        const inlineStyle = editable.editableEditorState.getCurrentInlineStyle();

        return (
            <div className="btn-group btn-group-sm mb-2 mr-2" role="group" aria-label="First group">
                {inlineStyles.map((inline, index) => {
                    const classNames = ['btn', 'btn-secondary'];
                    if (disabled) classNames.push('disabled');
                    if (inlineStyle.has(inline.style)) classNames.push('active');

                    return (
                        <button
                            key={index}
                            type="button"
                            title={inline.title}
                            disabled={disabled}
                            className={classNames.join(' ')}
                            onMouseDown={e => this._handleInlineStyleChange(e, inline.style)}
                        >
                            {inline.children}
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
ToolbarInline.propTypes = {
    toolbar: PropTypes.object.isRequired,
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default ToolbarInline;
