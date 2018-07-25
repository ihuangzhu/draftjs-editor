import {Map} from "immutable";
import {EditorState} from "draft-js";

import {
    EDITABLE_EDITOR_STATE,
    EDITABLE_EDITOR_READONLY,
    EDITABLE_IMAGE_REMARK_BLOCK_ADD,
    EDITABLE_IMAGE_REMARK_BLOCK_DELETE
} from "../constants/actionTypes";
import decorator from '../decorators/index';

const defaultState = {
    editableReadOnly: false,
    editableEditorState: EditorState.createEmpty(decorator),
    editableImageRemarkBlocks: Map()
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case EDITABLE_EDITOR_STATE:
            return Object.assign({}, state, {
                editableEditorState: action.editableEditorState
            });
            break;
        case EDITABLE_EDITOR_READONLY:
            return Object.assign({}, state, {
                editableReadOnly: action.editableReadOnly
            });
            break;
        case EDITABLE_IMAGE_REMARK_BLOCK_ADD:
            return Object.assign({}, state, {
                editableImageRemarkBlocks: state.editableImageRemarkBlocks.set(action.editableImageRemarkBlock, true),
                editableReadOnly: true
            });
            break;
        case EDITABLE_IMAGE_REMARK_BLOCK_DELETE:
            return Object.assign({}, state, {
                editableImageRemarkBlocks: state.editableImageRemarkBlocks.remove(action.editableImageRemarkBlock),
                editableReadOnly: state.editableImageRemarkBlocks.count() > 1
            });
            break;
        default:
            return state;
    }
};