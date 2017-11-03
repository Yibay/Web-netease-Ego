/**
*   警告弹窗组件
*   继承自Modal组件
*/
(function(App){

	var template = `<div class="m-alertmodal">
		<span class="close_btn u-icon u-icon-close"></span>
		<div class="modal_tt">
			<strong>提示信息</strong>
		</div>
		<div class="modal_ct">
			<p class="alert_msg"></p>
			<button class="u-btn u-btn-primary submit_btn">确定</button>
		</div>
	</div>`;

	function AlertModal(options){

		this.content = template;

		App.Modal.call(this, options);

		// 缓存节点
		this.alert_msg = _.getElementsByClassName(this.container, 'alert_msg')[0];
		this.submit_btn = _.getElementsByClassName(this.container, 'submit_btn')[0];
		this.close_btn = _.getElementsByClassName(this.container, 'close_btn')[0];

		this.init();
	}

	AlertModal.prototype = Object.create(App.Modal.prototype);

	// 混入事件管理器
	_.extend(AlertModal.prototype, App.emitter);

	AlertModal.prototype.init = function(){
		this.on('alert', this.showMsg.bind(this));
		// close按钮，关闭弹窗
		this.close_btn.addEventListener('click', this.hide.bind(this));
		// 确定，关闭弹窗
		this.submit_btn.addEventListener('click', this.hide.bind(this));
	};
	AlertModal.prototype.showMsg = function(msg){
		// 显示弹窗
		this.alert_msg.innerText = msg;
		this.show();
	};

	App.AlertModal = AlertModal;

})(window.App);