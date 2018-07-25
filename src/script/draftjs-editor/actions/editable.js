import {
    EDITABLE_EDITOR_STATE,
    EDITABLE_EDITOR_READONLY,
    EDITABLE_IMAGE_REMARK_BLOCK_ADD,
    EDITABLE_IMAGE_REMARK_BLOCK_DELETE
} from '../constants/actionTypes';

/*
 内容
 */
export const setEditableEditorState = (editableEditorState) => ({
    type: EDITABLE_EDITOR_STATE,
    editableEditorState
});

export const setEditableReadOnly = (editableReadOnly) => ({
    type: EDITABLE_EDITOR_READONLY,
    editableReadOnly
});

export const addEditableImageRemarkBlock = (editableImageRemarkBlock) => ({
    type: EDITABLE_IMAGE_REMARK_BLOCK_ADD,
    editableImageRemarkBlock
});

export const deleteEditableImageRemarkBlock = (editableImageRemarkBlock) => ({
    type: EDITABLE_IMAGE_REMARK_BLOCK_DELETE,
    editableImageRemarkBlock
});
