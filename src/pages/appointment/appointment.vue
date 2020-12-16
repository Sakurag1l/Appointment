<!--
 * @Author: your name
 * @Date: 2020-10-30 19:23:16
 * @LastEditTime: 2020-12-06 22:12:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/pages/appointment/appointment.vue
-->
<template>
    <view>
		<view class="u-page">
			<view class="form">
			<u-form label-align="center" :model="aptmForm" ref="uForm">
				<u-form-item label-width="180rpx" prop="info" label="会议室名称:"><u-input v-model="aptmForm.name" /></u-form-item>
				<u-form-item label-width="180rpx" prop="info" label="会议室地址:"><u-input v-model="aptmForm.site" /></u-form-item>
				<u-form-item label-width="180rpx" prop="people" label="可容纳人数:"><u-input v-model="aptmForm.people" /></u-form-item>
				<u-form-item label-width="180rpx" prop="info" label="配置信息:"><u-input v-model="aptmForm.info" /></u-form-item>
			</u-form>
			</view>
			<view class="foot">
				<u-upload ref="uUpload" @on-change="up(lists)" :action="1" max-count="1" :auto-upload="false" :file-list="fileList" ></u-upload>
				<u-button size="medium" type="primary" @click="submit">提交</u-button>
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="tabbar"></u-tabbar>
	</view>
</template>

<script>
import {tabbar} from "../../store/getters"
import { AddRoom }  from "../../network/api"

	export default {
		data() {
			return {
                aptmForm: {
					name: '',
					people: '',
					site: '',
					info: '',
				},
				fileList: [],
				current: 0,
				tabbar: tabbar,
				rules: {
				people: [
					{ 
						required: true, 
						message: '人数必须为数字', 
						type: "number",
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					}
				],
			}
			}
		},
		onLoad() {

		},
		created(){
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit(){
				var myDate = new Date();
				this.fileList = this.$refs.uUpload.lists
				let newRoom = {
					configurationInformation: this.aptmForm.info,
					populationCapacity: this.aptmForm.people,
					roomLocation: this.aptmForm.site,
					roomName: this.aptmForm.name,
					roomPhoto: `${myDate.getTime()}.jpg`
				}
				console.log(newRoom);
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log("valid");
						wx.uploadFile({
							url: 'https://test.heguicai.cool/meeting/room/insert', //仅为示例，并非真实的接口地址
							name: 'file',
							filePath: this.fileList[0].file.path,
							method: 'post',
							header: {
								'authorization': wx.getStorageSync('token'),
								'content-type': 'multipart/form-data' //修改此处即可
							},
							formData:newRoom,
							success (res) {
								this.$refs.uToast.show({
									duration: 1000,
									title: '添加成功',
									type: 'success',
								})
								uni.reLaunch({
									url: '/pages/admin/admin'
								});
							}
						})
					} else {
						console.log('验证失败');
						this.$refs.uToast.show({
								duration: 1000,
								title: '添加成功',
								type: 'success',
						})
						uni.reLaunch({
							url: '/pages/admin/admin'
						});
					}
				});
				
				// console.log(newRoom);
				// let fileForm = new FormData()
      			// fileForm.append('file', this.fileList[0].file.path)
				// AddRoom(newRoom,data).then( res => {
				// 	console.log(res)
				// })
			// 	uni.chooseImage({
			// 	count: 6, //默认9
			// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 	sourceType: ['album'], //从相册选择
			// 	success: function (res) {
			// 		console.log(JSON.stringify(res.tempFilePaths));
			// 	}
			// });
			// wx.chooseImage({
				// success (res) {
					// wx.uploadFile({
					// url: 'http://192.168.3.80:9030/meeting/room/insert', //仅为示例，非真实的接口地址
					// filePath: this.fileList[0].file.path,
					// name: 'file',
					// formData:fileData,
					// // formData: {
					// // 	'user': 'test'
					// // },
					// success (res){
					// 	console.log(res);
					// 	//do something
					// }
					// })
				// }
				// })
			},
		}
	}
</script>

<style>
	.form{
		margin: 10rpx;
	}
	.foot{
		text-align: center;
	}
</style>
