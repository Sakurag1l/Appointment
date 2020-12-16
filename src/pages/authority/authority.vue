<template>
    <view>
		<view class="u-page">
			<view class="top">
			选择要添加管理审批权限的人      
			<u-button size="medium"  @click="show = true">查看</u-button>
			</view>
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
                <u-checkbox  :name="item.name" class="checkbox" v-model="item.checked"  v-for="(item,index) in studentitems" :key="index">{{item.name}}</u-checkbox>
                </u-checkbox-group>
            </view>
			</view>
		</u-popup>
        <view class="showname">
                <span> 老师：</span>
                <u-radio-group v-model="value">
                <u-radio 
                    v-for="(item, index) in teacherscheckList" :key="index" 
                    :disabled="true">
                    {{item.name}}
            </u-radio>
            </u-radio-group>
        </view>
		<view class="showname">
            <span> 学生：</span>
            <u-radio-group v-model="value" >
            <u-radio 
            	v-for="(item, index) in studentscheckList" :key="index" 
                        :disabled="true">
                        {{item.name}}
                    </u-radio>
                    </u-radio-group>
                </view>
		</view>
		<view>
			<u-radio-group v-model="value" @change="radioGroupChange">
			<u-radio 
				v-for="(item, index) in checkList" :key="index" 
				:name="item"
				:disabled="true"
			>
				{{item}}
			</u-radio>
			</u-radio-group>
		</view>
		<view class="buttom">
			<u-button  size="medium" type="primary" @click="comfirmAdd">确认添加</u-button>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="tabbar"></u-tabbar>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import {tabbar} from "../../store/getters"
import { addAdmin,getAllUsers } from '../../network/api'
	export default {
		data() {
			return {
				show: false,
				searchvalue: '',
				seletedAllstudent: false,
				seletedAllteacher: false,
				studentscheckList: [], //学生选中值
				teacherscheckList: [], //老师选中值
				studentitems: [],
				teacheritems: [],
				checkList: [], //选中值
				current: 0,
				tabbar: tabbar,
				aptm: {
					title: '会议审批',
					ogName: 'lsj',
					aptmTitle: 'appointment',
					aptmTime: '2020-10-31',
					aptmSite: '荟五',
				},
				value: 'orange',
			}
		},
		onLoad() {

		},
		onShow(){
			this.studentscheckList = []
			this.teacherscheckList = []
            this.getAllname()
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
					console.log('true')
				}else{
					this.seletedAllstudent=false
					this.studentitems.map(item=>{
						item.checked = false
					})
					this.studentscheckList=[]
					console.log('false')
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
					console.log('true')
				}else{
					this.seletedAllteacher=false
					this.teacheritems.map(item=>{
						item.checked = false
					})
					this.teacherscheckList=[]
					console.log('false')
				}
			},
			searchaptm(){
				console.log(this.searchvalue)
			},
			getAllname(){
                let data1 = 0;       //获取学生
                let data2 = 1;       //获取老师
                getAllUsers(data1).then( res => {
                    this.studentitems = res.data.data.data
                    for(let i = 0;i<this.studentitems.length;i++){
                        this.studentitems[i].checked = false;
                    }
                    console.log(this.studentitems);
                })
                getAllUsers(data2).then( res => {
                    this.teacheritems = res.data.data.data
                    for(let i = 0;i<this.teacheritems.length;i++){
                        this.teacheritems[i].checked = false;
                    }
                    console.log(this.teacheritems);
                })
                // this.$refs.uToast.show({
                //             duration: 1000,
                //             title: '仍在测试中···',
                //             type: 'error',
                //         })
            },
			comfirmAdd(){
				console.log(this.studentscheckList);
				console.log(this.teacherscheckList);
				let addList = [];
				this.studentscheckList.forEach(item => {
					addList.push(item.id)
				});
				this.teacherscheckList.forEach(item => {
					addList.push(item.id)
				});
				addAdmin(addList).then( res => {
					console.log(res);
					if(res.data){
						this.$refs.uToast.show({
							duration: 1000,
							title: '添加成功',
							type: 'success',
							url: '/pages/admin/admin'
						})
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/admin/admin'
							});
						},1200)
					}
				})
			}
		}
	}
</script>

<style>
	.top{
		display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
	}
	.buttom{
		text-align: center;
	}
	.popview{
		margin: 25rpx;
	}
	.showname{
		margin-left: 25rpx;
	}
	/* .text-contain{
		height: 250rpx;
	} */
</style>
