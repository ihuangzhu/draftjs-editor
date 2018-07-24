import React from 'react';
import PropTypes from 'prop-types';

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

        this._handleUploadButtonClick = () => {
            const file = this.file.files[0];
            if (file && file.type.indexOf('image/') === 0) {
                this._handleUploadImage(file);
            } else {
                alert('请先选择要上传的图片！');
            }
        };

        this._handleUploadImage = (image) => {
            const {handleImageChange} = this.props;

            // TODO 上传图片
            const src = URL.createObjectURL(image);
            handleImageChange({src});
            // const fileReader = new FileReader();
            // fileReader.onload = (element) => {
            //     const image = new Image();
            //     image.onload = () => {
            //         handleImageChange({
            //             src: image.src,
            //             width: image.width,
            //             height: image.height
            //         });
            //     };
            //     image.src = element.target.result;
            // };
            // fileReader.readAsDataURL(image);

        }
    }

    render() {
        const {label} = this.state;

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
                    />
                    <label className="custom-file-label" htmlFor="toolbarImageModalLinkInput">
                        {label || '选择文件'}
                    </label>
                </div>
                <div className="input-group-append">
                    <span
                        className="input-group-text"
                        onClick={this._handleUploadButtonClick}
                    >
                        开始上传
                    </span>
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
