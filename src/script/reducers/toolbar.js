import {
    TOOLBAR_LINK_MODAL_VISIBLE,
    TOOLBAR_IMAGE_MODAL_VISIBLE,
    TOOLBAR_EMBED_MODAL_VISIBLE,
    TOOLBAR_SETTING_MODAL_VISIBLE
} from "../constants/actionTypes";

const defaultState = {
    toolbarLinkModalVisible: false,
    toolbarImageModalVisible: false,
    toolbarEmbedModalVisible: false,
    toolbarSettingModalVisible: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case TOOLBAR_LINK_MODAL_VISIBLE:
            return Object.assign({}, state, {
                toolbarLinkModalVisible: action.toolbarLinkModalVisible
            });
            break;
        case TOOLBAR_IMAGE_MODAL_VISIBLE:
            return Object.assign({}, state, {
                toolbarImageModalVisible: action.toolbarImageModalVisible
            });
            break;
        case TOOLBAR_EMBED_MODAL_VISIBLE:
            return Object.assign({}, state, {
                toolbarEmbedModalVisible: action.toolbarEmbedModalVisible
            });
            break;
        case TOOLBAR_SETTING_MODAL_VISIBLE:
            return Object.assign({}, state, {
                toolbarSettingModalVisible: action.toolbarSettingModalVisible
            });
            break;
        default:
            return state;
    }
};