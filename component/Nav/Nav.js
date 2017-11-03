// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){

	// 模板
	var template = `<div class="m-nav f-cb">
		<img class="logo" src="${base_url}/res/images/logo.png" alt="" />
	</div>`;

	// options 参数说明
	// {
	//   parent: dom节点, 父容器 (必填)
	// }）
	function Nav(options){
		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = this._template.cloneNode(true);

		// 初始化
		this.init();
	}

	// 混入事件管理器
	_.extend(Nav.prototype, App.emitter);

	Nav.prototype._template = _.html2node(template);

	Nav.prototype.init = function(){
			// 挂载组件
			// 先挂载 容器组件，不然Tabs的滑块offset定位不准确
			this.parent.appendChild(this.container);
			// 1.顶栏选项卡 组件
			this.hdtab = new App.Tabs({
				parent: this.container, 
				index:this.getTabIndex(), 
				nTabData:[
					{name:'首页',url:'/index'},
					{name:'作品',url:base_url + '/html/works/list.html'},
					{name:'圈子',url:'javascript:;'},
					{name:'奇思妙想',url:'javascript:;'}
				]
			});
			// 2.搜索框 组件
			this.search = new App.Search({parent: this.container});
			// 3.未登录显示的客人 组件
			this.nGuest = new App.Guest({parent: this.container});
			// 4.已登录显示的用户 组件
			this.nUser = new App.User({parent: this.container});

			// 初始化登录状态
			this.initLoginStatus();
	};
	//  初始化登录状态
	Nav.prototype.initLoginStatus = function(){
		_.ajax({
			url: '/api/users?getloginuser',
			method: 'GET',
			success: (function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.code === 200){
					// 触发登录事件
					this.emit('login', data.result);
				}
				// 如果不是200，则隐藏User，显示Guest，默认就是如此，无需操作
				else{
					// 触发未登录事件
					this.emit('notLogin');
				}
			}).bind(this),
			fail: function(){
				console.log('api/users?getloginuser 失败');
			}
		})
	};
	//  获取 tab的选中项的序号
	Nav.prototype.getTabIndex = function(){
		// 根据url 的path，决定 tab的index
		switch(location.pathname.match(/\/([^\/]+)/g)[2]){
			// 作品页
			case 'works':
				return 1;
			// 首页（默认）
			default:
				return 0;
		}
	};

	App.Nav = Nav;
})(window.App);