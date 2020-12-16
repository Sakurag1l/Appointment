<!--
 * @Author: your name
 * @Date: 2020-11-01 20:15:46
 * @LastEditTime: 2020-11-18 21:07:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/pages/sign/sign.vue
-->
<template>
    <view>
		<view class="u-page">
			<view class="form">
			<u-form :model="aptmForm" ref="uForm">
                <u-form-item label-width="180rpx" label="组织人:">{{aptmForm.ogName}}</u-form-item>
				<u-form-item label-width="180rpx" label="会议主题:">{{aptmForm.aptmTitle}}</u-form-item>
                <u-form-item label-width="180rpx" label="会议地点:">{{aptmForm.aptmSite}}</u-form-item>
				<u-form-item label-width="180rpx" label="会议时间:">{{aptmForm.aptmDateandTime}}</u-form-item>
                <u-form-item label-width="180rpx" label="会议备注:">{{aptmForm.aptmremark}}</u-form-item>
			</u-form>
			</view>
			<view class="foot">
				<u-button size="medium" type="error" @click="nopresent">无法参加</u-button>
                <u-button size="medium" type="primary" @click="present">确认参加</u-button>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
                mode: 'date',
                showdate: false,
                showtime: false,
                aptmForm: {
                    ogName: '',
					aptmTitle: '',
                    aptmDateandTime: '',
                    aptmSite: '',
                    aptmremark:'',
				},
			}
		},
		onLoad() {

		},
		created(){
			
		},
		methods: {
			submit(){
                console.log(this.aptmForm)
            },
            confirmdate(e){
                console.log(e.result)
                this.aptmForm.aptmDate = e.result
            },
            confirmtime(e){
                console.log(e)
                this.aptmForm.aptmTime = `${e[0].label}-${e[1].label}`
            },
            toqiandao(){
                uni.navigateTo({
				    url: '/pages/admin/admin'
			    });
            },
            present(){
                console.log("yes")
            },
            nopresent(){
                console.log("no")
            }
		}
	}
</script>

<style>
	.form{
		margin: 10rpx;
	}
	.foot{
		justify-content: space-between;
		display: flex;
		justify-items: center;
		margin: 5%;
	}
</style>
