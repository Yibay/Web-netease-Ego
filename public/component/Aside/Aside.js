/**
*  侧边栏组件
*/

(function(App){

	var template = `<ul>
		<li class="msg">个人中心</li>
		<li class="z-active">我的作品</li>
		<li>我关注的</li>
		<li>我的圈子</li>
		<li>消息提醒</li>
		<li>隐私设置</li>
	</ul>`;

	var Aside = {
		// 初始化
		init: function(options){
			// 继承配置
			_.extend(this, options);
			// 缓存节点
			this.container = _.html2node(template);
			this.parent.appendChild(this.container);
		}
	};

	App.Aside = Aside;

})(window.App);