<template>
	<view class="content">
		<button @click="set">click</button>
		<view>
			<uni-nav-bar  shadow=true title="预约申请">
				<view slot="left" @click="toApplyer">申请者</view>
    			<!-- <view slot="right" @click="toAdmin">管理</view> -->
			</uni-nav-bar>
		</view>
		<!-- <view class="header"> -->
			<!-- <view class="contain"> -->
				<u-search style="margin:2%;" :clearabled="true" :show-action="true" action-text="搜索"  v-model="searchvalue" @search="search" placeholder="请输入会议室名称"></u-search>
			<!-- </view> -->
		<!-- </view> -->
		<view class="calendar">
			<!-- <u-calendar v-model="showcalendar" max-date="2999-12-31" :mode="mode" @change="confirm"></u-calendar>
			<u-icon @click="clickshow" name="calendar"></u-icon> -->
			<lxCalendar @change="change"></lxCalendar>
		</view>
		<view v-for="(item,index) in listroom" :key="index">
		<view>
			<view class="room">
			<span style="color:blue;margin-left:30rpx;">|</span>
			<!-- <u-cell-item :title-style={'font-size': '24rpx'} :arrow=false title="｜ 个人设置"> -->
			<h1 style="font-size:26rpx;margin-left:30rpx;"> {{item.roomName}}</h1>
			<!-- </u-cell-item> -->
			</view>
			<u-row gutter="16" justify="center">
				<u-col span="6">
					<view class="picture">
					<u-image width="100%" height="200rpx" :src="item.roomPhoto"></u-image>
				</view>
				</u-col>
				<u-col span="6">
					<view class="right">
					<view class="a">地点:{{item.roomLocation}}</view>
					<view class="a">容量:{{item.populationCapacity}}人</view>
					<view class="a">配置:{{item.configurationInformation}}</view>
					<!-- <view class="a">caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</view> -->
				</view>
				</u-col>
			</u-row>
			<view class="text-contain">
				<!-- <view class="picture">
					<u-image width="30%" height="200rpx" :src="src"></u-image>
				</view> -->
				<!-- <view class="right">
					第一会议室   100人
				</view> -->
			</view>
		</view>
		<view>
			<u-row gutter="24">
			<u-col span="8">
				<view class="table">					
					<u-row gutter="24">
						<u-col span="1">
						<span>8</span>
						</u-col>
						<u-col span="2">
						<span>9</span>
						</u-col>
						<u-col span="2">
						<span>10</span>
						</u-col>
						<u-col span="2">
						<span>11</span>
						</u-col>
						<u-col span="2">
						<span>12</span>
						</u-col>
						<u-col span="2">
						<span>13</span>
						</u-col>
						<u-col span="1">
						<span>14</span>
						</u-col>
					</u-row>
					<u-table class="menu">
						<u-tr>
							<u-th class="menu"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
						</u-tr>
					</u-table>
					<u-row gutter="24">
						<u-col span="2">
						<span>15</span>
						</u-col>
						<u-col span="2">
						<span>16</span>
						</u-col>
						<u-col span="2">
						<span>17</span>
						</u-col>
						<u-col span="2">
						<span>19</span>
						</u-col>
						<u-col span="2">
						<span>20</span>
						</u-col>
						<u-col span="1">
						<span>21</span>
						</u-col>
						<u-col span="1">
						<span>22</span>
						</u-col>
					</u-row>
					<u-table>
						<u-tr class="u-tr">
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
							<u-th class="u-th"></u-th>
						</u-tr>
					</u-table>
				</view>
			</u-col>
			<u-col span="4">
				<view class="button">
					<u-button size="medium" @click="makeappointment(index)" type="primary">预定</u-button>
				</view>
			</u-col>
		</u-row>
		</view>
		</view>
	</view>
</template>

<script>
import {lxCalendar} from '../../lx-calendar/components/lx-calendar/lx-calendar'
import {uniCalendar,uniNavBar,uniSearchBar} from '@dcloudio/uni-ui'
import { GetAllRoom,SearchRoonByName } from '../../network/api'

	export default {
		components: {
			uniCalendar,
			uniNavBar,
			uniSearchBar,
			lxCalendar,
        },
		data() {
			return {
				Date: '',
				listroom: [],
				show: false,
				mode: 'date',
				showcalendar: false,
				roomName: '会议室',
				value: '',
				searchvalue: '',
				time: {
					startTime: '',
					endTime: '',
				},
				list: [
					{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
			}                        
		},
		onShow() {
			var date = new Date();       
			var mon = date.getMonth() + 1;       
			var day = date.getDate();
			var currDate = date.getFullYear() + "-"+ (mon<10?"0"+mon:mon) + "-"+(day<10?"0"+day:day);
			console.log(currDate);
			// let nowtime = new Date()
			// let str = nowtime.toLocaleDateString()
			// this.Date = str.replace(/([/])/g,'-')
			this.Date = currDate
			console.log(this.Date);
			this.time.startTime = `${this.Date} 08:00:00`
			this.time.endTime = `${this.Date} 23:00:00`
			this.newFetch()
		},
		onLaunch(){
			// wx.getSetting({
			// 	withSubscriptions: true,
			// 	success (res) {
			// 		console.log(res.authSetting)
			// 		// res.authSetting = {
			// 		//   "scope.userInfo": true,
			// 		//   "scope.userLocation": true
			// 		// }
			// 		console.log(res.subscriptionsSetting)
			// 		// res.subscriptionsSetting = {
			// 		//   mainSwitch: true, // 订阅消息总开关
			// 		//   itemSettings: {   // 每一项开关
			// 		//     SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
			// 		//     SYS_MSG_TYPE_RANK: 'accept'
			// 		//     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject', // 普通一次性订阅消息
			// 		//     ke_OZC_66gZxALLcsuI7ilCJSP2OJ2vWo2ooUPpkWrw: 'ban',
			// 		//   }
			// 		// }
			// 	}
			// 	})
			console.log("launch");
			wx.requestSubscribeMessage({
                    tmplIds: ['7eJHsBSs_JXBh0qLCHS-Mgt9Uqjm00L9g0tjnSGNXic'],
                    success (res) { 
						console.log(res);
                        console.log(111);
                    }
                })
			console.log("this is onlauch");
		},
		onLoad(){
			console.log("this is onLoad");
		},
		methods: {
			set(event){
				wx.showModal({
				title: '提示',
				content: '这是一个模态弹窗',
				success (res) {
					if (res.confirm) {
						try{
							// wx.openSetting({
							// 	success (res) {
							// 		console.log(res);
							// 		console.log(res.authSetting)
							// 		// res.authSetting = {
							// 		//   "scope.userInfo": true,
							// 		//   "scope.userLocation": true
							// 		// }
							// 	}
							// 	})
							// console.log("try");
							wx.requestSubscribeMessage({
							tmplIds: ['7eJHsBSs_JXBh0qLCHS-Mgt9Uqjm00L9g0tjnSGNXic'],
							success (res) { 
								console.log(111);
							}
						})}
						catch{
							console.log("error");
						}
					} else if (res.cancel) {
						console.log('用户点击取消')
					}
					}
				})

				console.log("this is set");
				
			},
			newFetch(){
				let roomdata = {
					startTime: `${this.Date} 08:00:00`,
					endTime: `${this.Date} 23:00:00`,
					name: this.searchvalue
				}
				GetAllRoom(roomdata).then( res => {
					console.log(res)
					this.listroom = res.data.data.data
					console.log(this.listroom)
				})
			},
			change(e){
				console.log(e);
				this.Date = e.fulldate
				this.newFetch()
            },
			open(){
				this.$refs.calendar.open();
			},
			clickshow(){ 
				this.showcalendar = true,
				console.log("true")
			},
			confirm(e){
				console.log(e);
			},
			opemcalendar(){
				this.showcalendar = true
			},
			chooseroom(e){
				console.log(e[0].label)
				this.roomName = e[0].label
			},
			search(){
				this.newFetch()
			},
			makeappointment(index){
				console.log(index)
				uni.navigateTo({
                    url: `/pages/apply/apply?id=${this.listroom[index].id}&date=${this.Date}&list=${this.listroom[index].timeList}`
                });
			},
			toApplyer(){
				uni.navigateTo({
                    url: '/pages/applyer/applyer'
                });
			},
			toAdmin(){
				uni.navigateTo({
                    url: '/pages/manage/manage'
                });
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
	}
	.menu{
		background-color: red;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.header{
		/* padding: 24rpx; */
		display: flex;
		margin: 2%;
		background-color:red;
	}
	.calendar{
		text-align: center;
	}
	.room{
		/* background-color: gainsboro; */
		display: flex; 
		height: 85rpx;
		flex-direction: row; 
		align-items: center;

	}
	.text-contain{
		/* display: flex; */
        /* justify-content: flex-start; */
		justify-items: center;
	}
	.right{

		margin-top: 30rpx;
		display: flex;
        flex-direction: column;
        justify-content:flex-start;
		flex-wrap: wrap;
        align-items: center;
        width: 80%;
        /* height: 100vh; */
	}
	.a{
		border: 1upx solid #FFFFFF;
	}
	.table{
		height: 150rpx;
	}
	.button{
		height: 150rpx;
		text-align: center;
		display: flex; 
		flex-direction: row; 
		align-items: center;
	}
</style>
