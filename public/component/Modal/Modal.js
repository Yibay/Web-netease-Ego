// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

/* 弹窗组件，
* 作为一个基础组件，不能单独使用，
* 继承它的子组件中，才做初始化，绑定事件的操作。
* Modal组件，只提供基本的外框样式，显示、隐藏功能.
*/
(function(App){

	var template = '<div class="m-modal f-dn"></div>';

	/* options 参数说明
	*{
	*	parent: dom节点, 父容器（必填）
	*}
	*/
	function Modal(option){
		// 继承配置
		_.extend(this, option);

		// 缓存节点
		this.container = _.html2node(template);
		// 挂载内容模块
		this.container.innerHTML = this.content || '';
		// 挂载到父节点
		this.parent.appendChild(this.container);
	}

	// 展示 弹窗
	Modal.prototype.show = function(){
		_.delClassName(this.container, 'f-dn');
	};
	// 关闭 弹窗
	Modal.prototype.hide = function(){
		_.addClassName(this.container, 'f-dn');
	};

	App.Modal = Modal;

})(window.App);