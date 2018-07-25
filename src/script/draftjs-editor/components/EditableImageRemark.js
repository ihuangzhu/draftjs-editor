import React from "react";
import PropTypes from "prop-types";
import {EditorState} from 'draft-js';

import decorator from '../decorators';

/**
 * 图片描述
 */
export default class EditableImageRemark extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            editable: false
        };

        this._handleInputChange = (e) => {
            this.setState({value: e.target.value});
        };

        this._handleImageRemarkClick = () => {
            const {block, actions} = this.props;
            actions.addEditableImageRemarkBlock(block.getKey());
            this.setState({editable: true});
            setTimeout(() => {
                this.input.select();
            });
        };

        this._handleInputConfirmClick = () => {
            const {value} = this.state;
            const {block, actions, editable} = this.props;
            actions.setEditableEditorState(EditorState.createWithContent(
                editable.editableEditorState.getCurrentContent().mergeEntityData(block.getEntityAt(0), {remark: value}),
                decorator
            ));
            actions.deleteEditableImageRemarkBlock(block.getKey());
            this.setState({editable: false});
        };
    }

    render() {
        const {value, editable} = this.state;

        if (editable) return (
            <div className="form-inline">
                <div className="input-group input-group-sm mx-auto mb-2">
                    <input
                        type="text"
                        className="form-control"
                        value={value}
                        ref={el => this.input = el}
                        onChange={this._handleInputChange}
                    />
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={this._handleInputConfirmClick}
                        >
                            确定
                        </button>
                    </div>
                </div>
            </div>
        );
        return (
            <figcaption
                onClick={this._handleImageRemarkClick}
            >
                {value || '添加图片描述'}
            </figcaption>
        );
    }
}

/**
 * 声明数据类型
 */
EditableImageRemark.propTypes = {
    value: PropTypes.string.isRequired,
    block: PropTypes.object.isRequired,
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
