import React from 'react';
import ReactDOM from 'react-dom';

import DraftEditor from '../draftjs-editor/index';

const customHandler = {
    editorInitHandler: (callback) => {
        callback('{"blocks":[{"key":"epvd6","text":"这是一条测试！","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":4,"length":2,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}');
    },
    imageUploadHandler: (element, callback) => {
        alert('请选择图片文件！');
    }
};

class App extends React.Component {
    render() {
        return (
            <div>
                <DraftEditor
                    ref={el => this.editor = el}
                    handlers={customHandler}
                />
                <button
                    onClick={() => {
                        console.log(JSON.stringify(this.editor.getCurrentContent()))
                    }}
                >
                    获取
                </button>
            </div>
        );
    }
}

ReactDOM.render((
    <App/>
), document.getElementById('editor'));
