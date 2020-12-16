<!--
 * @Author: your name
 * @Date: 2020-11-22 10:02:01
 * @LastEditTime: 2020-12-14 17:29:17
 * @LastEditors: Sakurag1_LSJ
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/pages/login/login.vue
-->
<template>
	<view class="login">
		<view class="img">
            <!-- <img src="../../static/logo.png" alt="logo"> -->
            <u-form label-align="center" :model="Form" ref="uForm">
            <u-form-item label-width="180rpx" label="学号/工号:"><u-input v-model="Form.identityId" /></u-form-item>
            <u-form-item label-width="180rpx" label="姓名:"><u-input v-model="Form.name" /></u-form-item>
            <u-form-item label-width="180rpx" label="手机号:"><u-input v-model="Form.phoneNumber" /></u-form-item>
            <u-form-item label-width="180rpx" label="身份:">
                <u-button :custom-style="customStyle" :plain="true" @click="showtime = true">{{Form.identity}}</u-button>
                <!-- {{Form.identity}} -->
                <u-select mode="single-column" v-model="showtime" @confirm="confirmtime" :list="list" :default-value="[0]"></u-select>
		        <!-- <u-button @click="showtime = true">{{identity}}</u-button> -->
                </u-form-item>
            <u-form-item label-width="180rpx" label="学院:"><u-input v-model="Form.college" /></u-form-item>
            </u-form>
        </view>
        <view>
        <!-- <view class="line"></view> -->
            <button class="btn" open-type="getUserInfo" @getuserinfo.native="onGetUserInfo">登陆/注册</button>
        </view>
        <van-popup :show='show' @close="onClose" position="bottom" custom-style="height: 47%;">
            <view class="message">
                <view class="line1">
                    <view class="line-img">
                        <!-- <img src="../../static/smallLogo.png" alt="logo"> -->
                    </view> 
                </view>
                <view style="font-size:32upx;margin-top:4%;font-weight:600;margin-bottom:4%">获取你的昵称、头像</view>
                <view class="line2">
                    <view class="line-img">
                        <open-data type="userAvatarUrl"></open-data>
                    </view>
                    <view class="line2-name">
                        <p><open-data type="userNickName"></open-data></p>
                        <span>微信个人信息</span>
                    </view>
                </view>
                <!-- <view class="line3">
                    <u-button type="default" size="normal" @click.native="onClose">取消</u-button>
                    <u-button type="primary" size="normal" @click.native="agree">允许</u-button>
                </view> -->
            </view>
        </van-popup>
	</view>
</template>


<script>
	customStyle: {
		// marginTop: '20px'// 注意驼峰命名，并且值必须用引号包括，因为这是对象
		color: '#6495ED'
	}
</script>

<script>
    import {LoginData,reLoginData} from '../../network/api';

	export default {
		data() {
			return {
                title: 'Login',
                show:false,
                showtime: false,
                code:'',
                encrypteData:'',
                iv:'',
                rawData:'',
                signature:'',
                identity: '',
                Form: {
                    identityId: '',
                    name: '',
                    phoneNumber: '',
                    identity: '',
                    college: ''
                },
                list: [{
						value: 0,
						label: '学生',
					},
					{
						value: 1,
						label: '老师',
					},],
			}
		},
		onLoad(option) {
            
        },
        onShow(){ 
            /*
            uni.login({
                    provider: 'weixin',
                    success: (loginRes)=> {
                        this.code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
                        console.log(this.code);
                    },
                    fail:function(error){
                        console.log(error);
                    }
                    });
                    */
            uni.checkSession({
                success:function(sucess){
                    console.log(sucess);
                    wx.login({
                    provider: 'weixin',
                    success:(loginRes) =>{
                        let code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
                        console.log(code);
                        reLoginData(code).then( res => {
                        console.log(res);
                        if(res.status == 200){
                            wx.setStorageSync('token', res.data.data.data.session_key);
                            wx.setStorageSync('id', res.data.data.data.id);
                            wx.setStorageSync('name', res.data.data.data.name);
                            uni.reLaunch({
                                url: '/pages/index/index'
                            });
                        }else{
                            uni.hideLoading();
                            uni.showToast({
                                title: '登录失败',
                                icon:'none'
                            });
                        }
                    })
                    } 
                });
                },
                fail:function(error){
                    console.log(error);
                    wx.login({
                    provider: 'weixin',
                    success:(loginRes) =>{
                        let code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
                        console.log(code);
                        reLoginData(code).then( res => {
                        console.log(res);
                        if(res.status == 200){
                            wx.setStorageSync('token', res.data.data.data.session_key);
                            uni.reLaunch({
                                url: '/pages/index/index'
                            });
                        }else{
                            uni.hideLoading();
                            uni.showToast({
                                title: '登录失败',
                                icon:'none'
                            });
                        }
                    })
                    } 
                });
                }
            })
        },
		methods: {
            Login(){
                uni.login({
                    provider: 'weixin',
                    success:(loginRes) =>{
                        this.code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
                        // console.log(this.code);
                        // this.handleLogin(); 
                        wx.requestSubscribeMessage({
                            tmplIds: ['7eJHsBSs_JXBh0qLCHS-Mgt9Uqjm00L9g0tjnSGNXic'],
                        success (res) { 
                            this.handleLogin(); 
                        }
                })
                    } 
                });
                
            },
            onClose(){
                this.show = false;
            },
            confirmtime(e){
                console.log(e);
                this.Form.identity = e[0].label
                this.identity = e[0].value
            },
            agree(){
                uni.reLaunch({
                    url: '/pages/index/index'
                });
            },
            onGetUserInfo(e){
                console.log(e);
                let {encryptedData,iv,rawData,signature} = e.detail;
                this.encryptedData = encryptedData;
                this.iv = iv;
                this.rawData = rawData;
                this.signature = signature;
                this.Login(); 
                //this.handleLogin();
            },
            reLogin(){
                // reLoginData(this.code).then( res => {
                //     console.log(res);
                //     if(res.status == 200){
                //         wx.setStorageSync('token', res.data.data.data.session_key);
                //         uni.reLaunch({
                //             url: '/pages/index/index'
                //         });
                //     }else{
                //         uni.hideLoading();
                //         uni.showToast({
                //             title: '登录失败',
                //             icon:'none'
                //         });
                //     }
                // })
            },
            handleLogin(){
                let query = this.Form
                query.identity = this.identity
                query.userCode = this.code
                uni.showLoading({ 
                    title: '登录中...'
                });
                console.log(query)
                LoginData(query).then( res => {
                    console.log(res);
                    if(res.status == 200){
                        wx.setStorageSync('token', res.data.data.data.session_key);
                        uni.reLaunch({
                            url: '/pages/index/index'
                        });
                    }else{
                        uni.hideLoading();
                        uni.showToast({
                            title: '登录失败',
                            icon:'none'
                        });
                    }
                },err => {
                    console.log(err)
                })
                uni.hideLoading();
                // login(query).then(res=>{
                //     if(res.data.data.status == 200){
                //         uni.setStorageSync('token', res.data.data.data);
                //         uni.hideLoading();
                //         uni.reLaunch({
                //             url: '/pages/index/List'
                //         });
                //     }else{ 
                //         uni.hideLoading();
                //         uni.showToast({
                //             title: '登录失败',
                //             icon:'none'
                //         });
                //     }
                // })
            }
        },
        
	}
</script>

<style>
page{
    height: 100%;
}
.login{
    width: 100%;
    height: 100%;
    background: #6495ED;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.img{
    margin-top: 15%;
    width: 478upx;
    height: 300upx;
}
.line-img{
    width: 100upx;
    height: 100upx;
}	
img{
    width: 100%;
    height: 100%;
}
.line{
    width: 100%;
    height: 1upx;
    border-bottom: 1upx solid #EBEBEB;
    margin-top: 15%;
}
.btn{
    width:592upx;
    height:112upx;
    background:rgba(255,255,255,1);
    border-radius:22upx;
    margin-top: 250upx;
    color: #52A08D;
    font-size: 42upx;
}
.message{
    display: flex;
    flex-direction: column;
    padding: 20upx;
}
.line1{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.line1 p{
    margin-left: 3%;
}
.line1 span{
    margin-left: 2%;
    font-weight: lighter;
    font-size: 26upx;
}
.line2{
    display: flex;
    align-items: center;
    padding: 2% 0;
    border-top: 1px  solid #cccccc;
    border-bottom: 1px  solid #cccccc;
}
.line2-name{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 3%;
}
.line-name p{
    margin-bottom: 2%;
}
.line2-name span{
    font-weight: lighter;
    font-size: 26upx;
    margin-top: 2%;
}
.line3{
    margin-top: 10%;
    display: flex;
    justify-content: center;
}
van-button{
    margin-right: 5%;
    margin-left: 5%;
}
</style>

