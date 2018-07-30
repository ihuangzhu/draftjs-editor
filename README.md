# draftjs-editor
基于facebook的draftjs扩展的富文本编辑器

## 引入
    npm install --save @ihuangzhu/draftjs-editor

## 使用
    import React from 'react';
    import ReactDOM from 'react-dom';
    
    import DraftEditor from '@ihuangzhu/draftjs-editor';
    
    const customHandler = {
        editorInitHandler: (callback) => {
            callback(
                '{"blocks":[{"key":"37dv1","text":"Hello World","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
            );
        },
        imageUploadHandler: (element, callback) => {
            const image = element.files[0];
            if (image && image.type.indexOf('image/') === 0) {
                const src = window.URL.createObjectURL(image);
                callback({src});
            } else {
                alert('请选择图片文件！');
            }
        }
    };
    
    ReactDOM.render((
        <DraftEditor
            handlers={customHandler}
        />
    ), document.getElementById('editor'));
