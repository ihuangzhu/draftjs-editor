import React from 'react';

/*
 工具栏块工具组
 */
export default [
    {
        title: '引用',
        style: 'blockquote',
        children: (
            <span className="fa fa-quote-left"/>
        )
    }, {
        title: '无序列表',
        style: 'unordered-list-item',
        children: (
            <span className="fa fa-list-ul"/>
        )
    }, {
        title: '有序列表',
        style: 'ordered-list-item',
        children: (
            <span className="fa fa-list-ol"/>
        )
    }, {
        title: '代码块',
        style: 'code-block',
        children: (
            <span className="fa fa-code"/>
        )
    }
];