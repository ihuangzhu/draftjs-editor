import React from 'react';

import EditableLink from '../components/EditableLink';

/**
 * 链接段
 */
export default {
    strategy: (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges(character => {
            const entityKey = character.getEntity();
            return (entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK');
        }, callback);
    },
    component: EditableLink
};