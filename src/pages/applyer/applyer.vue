<!--
 * @Author: your name
 * @Date: 2020-11-01 18:45:38
 * @LastEditTime: 2020-12-13 21:19:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/pages/applyer/applyer.vue
-->
<template>
	<view>
		<view class="u-page">
			<view class="text-contain">
            <u-form-item :label-position="labelPosition" label="会议主题:"  label-width="150">
				<u-search :clearabled="true" :show-action="true" action-text="搜索"  v-model="searchMeeting" @search="search" placeholder="会议主题"></u-search>
			</u-form-item>
			</view>
			<view>
			<u-swipe-action :show="item.show" :index="index" 
			v-for="(item, index) in list" :key="item.id" 
			@click="click" @open="open"
			:options="options"
			:bg-color="item.color"
			>
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.roomPhoto" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-1">会议主题: {{ item.meetingTheme }}</text>
					<text class="title u-line-2">会议地点: {{ item.roomLocation }}</text>
					<text class="title u-line-3">会议时间: {{ item.time }}</text>
				</view>
			</view>
			</u-swipe-action>
			</view>
			<u-calendar v-model="selectShow" max-date="2999-12-31" :mode="mode" @change="confirmdate" ></u-calendar>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { getApplyRecording, deleteMeeting } from '../../network/api'


	export default {
		data() {
			return {
				searchMeeting: '',
				mode: 'date',
				selectShow: false,
				searchvalue: '',
				seletedAll: false,
				selectTime: '',
				list: [],
				id: '',
				name: '',
				options: [
					{
						text: '详情',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				checkList: [], //选中值
				current: 0,
			}
		},
		onLoad() {

		},
		onShow(){
			this.id = wx.getStorageSync('id')
			this.name = wx.getStorageSync('name')
			this.newfetch()
		},
		created(){
			
		},
		methods: {
			newfetch(){
				let newMeetingData = {
					id: this.id,  //用户id
					theme: this.searchMeeting,
				}
				getApplyRecording(newMeetingData).then( res => {
					this.list = res.data.data.data
					for(let i = 0;i<this.list.length;i++){
						this.list[i].show = false;
						this.list[i].time = `${this.list[i].startTime}-${this.list[i].endTime.substring(11,19)}`
						if(this.list[i].check === 0){
						this.list[i].color = '#888888'}
						else if(this.list[i].check === 1){
						this.list[i].color = '#0066FF'}
						else if(this.list[i].check === -1){
						this.list[i].color = '#CC0000'}
					}
					console.log(this.list);
				})
			},
			search(){
				this.newfetch()
			},
			searchaptm(){
				this.newfetch()
			},
			click(index, index1) {      //index  是索引   index1是编辑或者删除
				if(index1 == 1) {
					this.$u.toast(`删除了第${index+1}个会议记录`);
					let deleteList = []
					deleteList.push(this.list[index].id)
					console.log(this.list[index]);
					deleteMeeting(deleteList).then( res => {
						console.log(res);
                        this.$refs.uToast.show({
                            duration: 1000,
                            title: '删除成功',
							type: 'success',
							url: '/pages/applyer/applyer'
						})
					})
				} else {
					this.list[index].show = false;
					uni.navigateTo({
						url: `/pages/detail/detail?meetingid=${this.list[index].id}`
					});
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				console.log(index);
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
				console.log(this.list);
			},
			confirmdate(e){
				this.selectTime = e.result
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		margin: 1%;
	}
	.foot{
		text-align: center;
		margin: 2%;
	}
	.item {
		display: flex;
		color: white;
		// margin: 5rpx;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	.title {
		text-align: left;
		font-size: 28rpx;
		color: white;
		// color: $u-content-color;
		margin-top: 20rpx;
	}
	.text-contain{
		margin: 2%;
	}
	/* .text-contain{
		height: 250rpx;
	} */
</style>
