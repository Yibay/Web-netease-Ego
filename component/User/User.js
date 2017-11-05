// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){
	// 模板
	var template = `<div class="m-user f-dn" id=userdropdown>
		<div class="user_info">
			<span class="user_avatar"><img src="${base_url}/res/images/avatar.png" alt="" /></span>
			<span class="user_basicinfo">
				<span class="user_name" id="name"></span>
				<span class="u-icon sex_icon"></span>
			</span>
			<span class="u-icon u-icon-down"></span>
		</div>
		<ul class="user_list">
			<li>个人中心</li>
			<li>信息</li>
			<li>设置</li>
			<li class="logout" id="logout">退出账号</li>
		</ul>
	</div>`;

	// options 参数说明
	// {
	//   parent: dom节点, 父容器 (必填)
	// }）
	function User(options){
		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = this._template.cloneNode(true);
		this.userList = _.getElementsByClassName(this.container, 'user_list')[0];
		this.nLogout = _.getElementsByClassName(this.userList, 'logout')[0];
		this.nName = _.getElementsByClassName(this.container, 'user_name')[0];
		this.nSexIcon = _.getElementsByClassName(this.container, 'sex_icon')[0];

		// 初始化
		this.init();
	}

	// 混入事件管理器
	_.extend(User.prototype, App.emitter);

	// 用于复制的Dom节点
	User.prototype._template = _.html2node(template);

	// 初始化（绑定事件，将组件载入页面）
	User.prototype.init = function(){
		// 挂载组件
		this.parent.appendChild(this.container);
		// 订阅事件
		this.on('login', this.show.bind(this)); // 登录事件
		this.on('notLogin', this.hide.bind(this)); // 未登录事件
		// 绑定事件
		this.nLogout.addEventListener('click', this.logout.bind(this));
	};
	// 退出登录
	User.prototype.logout = function(){
		_.ajax({
			url: _.createUrl('/api/logout', 'POST'),
			method: _.fixMethod('POST'),
			data: {},
			success: function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.code === 200){
					window.location.href = "/index";
				}
			},
			fail: function(){}
		})
	};	
	// 显示此组件
	User.prototype.show = function(data){
		this.initUserInfo(data);
		_.delClassName(this.container, 'f-dn');
	};
	var iconConfig = {
		0: 'u-icon-male',
		1: 'u-icon-female'
	};
	// 初始化用户信息
	User.prototype.initUserInfo = function(data){
		// 设置用户姓名
		this.nName.innerText = data.nickname;
		// 清空之前的用户性别Icon
		for(var key in iconConfig){
			_.delClassName(this.nSexIcon, iconConfig[key]);
		}
		// 设置用户性别Icon
		_.addClassName(this.nSexIcon, iconConfig[data.sex]);
	};
	// 隐藏此组件
	User.prototype.hide = function(){
		_.addClassName(this.container, 'f-dn');
	};

	App.User = User;

})(window.App);