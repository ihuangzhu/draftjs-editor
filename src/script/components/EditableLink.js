import React from "react";
import PropTypes from "prop-types";

/**
 * 链接
 */
export default class EditableLink extends React.Component {
    render () {
        const {entityKey, contentState, children} = this.props;
        const {href, target} = contentState.getEntity(entityKey).getData();

        return (
            <a href={href} target={target}>
                {children}
            </a>
        );
    }
}

/**
 * 声明数据类型
 */
EditableLink.propTypes = {
    entityKey: PropTypes.string.isRequired,
    contentState: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired
};
