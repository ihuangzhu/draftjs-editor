import React from 'react';
import PropTypes from 'prop-types';
import {RichUtils} from 'draft-js';

import headerStyles from '../constants/toolbarBlockHeader';

/**
 * 块标题工具组
 */
class ToolbarBlockHeader extends React.Component {
    constructor(props) {
        super(props);

        this._handleDropDownClick = (e) => {
            if (e.button == 0) {
                e.preventDefault();
            }
        };
    }

    render() {
        const {disabled, currentBlockStyle, onBlockStyleChange} = this.props;
        const buttonGroupClassNames = ['btn-group', 'btn-group-sm'];
        const dropDownButtonClassNames = ['btn', 'btn-secondary', 'dropdown-toggle'];
        const dropDownMenuClassNames = ['dropdown-menu'];
        if (disabled) dropDownButtonClassNames.push('disabled');
        if (headerStyles.items.some((header) => header.style === currentBlockStyle)) dropDownButtonClassNames.push('active');

        return (
            <div
                role="group"
                className={buttonGroupClassNames.join(' ')}
            >
                <button
                    type="button"
                    disabled={disabled}
                    title={headerStyles.head.title}
                    className={dropDownButtonClassNames.join(' ')}
                    onMouseDown={this._handleDropDownClick}
                    id="toolbarBlockHeaderDropDownToggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {headerStyles.head.children}
                </button>
                <div
                    className={dropDownMenuClassNames.join(' ')}
                    aria-labelledby="toolbarBlockHeaderDropDownToggle"
                >
                    {headerStyles.items.map((header, index) => {
                        const itemClassName = ['dropdown-item'];
                        if (header.style === currentBlockStyle) itemClassName.push('active');
                        return (
                             <button
                                type="button"
                                key={index}
                                title={header.title}
                                className={itemClassName.join(' ')}
                                onMouseDown={(e) => {
                                    onBlockStyleChange(e, header.style);
                                }}
                            >
                                {header.children}
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    }
}

/**
 * 声明数据类型
 */
ToolbarBlockHeader.propTypes = {
    disabled: PropTypes.bool.isRequired,
    currentBlockStyle: PropTypes.string.isRequired,
    onBlockStyleChange: PropTypes.func.isRequired
};

export default ToolbarBlockHeader;
