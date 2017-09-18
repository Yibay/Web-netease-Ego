// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){

	// 模板
	var template = `<div class="m-nav f-cb"></div>`;

	// 参数（options = {
	//   parent 父容器节点 (必填)
	// }）
	function Nav(options){
		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = this._template.cloneNode(true);

		// 初始化
		this.init();
	}

	Nav.prototype._template = _.html2node(template);

	Nav.prototype.init = function(){
			// 挂载组件
			// 1.顶栏选项卡 组件
			this.hdtab = new App.Tabs({parent: this.container});
			// 2.搜索框 组件
			this.search = new App.Search({parent: this.container});
			// 3.未登录显示的客人 组件
			new App.Guest({parent: this.container});
			// 4.已登录显示的用户 组件
			new App.User({parent: this.container});

			this.parent.appendChild(this.container);
	};

	App.Nav = Nav;
})(window.App);