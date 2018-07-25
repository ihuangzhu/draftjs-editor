import React from 'react';
import PropTypes from 'prop-types';

import {HandlerContext} from '../constants/contexts';

/**r
 * 图片上传
 */
export default class ToolbarResourceImageUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {label: null};
        this._handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.setState({label: file.name})
            } else {
                this.setState({label: null})
            }
        };
    }

    render() {
        const {label} = this.state;
        const {handleImageChange} = this.props;

        return (
            <div className="input-group">
                <div className="custom-file">
                    <input
                        type="file"
                        accept="image/*"
                        className="custom-file-input"
                        ref={el => this.file = el}
                        onChange={this._handleFileChange}
                        id="toolbarImageModalLinkInput"
                        lang="zh"
                    />
                    <label className="custom-file-label" htmlFor="toolbarImageModalLinkInput">
                        {label || '选择文件'}
                    </label>
                </div>
                <div className="input-group-append">
                    <HandlerContext.Consumer>
                        {({imageUploadHandler}) => (
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => imageUploadHandler(this.file, handleImageChange)}
                            >
                                开始上传
                            </button>
                        )}
                    </HandlerContext.Consumer>
                </div>
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResourceImageUpload.propTypes = {
    handleImageChange: PropTypes.func.isRequired
};
