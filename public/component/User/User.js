// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){
	// 模板
	var template = `<div class="m-user" id=userdropdown>
		<div class="user_info">
			<span class="user_avatar"><img src="/res/images/avatar.png" alt="" /></span>
			<span class="user_basicinfo">
				<span class="user_name" id="name">Amber</span>
				<span class="u-icon u-icon-female"></span>
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
		this.user_list = _.getElementsByClassName(this.container, 'user_list')[0];
		this.nLogout = _.getElementsByClassName(this.user_list, 'logout')[0];

		// 初始化
		this.init();
	}

	// 用于复制的Dom节点
	User.prototype._template = _.html2node(template);

	// 初始化（绑定事件，将组件载入页面）
	User.prototype.init = function(){
		// 挂载组件
		this.parent.appendChild(this.container);
		// 绑定事件
		this.nLogout.addEventListener('click', this.logout.bind(this));
	};
	// 退出登录
	User.prototype.logout = function(){
		_.ajax({
			url: '/api/logout',
			method: 'POST',
			data: {},
			success: function(data){
				if(data.code === 200){
					window.location.href = "/index";
				}
			},
			fail: function(){}
		})
	};

	App.User = User;

})(window.App);