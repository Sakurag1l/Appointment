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
			>
			<view class="item u-border-bottom">
				<image mode="aspectFill" :src="item.roomPhoto" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="title u-line-1">会议主题: {{ item.meetingTheme }}</text>
					<text class="title u-line-2">会议地点: {{ item.roomLocation }}</text>
					<text class="title u-line-3">会议时间: {{ item.startTime }}</text>
				</view>
			</view>
			</u-swipe-action>
			</view>
			<u-calendar v-model="selectShow" max-date="2999-12-31" :mode="mode" @change="confirmdate" ></u-calendar>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="tabbar"></u-tabbar>
	</view>
</template>

<script>
import {tabbar} from "../../store/getters"
import { GetAllMeeting,deleteMeeting } from '../../network/api'

	export default {
		data() {
			return {
				mode: 'date',
				searchMeeting: '',
				selectShow: false,
				searchvalue: '',
				seletedAll: false,
				selectTime: '',
				list: [],
				id: '',
				name: '',
				options: [
					{
						text: '编辑',
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
				selectList: [{
						value: 'USA',
						label: '美国'
					},
					{
						value: 'CHN',
						label: '中国',
						checked: 'true'
					},
					{
						value: 'BRA',
						label: '巴西'
					},
					{
						value: 'JPN',
						label: '日本'
					}
				],
				checkList: [], //选中值
				current: 0,
				tabbar: tabbar,
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
				let checkRecordingList = {
				id: this.id,     //用户id
				theme: this.searchMeeting,
				type: 1,    //type=1审核了
			}
			GetAllMeeting(checkRecordingList).then( res => {
				this.list = res.data.data.data
				console.log(this.list);
			})
			},
			search(){
				this.newfetch()
			},
			click(index, index1) {      //index  是索引   index1是编辑或者删除
				if(index1 == 1) {
					let deleteData = [this.list[index].id]
					deleteMeeting(deleteData).then(res => {
						console.log(res);
						this.newfetch()
					})
					this.$u.toast(`删除了第${index+1}个记录`);
				} else {
					this.list[index].show = false;
					uni.navigateTo({
						url: `/pages/modify/modify?meetingid=${this.list[index].id}`
					});
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
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
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.text-contain{
		margin: 2%;
	}
	/* .text-contain{
		height: 250rpx;
	} */
</style>
