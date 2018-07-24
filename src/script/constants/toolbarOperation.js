import React from 'react';

/*
 工具栏操作工具组
 */
export default {
    undo: {
        title: '撤销',
        children: (
            <span className="fa fa-undo"/>
        )
    },
    repeat: {
        title: '重做',
        children: (
            <span className="fa fa-repeat"/>
        )
    }
};