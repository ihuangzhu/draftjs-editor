import React from 'react';

/*
 工具栏行工具组
 */
export default [
    {
        title: '加粗（Ctrl + B）',
        style: 'BOLD',
        children: (
            <span className="fa fa-bold"/>
        )
    }, {
        title: '倾斜（Ctrl + I）',
        style: 'ITALIC',
        children: (
            <span className="fa fa-italic"/>
        )
    }, {
        title: '下划线（Ctrl + U）',
        style: 'UNDERLINE',
        children: (
            <span className="fa fa-underline"/>
        )
    }, {
        title: '删除线',
        style: 'STRIKETHROUGH',
        children: (
            <span className="fa fa-strikethrough"/>
        )
    }, {
        title: '行代码',
        style: 'CODE',
        children: (
            <span className="fa fa-terminal"/>
        )
    }
];