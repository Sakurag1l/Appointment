/*
 * @Author: your name
 * @Date: 2020-11-01 09:41:56
 * @LastEditTime: 2020-12-06 16:18:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/store/getters.js
 */
export const tabbar = [{
    iconPath: "home",
    selectedIconPath: "home-fill",
    text: '审批',
    isDot: true,
    customIcon: false,
    pagePath: '/pages/admin/admin'
},
{
    iconPath: "photo",
    selectedIconPath: "photo-fill",
    text: '添加',
    customIcon: false,
    pagePath: '/pages/appointment/appointment'
},
{
    iconPath: "account",
    selectedIconPath: "account-fill",
    text: '管理',
    customIcon: false,
    pagePath: '/pages/manage/manage'
},
{
    iconPath: "play-right",
    selectedIconPath: "play-right-fill",
    text: '权限',
    customIcon: false,
    pagePath: '/pages/authority/authority'
},
]