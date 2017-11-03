/**
*   确认弹窗组件
*   继承自Modal组件
*/

(function(App){

	var template = `<div class="m-confirmmodal">
		<span class="close_btn u-icon u-icon-close"></span>
		<div class="modal_tt">
			<strong>提示信息</strong>
		</div>
		<div class="modal_ct">
			<div class="confirm_msg"></div>
			<button class="u-btn u-btn-primary submit_btn">确定</button><button class="u-btn u-btn-link cancel_btn">取消</button>
		</div>
	</div>`;

	/* options 参数说明
	*{
	*	parent: dom节点, 父容器（必填）
	*   content: 内容str (选填)
	*}
	*/
	function ConfirmModal(options){

		// 固定架构
		this.content = template;

		// 继承父类Modal
		App.Modal.call(this, options);

		// 缓存节点
		this.title = _.getElementsByClassName(this.container, 'modal_tt')[0].getElementsByTagName('strong')[0]; // 标题
		this.confirm_msg = _.getElementsByClassName(this.container, 'confirm_msg')[0];   // 确认信息
		this.submit_btn = _.getElementsByClassName(this.container, 'submit_btn')[0];     // 确认按钮
		this.cancel_btn = _.getElementsByClassName(this.container, 'cancel_btn')[0];     // 取消按钮
		this.close_btn = _.getElementsByClassName(this.container, 'close_btn')[0];       // 关闭按钮

		// 初始化
		this.init();
	}

	// 继承父类Modal原型
	ConfirmModal.prototype = Object.create(App.Modal.prototype);

	// 混入事件管理器
	_.extend(ConfirmModal.prototype, App.emitter);

	// 初始化
	ConfirmModal.prototype.init = function(){
		// 订阅事件
		this.on('confirm', this.showMsg.bind(this)); // 触发时，执行showMsg

		// 绑定事件
		this.close_btn.addEventListener('click', this.hide.bind(this));   // 关闭弹窗
		this.cancel_btn.addEventListener('click', this.hide.bind(this));  // 取消
		this.submit_btn.addEventListener('click', function(evt){          // 确认 
			// 执行回调函数
			this.confirmCallBack(evt);
			// 关闭弹窗
			this.hide();
		}.bind(this));
	};

	// 显示确认组件
	/**
	*  options = {
	*    title : str              (弹窗标题)
	*    content : str            (确认消息内容)
	*    confirmCallBack : func   (确认后回调函数)
	*  }
	*/
	ConfirmModal.prototype.showMsg = function(options){
		// 标题变更
		options.title && (this.title.innerHTML = options.title);
		// confirm信息变更
		this.confirm_msg.innerHTML = options.content || '';
		// 点击确定后，回调函数
		this.confirmCallBack = options.confirmCallBack || function(){console.log('未绑定回调事件');};
		// 显示弹窗
		this.show();
	}

	App.ConfirmModal = ConfirmModal;

})(window.App);