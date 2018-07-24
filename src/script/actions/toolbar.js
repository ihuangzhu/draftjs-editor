import {
    TOOLBAR_LINK_MODAL_VISIBLE,
    TOOLBAR_IMAGE_MODAL_VISIBLE,
    TOOLBAR_EMBED_MODAL_VISIBLE,
    TOOLBAR_SETTING_MODAL_VISIBLE
} from '../constants/actionTypes';


// 链接
export const setToolbarLinkModalVisible = (toolbarLinkModalVisible) => ({
    type: TOOLBAR_LINK_MODAL_VISIBLE,
    toolbarLinkModalVisible
});

// 图片
export const setToolbarImageModalVisible = (toolbarImageModalVisible) => ({
    type: TOOLBAR_IMAGE_MODAL_VISIBLE,
    toolbarImageModalVisible
});

// 嵌入
export const setToolbarEmbedModalVisible = (toolbarEmbedModalVisible) => ({
    type: TOOLBAR_EMBED_MODAL_VISIBLE,
    toolbarEmbedModalVisible
});

// 设置
export const setToolbarSettingModalVisible = (toolbarSettingModalVisible) => ({
    type: TOOLBAR_SETTING_MODAL_VISIBLE,
    toolbarSettingModalVisible
});
