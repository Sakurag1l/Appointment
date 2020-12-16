<!--
 * @Author: your name
 * @Date: 2020-11-18 20:50:33
 * @LastEditTime: 2020-12-13 21:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/pages/detail/detail.vue
-->
<template>
    <view>
		<view class="u-page">
			<view class="text-contain">
            <!-- <u-form-item :label-position="labelPosition" label="商品类型"  label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="selectItem" placeholder="请选择商品类型" @click="selectShow = true"></u-input>
			</u-form-item> -->
			</view>
			<view class="form">
			<u-form class="formstyle" :model="aptmForm" ref="uForm">
                <u-form-item label-width="180rpx" label="组织人:">{{aptmForm.subscriberName}}</u-form-item>
				<u-form-item label-width="180rpx" label="会议主题:">{{aptmForm.meetingTheme}}</u-form-item>
                <u-form-item label-width="180rpx" label="会议地点:">{{aptmForm.roomLocation}}</u-form-item>
				<u-form-item label-width="180rpx" label="会议时间:">{{aptmForm.time}}
				</u-form-item>
                <u-form-item label-width="180rpx" label="会议备注:">{{aptmForm.remark}}</u-form-item>
                <u-form-item label-width="180rpx" label="导出参会人员:">
                    <u-button size="mini" type="primary" @click="exportData">导出Excel</u-button> (下载请在浏览器打开复制链接)
                </u-form-item>
			</u-form>
			</view>
			<view class="foot">
				<u-button size="medium" type="error" @click="over">结束会议</u-button>
                <u-button size="medium" type="primary" @click="cancel">取消预约</u-button>
				<u-toast ref="uToast" />
			</view>
			
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
	</view>
</template>

<script>
import { deleteMeeting,endMeeting,exportExcel,getDetailById} from '../../network/api'
	export default {
		data() {
			return {
				meetingId: '',
				selectShow: false,
				selectaptmTime: false,
				searchvalue: '',
				seletedAll: false,
				selectItem: '',
				selectTime: '',
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
				aptmForm: {
					ogName: 'lsj',
					aptmTitle: 'appointment',
					aptmTime: '2020-10-31',
					aptmSite: '荟五',
					aptmremark: '111111remark'
				}
			}
		},
		onLoad(option) {
			console.log(option);
			this.meetingId = option.meetingid
		},
		onShow(){
			getDetailById(this.meetingId).then( res => {
				console.log(res);
				this.aptmForm = res.data.data.data
				this.aptmForm.time = `${this.aptmForm.startTime}-${this.aptmForm.endTime.substring(11,19)}`
			})
		},
		created(){
			
		},
		methods: {
			exportData(){
				let dataurl = `http://heguicai.cool:9030//meeting/sign/table/${this.meetingId}`
				wx.downloadFile({
					// 示例 url，并非真实存在
					url: `http://heguicai.cool:9030//meeting/sign/table/${this.meetingId}`,
					success: function (res) {
						console.log(res);
						const filePath = res.tempFilePath
						wx.openDocument({
							fileType: 'xlsx',
							filePath: filePath,
							success: function (res) {
								console.log('打开文档成功')
							} 
						})
						console.log(dataurl);
						wx.setClipboardData({
							data: dataurl,
							success: function (res) {
								wx.getClipboardData({
								success: function (res) {
									wx.showToast({
									title: '复制成功，请在浏览器中打开'
									})
								}
								})
							}
							})
					}
					})

            },
			confirmtime(e){
				console.log(e)
			},
			over(){
				let endData = {
					id: this.meetingId
				}
				console.log(endData);
				endMeeting(endData).then( res => {
					console.log(res);
					if(res.data.meta.code == 0){
                        this.$refs.uToast.show({
                            duration: 1000,
                            title: '结束成功',
                            type: 'success',
                            url: '/pages/applyer/applyer'
                        })
                    }else{
                        this.$refs.uToast.show({
                            title: '结束失败',
                            type: 'error',
                        })
                    }
				})
			},
			cancel(){
				let idList = [this.meetingId]
				console.log(idList);
				deleteMeeting(idList).then( res => {
					console.log(res);
					if(res.data.meta.code == 0){
                        this.$refs.uToast.show({
                            duration: 1000,
                            title: '取消成功',
                            type: 'success',
                            url: '/pages/applyer/applyer'
                        })
                    }else{
                        this.$refs.uToast.show({
                            title: '取消失败',
                            type: 'error',
                        })
                    }
				})
			}
		}
	}
</script>

<style>
	.top{
		margin: 1%;
	}
	.foot{
		justify-content: space-between;
		display: flex;
		justify-items: center;
		margin: 5%;
	}
	.formstyle{
		margin: 3%;
	}
	/* .text-contain{
		height: 250rpx;
	} */
</style>
