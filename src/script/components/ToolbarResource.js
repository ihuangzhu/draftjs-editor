import React from 'react';
import PropTypes from 'prop-types';

import ToolbarResourceLink from './ToolbarResourceLink';
import ToolbarResourceLinkModal from './ToolbarResourceLinkModal';
import ToolbarResourceImage from './ToolbarResourceImage';
import ToolbarResourceImageModal from './ToolbarResourceImageModal';
import ToolbarResourceEmbed from './ToolbarResourceEmbed';
import ToolbarResourceEmbedModal from './ToolbarResourceEmbedModal';
import ToolbarResourceSeparator from './ToolbarResourceSeparator';

/**
 * 资源工具组
 */
export default class ToolbarResource extends React.Component {
    render() {
        const {toolbar, editable, actions} = this.props;

        return (
            <div className="btn-group btn-group-sm mb-2 mr-2">
                <ToolbarResourceLink
                    editable={editable}
                    actions={actions}
                />
                {toolbar.toolbarLinkModalVisible && (
                    <ToolbarResourceLinkModal
                        editable={editable}
                        actions={actions}
                    />
                )}
                <ToolbarResourceImage
                    editable={editable}
                    actions={actions}
                />
                {toolbar.toolbarImageModalVisible && (
                    <ToolbarResourceImageModal
                        editable={editable}
                        actions={actions}
                    />
                )}
                <ToolbarResourceEmbed
                    editable={editable}
                    actions={actions}
                />
                {toolbar.toolbarEmbedModalVisible && (
                    <ToolbarResourceEmbedModal
                        editable={editable}
                        actions={actions}
                    />
                )}
                <ToolbarResourceSeparator
                    editable={editable}
                    actions={actions}
                />
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarResource.propTypes = {
    editable: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};
