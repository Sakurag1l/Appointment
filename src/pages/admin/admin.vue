<template>
    <view>
		<view class="u-page">
			<view class="top">
				<u-search :clearabled="true" placeholder="请输入会议主题" :show-action="true" action-text="搜索" v-model="searchMeeting" @search="searchaptm"></u-search>
			</view>
			<view>
			<u-sticky>
			<u-row gutter="16" justify="center">
			<u-col span="3">
				<checkbox :checked="seletedAll" @tap="_seletedAll">全选</checkbox>
			</u-col>
			<u-col span="4">
				<u-button size="medium" type="primary" @click="agreeMeeting">同意</u-button>
			</u-col>
			<u-col span="5">
				<u-button size="medium" type="error" @click="cancelMeetingList">拒绝</u-button>
			</u-col>
			</u-row>
			</u-sticky>
		</view>		
		<view class="contain">
			<checkbox-group @change="seletedStatus">
				<checkbox class="checkbox" :checked="item.checked" :value="index" v-for="(item,index) in items" :key="index">
					<u-card margin="30rpx" title="会议审批">
				<view class="text-contain" slot="body">
					<!-- <u-form :model="aptm" ref="uForm"> -->
						<u-form-item label-width="150rpx" label="组织人:">{{item.subscriberName}}</u-form-item>
						<u-form-item label-width="150rpx" label="会议主题:">{{item.meetingTheme}}</u-form-item>
						<u-form-item label-width="150rpx" label="会议地点:">{{item.roomLocation}}</u-form-item>
						<u-form-item label-width="150rpx" label="会议时间:">{{item.time}}</u-form-item>
						<u-form-item label-width="150rpx" label="会议备注:">{{item.remark}}</u-form-item>
					<!-- </u-form> -->
				</view>
			</u-card></checkbox>
			</checkbox-group>
		</view>
		
			<!-- 所有内容的容器 -->
		<!-- <view>
			<u-card :title="aptm.title" margin="30rpx">
				<view class="text-contain" slot="body">
					<u-form :model="aptm" ref="uForm">
						<u-form-item label-width="150rpx" label="组织人:">{{aptm.ogName}}</u-form-item>
						<u-form-item label-width="150rpx" label="主题名称:">{{aptm.aptmTitle}}</u-form-item>
						<u-form-item label-width="150rpx" label="会议地点:">{{aptm.aptmSite}}</u-form-item>
						<u-form-item label-width="150rpx" label="会议时间:">{{aptm.aptmTime}}</u-form-item>
					</u-form>
				</view>
			</u-card>
		</view> -->
		<!-- <button  open-type="getUserInfo" @getuserinfo.native="onGetUserInfo">登陆/注册</button>
		<button @click="returna">返回</button> -->
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="tabbar"></u-tabbar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import {tabbar} from "../../store/getters"
import { GetAllMeeting,GetAllRoom,checkMeeting } from "../../network/api"

	export default {
		
		tapName: function(event) {
			console.log(event)
		},
		data() {
			return {
				searchMeeting: '',
				seletedAll: false,
				id: '',
				name : '',
				items: [],
				checkList: [], //选中值
				roomList: [],
				current: 0,
				tabbar: tabbar,
				aptm: {
					title: '会议审批',
					ogName: 'lsj',
					aptmTitle: 'appointment',
					aptmTime: '2020-10-31',
					aptmSite: '荟五',
				}
			}
		},
		onShow(){
			this.id = wx.getStorageSync('id')
			this.name = wx.getStorageSync('name')
			this.newfetch()
		},
		onLoad() {
			// GetAllMeeting(data).then( res => {
			// 	this.items = []
			// 	for(let i = 0;i<res.data.data.data.length;i++){
			// 		if(res.data.data.data[i].check == '0'){
			// 			this.items.push(res.data.data.data[i])
			// 		}
			// 	}
			// 	for(let i = 0;i<this.items.length;i++){
			// 		this.items[i].checked = false
			// 		this.items[i].time = `${this.items[i].startTime}-${this.items[i].endTime.substring(11,19)}`
			// 		for(let j=0;j<this.roomList.length;j++){
			// 			if(this.items[i].roomId == this.roomList[j].id){
			// 				this.items[i].aptmSite = this.roomList[j].roomLocation
			// 				break
			// 			}
			// 		}
			// 	}
			// 	console.log(this.items)
			// })
		},
		created(){
			
		},
		
		methods: {
			
			Login(){
                uni.login({
                    provider: 'weixin',
                    success:(loginRes) =>{
                        // this.code=loginRes.code;//js_code可以给后台获取unionID或openID作为用户标识
						console.log(loginRes);
						wx.getUserInfo({
							success: function(res) {
								console.log(res);
							}
						})
                        
                    } 
                });
            },
		onGetUserInfo(e){
				console.log(e);
				this.Login(); 
		},
		seletedStatus(e) {
				this.checkList = []
				for(let i = 0;i<e.detail.value.length;i++){
					this.checkList.push(this.items[i])
				}
				console.log(this.checkList)
				if (this.checkList.length === this.items.length) {
					this.seletedAll = true
				}
				else{
					this.seletedAll = false
				}
			},
			_seletedAll(){
				if(!this.seletedAll){
					this.seletedAll=true
					this.checkList = []
					this.items.map(item=>{
						this.checkList.push(item)
						item.checked = true
					})
					console.log(this.checkList)
				}else{
					this.seletedAll=false
					this.items.map(item=>{
						item.checked = false
					})
					this.checkList=[]
				}
			},
			newfetch(){
				let checkRecordingList = {
				id: -1,
				theme: this.searchMeeting,
				type: 0,    //type=0未审核
			}
			GetAllMeeting(checkRecordingList).then( res => {
				this.items = res.data.data.data
				console.log(this.items);
				for(let i = 0;i<this.items.length;i++){
					this.items[i].checked = false
					this.items[i].time = `${this.items[i].startTime}-${this.items[i].endTime.substring(11,19)}`
				}
			})
			},
			searchaptm(){
				let searchData = {
					type: 0,
					size: 9999,
					tag: this.searchvalue
				}
				GetAllMeeting(searchData).then( res => {
					this.items = []
					for(let i = 0;i<res.data.data.data.length;i++){
						if(res.data.data.data[i].check == '0'){          //未审核 check为'0' 审核了check为'1'
							this.items.push(res.data.data.data[i])
						}
					}
					for(let i = 0;i<this.items.length;i++){
						this.items[i].checked = false
						this.items[i].time = `${this.items[i].startTime}-${this.items[i].endTime.substring(11,19)}`
						for(let j=0;j<this.roomList.length;j++){
							if(this.items[i].roomId == this.roomList[j].id){
								this.items[i].aptmSite = this.roomList[j].roomLocation
								break
							}
						}
					}
					console.log(this.items)
				})
			},
			agreeMeeting(){
				let checkData = []
				for(let i = 0;i<this.checkList.length;i++){
					let data1 = {
						auditorId: this.id,
						auditorName: this.name,
						id: this.checkList[i].id,
						check: 1
					}
					checkData.push(data1)
				}
				checkMeeting(checkData).then( res => {
					console.log(res);
					this.$refs.uToast.show({
							duration: 1000,
							title: '同意成功',
							type: 'success',
							url: '/pages/admin/admin'
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/admin/admin'
							});
						},1200)
				})
				// this.newfetch()
				// checkMeeting
			},
			cancelMeetingList(){
				let refuse = []
				for(let i = 0;i<this.checkList.length;i++){
					let data1 = {
						auditorId: this.id,
						auditorName: this.name,
						id: this.checkList[i].id,
						check: -1
					}
					refuse.push(data1)
				}
				checkMeeting(refuse).then( res => {
					console.log(res);
					this.$refs.uToast.show({
							duration: 1000,
							title: '拒绝成功',
							type: 'success',
							url: '/pages/admin/admin'
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/admin/admin'
							});
						},1200)
				})
				// cancelMeeting
				console.log(this.checkList)
			},
			returna(){
				uni.navigateTo({
                    url: "/pages/index/index"
                });
			}
		}
	}
</script>

<style>
	.top{
		margin: 1%;
	}
	.contain{
		margin: 15rpx;
	}
	.text-contain{
		width: 600rpx;
	}
	.u-row {
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		background-color: white;
	}
	
	/* .fonts{
		font-weight: bold;
	} */
	/* .text-contain{
		height: 250rpx;
	} */
</style>
