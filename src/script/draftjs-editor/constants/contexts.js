import React from 'react';

export const handlers = {
    editorInitHandler: (callback) => {
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

export const components = {
    blockTools: ['header', 'blockquote', 'list', 'code'],
    inlineTools: ['bold', 'italic', 'underline', 'strikethrough'],
    resourceTools: ['anchor', 'image'],
    operationTools: ['undo', 'redo']
};

export const HandlerContext = React.createContext({
    handlers
});