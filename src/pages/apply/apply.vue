<template>
    <view>
		<view class="u-page">
			<view class="form">
			<u-form label-align="center" :model="aptmForm" ref="uForm">
				<u-form-item label-width="180rpx" label="会议主题:"><u-input v-model="aptmForm.aptmTitle" /></u-form-item>
				<u-form-item label-align="center" label-width="180rpx" label="会议日期:">
                    <!-- <u-calendar v-model="showdate" max-date="2999-12-31" :mode="mode" @change="confirmdate" ></u-calendar>
		            <u-button @click="showdate = true">{{aptmForm.aptmDate}}</u-button> -->
                    {{date}}
                </u-form-item>
				<u-form-item label-width="180rpx" label="会议时间:">
                    <u-select mode="mutil-column" v-model="showtime" @confirm="confirmtime" :list="timelist"></u-select>
		            <u-button @click="showtime = true">{{aptmForm.aptmTime}}</u-button>
                    <!-- <u-icon style="margin-right:2%;" name="photo" color="#2979ff" size="28"></u-icon> -->
                </u-form-item>
                <!-- <u-form-item label-width="180rpx" label="参会人员:"><u-button size="medium"  @click="showceshi">选择</u-button></u-form-item> -->
                <u-form-item label-width="180rpx" label="参会人员:"><u-button size="medium"  @click="show = true">选择</u-button></u-form-item>
                <u-popup :closeable="true" length="60%" v-model="show">
                    <view class="popview">
                        <view>
                            <span> 老师：</span>
                            <checkbox :checked="seletedAllteacher" @tap="_seletedAllteacher">全选</checkbox>
                            <u-checkbox-group @change="seletedStatusteacher">
                            <u-checkbox :name="item.name" class="checkbox" v-model="item.checked" :value="item.id" v-for="(item,index) in teacheritems" :key="index">{{item.name}}</u-checkbox>
                            </u-checkbox-group>
                        </view>
                        <view>
                            <span> 学生：</span>
                            <checkbox :checked="seletedAllstudent" @tap="_seletedAllstudent">全选</checkbox>
                            <u-checkbox-group @change="seletedStatusstudent">
                            <u-checkbox :name="item.name" class="checkbox" v-model="item.checked"  v-for="(item,index) in studentitems" :key="index">{{item.name}}</u-checkbox>
                            </u-checkbox-group>
                        </view>
                    </view>
                </u-popup>
                <view class="showpeople">
                    <span> 老师：</span>
                    <u-radio-group v-model="value">
                    <u-radio 
                        v-for="(item, index) in teacherscheckList" :key="index" 
                        
                        :disabled="true"
                    >
                        {{item.name}}
                    </u-radio>
                    </u-radio-group>
                </view>
                <view class="showpeople">
                    <span> 学生：</span>
                    <u-radio-group v-model="value" >
                    <u-radio 
                        v-for="(item, index) in studentscheckList" :key="index" 
                        :disabled="true">
                        {{item.name}}
                    </u-radio>
                    </u-radio-group>
                </view>
                <u-form-item label-width="180rpx" label="会议备注:"><u-input v-model="aptmForm.aptmremark" /></u-form-item>
			</u-form>
			</view>
			<view class="foot">
				<u-button size="medium" type="primary" @click="submit">预约</u-button>
                <!-- <u-button size="medium" type="primary" @click="toqiandao">to 签到页面</u-button> -->
                <u-toast ref="uToast" />
			</view>
		</view>
	</view>
</template>

<script>
import { applyMeeting,getAllUsers } from '../../network/api'
	export default {
		data() {
			return {
                date: '',
                roomid: '',
                show: false,
                seletedAllstudent: false,
                seletedAllteacher: false,
                mode: 'date',
                showdate: false,
                showtime: false,
                list: [],
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
                    // {
					// 	label: '22:00'
                    // },
                    ],
                    [
                    //     {
					// 	label: '08:00'
					// },
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
					aptmTitle: '',
                    aptmDate: '',
                    aptmTime: '',
                    aptmremark:'',
                    startTime: '',
                    endTime: ''
                },
                studentitems: [],
                teacheritems: [],
                studentscheckList: [], //学生选中值
                teacherscheckList: [], //老师选中值
				fileList: [],
                current: 0,
                id: '',
                name: '',
			}
		},
		onLoad(option) {
            console.log(option)
            this.list = option.list.split(",")
            console.log(this.list)
            if(option.list !== ""){
                this.list.forEach(item => {
                    delete this.timelist[0][item]
                    delete this.timelist[1][item]
                });
            }
            console.log(this.timelist);
            this.roomid = option.id
            this.date = option.date
            this.aptmForm.aptmDate = option.date
        },
        onShow(){
            this.getAllname()
            this.id = wx.getStorageSync('id')
            this.name = wx.getStorageSync('name')
        },
		created(){
			
		},
		methods: {
            seletedStatusstudent(e) {
                this.studentscheckList = []
                this.studentitems.map(item=>{
					if(item.checked){
                        this.studentscheckList.push(item)
                    }
				})
				console.log(this.studentscheckList)
				if (this.studentscheckList.length === this.studentitems.length) {
					this.seletedAllstudent = true
				}
				else{
					this.seletedAllstudent = false
                }
                console.log(this.studentitems);
            },
            seletedStatusteacher(e) {  
				this.teacherscheckList = []
                this.teacheritems.map(item=>{
					if(item.checked){
                        this.teacherscheckList.push(item)
                    }
				})
				if (this.teacherscheckList.length === this.teacheritems.length) {
					this.seletedAllteacher = true
				}
				else{
					this.seletedAllteacher = false
				}
            },
            getAllname(){
                let data1 = 0;       //获取学生
                let data2 = 1;       //获取老师
                getAllUsers(data1).then( res => {
                    this.studentitems = res.data.data.data
                    this.studentitems.forEach(item => {
                        item.checked = false;
                    })
                    console.log(this.studentitems);
                })
                getAllUsers(data2).then( res => {
                    this.teacheritems = res.data.data.data
                    this.teacheritems.forEach(item => {
                        item.checked = false;
                    })
                    console.log(this.teacheritems);
                })
                // this.$refs.uToast.show({
                //             duration: 1000,
                //             title: '仍在测试中···',
                //             type: 'error',
                //         })
            },
			_seletedAllstudent(){
				if(!this.seletedAllstudent){
					this.seletedAllstudent=true
					this.studentscheckList = []
					this.studentitems.map(item=>{
						// this.checkList.push(item)
						this.studentscheckList.push(item)
						item.checked = true
					})
					console.log(this.studentscheckList)
					
				}else{
					this.seletedAllstudent=false
					this.studentitems.map(item=>{
						item.checked = false
					})
					this.studentscheckList=[]
					
				}
            },
            _seletedAllteacher(){
				if(!this.seletedAllteacher){
					this.seletedAllteacher=true
					this.teacherscheckList = []
					this.teacheritems.map(item=>{
						// this.checkList.push(item)
						this.teacherscheckList.push(item)
						item.checked = true
					})
					console.log(this.teacherscheckList)
					
				}else{
					this.seletedAllteacher=false
					this.teacheritems.map(item=>{
						item.checked = false
					})
					this.teacherscheckList=[]
					
				}
			},
			submit(){
                let inpeople = []
                this.teacherscheckList.forEach(item => {
                    inpeople.push(item.id)
                })
                this.studentscheckList.forEach(item => {
                    inpeople.push(item.id)
                })
                let applyData = {
                    deleteUserId: [0],
                    meetingInformation: { startTime: `${this.aptmForm.aptmDate} ${this.aptmForm.startTime}`,
                                            endTime: `${this.aptmForm.aptmDate} ${this.aptmForm.endTime}`,
                                            meetingTheme: this.aptmForm.aptmTitle,
                                            roomId: this.roomid,
                                            remark: this.aptmForm.aptmremark,
                                            subscriberId: this.id,      //用户id
                                            subscriberName: this.name   //用户姓名
                                        },
                     userId: inpeople
                }
                console.log(applyData)
                applyMeeting(applyData).then( res => {
                    console.log(res);
                    if(res.data.meta.code == 0){
                        this.$refs.uToast.show({
                            duration: 1000,
                            title: '预约成功',
                            type: 'success',
                            url: '/pages/index/index'
                        })
                    }else{
                        this.$refs.uToast.show({
                            title: '预约失败,时间段被预约',
                            type: 'error',
                        })
                    }
                })
            },
            confirmdate(e){
                console.log(e.result)
                this.aptmForm.aptmDate = e.result
            },
            confirmtime(e){
                console.log(e)
                this.aptmForm.startTime = `${e[0].label}:00`
                this.aptmForm.endTime = `${e[1].label}:00`
                if(this.aptmForm.startTime > this.aptmForm.endTime){
                    this.$refs.uToast.show({
                        duration: 1000,
                        title: '选择正确的时间段！',
                        type: 'error',
                    })
                    // this.aptmForm.aptmTime = `${e[1].label}-${e[0].label}`
                    // let temp = this.aptmForm.startTime
                    // this.aptmForm.startTime = this.aptmForm.endTime
                    // this.aptmForm.endTime = temp
                }else{
                    this.aptmForm.aptmTime = `${e[0].label}-${e[1].label}`
                }
            },
            returntoindex(){
				uni.navigateTo({
                    url: "/pages/index/index"
                });
			},
            toqiandao(){
                uni.navigateTo({
				url: '/pages/sign/sign'
			});
            }
		}
	}
</script>

<style lang="scss" scoped>
	.form{
		margin: 10rpx;
	}
	.foot{
		text-align: center;
	}
    .popview{
        margin: 25rpx;
    }
    .showpeople{
        margin-left: 10rpx;
    }
</style>
