<!--
 * @Author: your name
 * @Date: 2020-10-28 09:40:08
 * @LastEditTime: 2020-12-14 17:22:26
 * @LastEditors: Sakurag1_LSJ
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/App.vue
-->
<script>
	export default {
		onLaunch: function() {
			wx.setStorageSync('token', ''); 
			console.log("onlaunch");
			wx.checkSession({
                success:function(sucess){
					console.log(sucess);
					if(!wx.getStorageSync('token')){
						wx.reLaunch({
							url: '/pages/login/login'
						});
					}
                },
                fail:function(error){
                    wx.reLaunch({
						url: '/pages/login/login'
					});
                }
            })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
	
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
