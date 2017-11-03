/**
*  作品权限设置组件
*  依赖选择器组件
*      单选组件
*/
(function(App){

	var privilege_template = `<div class="m-privilege"><label>权限设置</label></div>`;

	var authorization_template = `<div class="m-authorization"><label>作品授权</label></div>`;

	/**
	*  options = {
	*    parent: dom 节点  (父容器节点)
	*  }
	*/
	function WorkPermission(options){
		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.privilege = _.html2node(privilege_template)
		this.authorization = _.html2node(authorization_template);

		// 初始化
		this.init();
	}

	WorkPermission.prototype.init = function(){
		// 初始化单选组件（权限设置）
		this.radio = new App.Radio({
			parent: this.privilege,
			data: {name:'privilege', list:[
				{text: '所有人可见', value:0},
				{text: '关注者／粉丝可见', value:1},
				{text: '仅自己可见', value: 2}
			]}
		})
		// 初始化选择器 (作品授权)
		this.select = new App.Select({parent: this.authorization});
		this.select.render([{name:'不限制作品用途',value:0},{name:'禁止匿名转载；禁止商业使用',value:1}]);

		// 挂载 权限设置 组件
		this.parent.appendChild(this.privilege);
		// 挂载 授权类型 组件
		this.parent.appendChild(this.authorization);
	};
	// 获取值
	WorkPermission.prototype.getValue = function(){
		return {
			privilege: parseInt(this.radio.getValue(),10),
			authorization: this.select.getValue()
		};
	}

	App.WorkPermission = WorkPermission;

})(window.App);