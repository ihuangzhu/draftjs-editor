import React from 'react';

/*
 工具栏块标题工具组
 */
export default {
    head: {
        title: '标题',
        children: (
            <span className="fa fa-heading"/>
        )
    },
    items: [
        {
            title: '标题一',
            style: 'header-one',
            children: (
                <h1>标题一</h1>
            )
        }, {
            title: '标题二',
            style: 'header-two',
            children: (
                <h2>标题二</h2>
            )
        }, {
            title: '标题三',
            style: 'header-three',
            children: (
                <h3>标题三</h3>
            )
        }, {
            title: '标题四',
            style: 'header-four',
            children: (
                <h4>标题四</h4>
            )
        }, {
            title: '标题五',
            style: 'header-five',
            children: (
                <h5>标题五</h5>
            )
        }, {
            title: '标题六',
            style: 'header-six',
            children: (
                <h6>标题六</h6>
            )
        }
    ]
};