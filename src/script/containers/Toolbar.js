import React from 'react';
import PropTypes from 'prop-types';

import ToolbarBlock from '../components/ToolbarBlock';
import ToolbarInline from '../components/ToolbarInline';
import ToolbarResource from '../components/ToolbarResource';
import ToolbarOperate from '../components/ToolbarOperate';

/**
 * 工具栏
 */
export default class Toolbar extends React.Component {
    render() {
        const {toolbar, editable, actions} = this.props;

        return (
            <div
                className="card-header editor-toolbar"
                ref={el => this.toolbar = el}
            >
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <ToolbarBlock
                        toolbar={toolbar}
                        editable={editable}
                        actions={actions}
                    />
                    <ToolbarInline
                        toolbar={toolbar}
                        editable={editable}
                        actions={actions}
                    />
                    <ToolbarResource
                        toolbar={toolbar}
                        editable={editable}
                        actions={actions}
                    />
                    <ToolbarOperate
                        toolbar={toolbar}
                        editable={editable}
                        actions={actions}
                    />
                </div>
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
Toolbar.propTypes = {
    toolbar: PropTypes.object.isRequired,
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
