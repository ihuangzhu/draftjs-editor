import React from 'react';
import ReactDOM from 'react-dom';

import DraftEditor from './draftjs-editor';

const customHandler = {
    imageUploadHandler: (element, callback) => {
        alert('请选择图片文件！');
    }
};

ReactDOM.render((
    <DraftEditor
        handlers={customHandler}
    />
), document.getElementById('editor'));
