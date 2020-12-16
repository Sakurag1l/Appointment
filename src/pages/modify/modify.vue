<template>
    <view>
		<view class="u-page">
			<view class="text-contain">
            <!-- <u-form-item :label-position="labelPosition" label="商品类型"  label-width="150">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="selectItem" placeholder="请选择商品类型" @click="selectShow = true"></u-input>
			</u-form-item> -->
			</view>
			<view class="form">
			<u-form label-align="center" :model="aptmForm" ref="uForm">
                <u-form-item label-width="180rpx" label="组织人:">{{aptmForm.auditorName}}</u-form-item>
				<u-form-item label-width="180rpx" label="会议主题:"><u-input v-model="aptmForm.meetingTheme" /></u-form-item>
				<!-- <u-form-item label-width="180rpx" label="会议主题:">{{aptmForm.meetingTheme}}</u-form-item> -->
                <u-form-item label-width="180rpx" label="会议地点:">{{aptmForm.roomLocation}}</u-form-item>
				<u-form-item label-width="180rpx" label="会议日期:">{{aptmForm.date}}</u-form-item>
				<u-form-item label-width="180rpx" label="会议时间:">{{selectTime}}
					<!-- <u-input :border="border" type="select" :select-open="selectaptmTime" v-model="selectTime" @click="selectaptmTime = true"></u-input> -->
				</u-form-item>
                <u-form-item label-width="180rpx" label="会议备注:"><u-input v-model="aptmForm.remark" /></u-form-item>
			</u-form>
			</view>
			<view class="foot">
				<u-button size="medium" type="primary" @click="submit">确认修改</u-button>
			</view>
			<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
			<u-select mode="mutil-column" :list="timelist" v-model="selectaptmTime" @confirm="confirmtime"></u-select>
			<u-toast ref="uToast" />
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
	</view>
</template>

<script>
import { getDetailById,ModifyInfo } from '../../network/api'

	export default {
		data() {
			return {
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
				timelist: [
                    [
                    {
						label: '08:00'
					},
					{
						label: '08:30'
                    },
                    {
						label: '09:00'
                    },
                    {
						label: '09:30'
                    },
                    {
						label: '10:00'
                    },
                    {
						label: '10:30'
                    },
                    {
						label: '11:00'
                    },
                    {
						label: '11:30'
                    },
                    {
						label: '12:00'
                    },
                    {
						label: '12:30'
                    },
                    {
						label: '13:00'
                    },
                    {
						label: '13:30'
                    },
                    {
						label: '14:00'
                    },
                    {
						label: '14:30'
                    },
                    {
						label: '15:00'
                    },
                    {
						label: '15:30'
                    },
                    {
						label: '16:00'
                    },
                    {
						label: '16:30'
                    },
                    {
						label: '17:00'
                    },
                    {
						label: '17:30'
                    },
                    {
						label: '18:00'
                    },
                    {
						label: '19:00'
                    },
                    {
						label: '19:30'
                    },
                    {
						label: '20:00'
                    },
                    {
						label: '20:30'
                    },
                    {
						label: '21:00'
                    },
                    {
						label: '21:30'
                    },
                    {
						label: '22:00'
                    },],
                    [
                        {
						label: '08:00'
					},
					{
						label: '08:30'
                    },
                    {
						label: '09:00'
                    },
                    {
						label: '09:30'
                    },
                    {
						label: '10:00'
                    },
                    {
						label: '10:30'
                    },
                    {
						label: '11:00'
                    },
                    {
						label: '11:30'
                    },
                    {
						label: '12:00'
                    },
                    {
						label: '12:30'
                    },
                    {
						label: '13:00'
                    },
                    {
						label: '13:30'
                    },
                    {
						label: '14:00'
                    },
                    {
						label: '14:30'
                    },
                    {
						label: '15:00'
                    },
                    {
						label: '15:30'
                    },
                    {
						label: '16:00'
                    },
                    {
						label: '16:30'
                    },
                    {
						label: '17:00'
                    },
                    {
						label: '17:30'
                    },
                    {
						label: '18:00'
                    },
                    {
						label: '19:00'
                    },
                    {
						label: '19:30'
                    },
                    {
						label: '20:00'
                    },
                    {
						label: '20:30'
                    },
                    {
						label: '21:00'
                    },
                    {
						label: '21:30'
                    },
                    {
						label: '22:00'
                    },
                    ]
                ],
				aptmForm: {
					ogName: 'lsj',
					aptmTitle: 'appointment',
					aptmTime: '2020-10-31',
					aptmSite: '荟五',
					aptmremark: '111111remark'
				},
				meetingId: '',
			}
		},
		onLoad(option) {
			console.log(option)
			this.meetingId = option.meetingid
		},
		onShow(){
			getDetailById(this.meetingId).then( res => {
				console.log(res);
				this.aptmForm = res.data.data.data
				this.selectTime = `${this.aptmForm.startTime.substring(11,19)}-${this.aptmForm.endTime.substring(11,19)}`
				this.aptmForm.date = `${this.aptmForm.startTime.substring(0,10)}`
			})
		},
		created(){
			
		},
		methods: {
			searchaptm(){
				console.log(this.searchvalue)
			},
			selectConfirm(e) {
				console.log(e)
				this.selectItem = e[0].label
			},
			confirmtime(e){
				this.aptmForm.startTime = `${e[0].label}:00`
                this.aptmForm.endTime = `${e[1].label}:00`
                if(this.aptmForm.startTime > this.aptmForm.endTime){
                    this.selectTime = `${e[1].label}:00-${e[0].label}:00`
                    let temp = this.aptmForm.startTime
					this.aptmForm.startTime = this.aptmForm.endTime
					this.aptmForm.endTime = temp
					this.aptmForm.startTime = `${this.aptmForm.date} ${this.aptmForm.startTime}`,
					this.aptmForm.endTime = `${this.aptmForm.date} ${this.aptmForm.endTime}`
                }else{
					this.aptmForm.startTime = `${this.aptmForm.date} ${this.aptmForm.startTime}`,
					this.aptmForm.endTime = `${this.aptmForm.date} ${this.aptmForm.endTime}`,
                    this.selectTime = `${e[0].label}:00-${e[1].label}:00`
                }
			},
			submit(){
				let newMeetingInfo = {
					 deleteUserId: [],
						meetingInformation:{meetingTheme: this.aptmForm.meetingTheme,
						roomId: this.aptmForm.roomId,
						endTime: this.aptmForm.endTime,
						startTime: this.aptmForm.startTime,
						id: parseInt(this.meetingId),
						remark: this.aptmForm.remark,
						subscriberId: this.aptmForm.subscriberId,
						subscriberName: this.aptmForm.subscriberName,},
					userId: [],
				}
				ModifyInfo(newMeetingInfo).then( res => {
					console.log(res);
					if(res.data.meta.code == 0){
						this.$refs.uToast.show({
							duration: 1000,
							title: '修改成功',
							type: 'success',
							url: '/pages/manage/manage'
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/admin/admin'
							});
						},1200)
                    }else{
                        this.$refs.uToast.show({
                            title: '修改失败',
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
		text-align: center;
		margin-top: 2%;
	}
	/* .text-contain{
		height: 250rpx;
	} */
</style>
