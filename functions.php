<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;

function themeConfig($form) {
    $defaultAvatarUrl = 'http://blog.ruozhi.top/usr/uploads/avatar.jpg';
    $defaultAuthor = '小郑';
    $defaultProfile = '永远的热泪盈眶';

    // 站点LOGO
    $logoUrl = new Typecho_Widget_Helper_Form_Element_Text('logoUrl', NULL, NULL, _t('站点 LOGO 地址'), _t('在这里填入一个图片 URL 地址, 以在网站标题前加上一个 LOGO'));
    $form->addInput($logoUrl);
    // 头像
    $avatarUrl = new Typecho_Widget_Helper_Form_Element_Text('avatarUrl', NULL, $defaultAvatarUrl, _t('侧边栏头像地址'), _t("在这里填入一个图片URL地址, 以在侧边栏显示头像，默认为${defaultAvatarUrl}"));
    $form->addInput($avatarUrl);
    // 名称
    $author = new Typecho_Widget_Helper_Form_Element_Text('author', NULL, $defaultAuthor, _t('显示名称'), _t('显示在侧边栏的名称，如果不填则显示为作者名'));
    $form->addInput($author);
    // 个人简介
    $profile = new Typecho_Widget_Helper_Form_Element_Text('profile', NULL, $defaultProfile, _t('个人简介'), _t('在这里输入个人简介，以在侧边栏显示'));
    $form->addInput($profile);

    $sidebarBlock = new Typecho_Widget_Helper_Form_Element_Checkbox('sidebarBlock',
    array('ShowRecentPosts' => _t('显示最新文章'),
    'ShowRecentComments' => _t('显示最近回复'),
    'ShowCategory' => _t('显示分类'),
    'ShowArchive' => _t('显示归档'),
    'ShowOther' => _t('显示其它杂项')),
    array('ShowRecentPosts', 'ShowRecentComments', 'ShowCategory', 'ShowArchive', 'ShowOther'), _t('侧边栏显示'));

    $form->addInput($sidebarBlock->multiMode());
}

/*
function themeFields($layout) {
    $avatarUrl = new Typecho_Widget_Helper_Form_Element_Text('avatarUrl', NULL, NULL, _t('侧边栏头像地址'), _t('在这里填入一个图片URL地址, 以在侧边栏显示头像，默认为'));
    $layout->addItem($avatarUrl);
}
*/

