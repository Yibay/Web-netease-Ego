// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){

	//模板
	var template = `<div class="m-guest f-dn" id="guest">
		<button class="u-btn u-btn-primary u-btn-icon" id="login">
			<i class="u-icon u-icon-user"></i>登录
		</button>
		<button class="u-btn u-btn-link" id="register">注册</button>
	</div>`;

	// options 参数说明
	// {
	//   parent: dom节点, 父容器 (必填)
	// }）
	function Guest(options){
		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = this._template.cloneNode(true);
		this.nLogin = this.container.getElementsByTagName('button')[0];
		this.nRegister = this.container.getElementsByTagName('button')[1];

		// 初始化
		this.init();
	}

	// 用于复用的dom节点
	Guest.prototype._template = _.html2node(template);

	// 初始化（绑定事件，将组件载入页面）
	Guest.prototype.init = function(){
		// 绑定事件
		this.nLogin.addEventListener('click', (function(){
			// 弹出登录弹窗
			alert('登录弹窗');
		}).bind(this));
		this.nRegister.addEventListener('click', (function(){
			// 弹出注册弹窗
			alert('注册弹窗');
		}).bind(this));

		// 挂载组件
		this.parent.appendChild(this.container);
	}

	App.Guest = Guest;

})(window.App);