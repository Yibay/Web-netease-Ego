// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}


/* 注册组件
* 使用注册组件前，要先引入 Modal组件
*/
(function(App){

	var template = `<div class="m-registermodal">
		<div><img class="logo" src="../res/images/logo.png" /></div>
		<form class="m-form" id="registerform">
			<div class="u-formitem">
				<label for="phone" class="formitem_tt">手机号</label>
				<input id="phone" name="phone" placeholder="请输入11位手机号码" class="formitem_ct u-ipt"/>
			</div>
			<div class="u-formitem">
				<label for="nickname" class="formitem_tt">昵 称</label>
				<input id="nickname" name="nickname" placeholder="中英文均可，至少8个字符" class="formitem_ct u-ipt"/>
			</div>
			<div class="u-formitem">
				<label for="password" class="formitem_tt">密 码</label>
				<input type="password" id="password" name="password" placeholder="长度6-16个字符，不包含空格" class="formitem_ct u-ipt"/>
			</div>
			<div class="u-formitem">
				<label for="comform_password" class="formitem_tt">密 码</label>
				<input type="password" id="comform_password" name="comform_password" placeholder="" class="formitem_ct u-ipt"/>
			</div>
			<div class="u-formitem">
				<label for="" class="formitem_tt">生 日</label>
				<div class="formitem_ct">
					<div class="m-cascadeselect birthday_select" id="birthday"></div>
				</div>
			</div>
			<div class="u-formitem">
				<label for="" class="formitem_tt">所在地</label>
				<div class="formitem_ct">
					<div class="m-cascadeselect location_select" id="location"></div>
				</div>
			</div>
			<div class="u-error f-dn"><span class="u-icon u-icon-error"></span><span id="errormsg"></span></div>
			<button class="u-btn u-btn-primary" type="submit">注&nbsp;&nbsp;册</button>
		</form>
	</div>`;

	/* options 参数说明
	* {
	*	parent: dom节点, 父容器（必填）
	* }
	*/
	function RegisterModal(options){
		// 弹窗内容模块
		this.content = template;
		// 继承父类Modal (挂载工作在Modal中完成)
		App.Modal.call(this, options);

		// 缓存节点 this.nPhone

		// 初始化
		this.initSelect();
		this.initRegisterEvent();
	}

	// 继承父类Modal的原型
	RegisterModal.prototype = Object.create(App.Modal.prototype);

	RegisterModal.prototype.initRegisterEvent = function(){};
	// 初始化选择器
	RegisterModal.prototype.initSelect = function(){
		// 生日 级联选择器
		new App.CascadeSelect({
			parent: _.getElementsByClassName(this.container, 'birthday_select')[0],
			// 生日数据（为了让 生日和地址 可以共用一个级联选择器组件，则构造相同的数据结构）
			data: _.createDateData()
		});
		// 地址 级联选择器
		new App.CascadeSelect({
			parent: _.getElementsByClassName(this.container, 'location_select')[0],
			// 地址数据
			data: _.toSelectData(ADDRESS_CODES)
		});
	};
	// 重置验证码
	RegisterModal.prototype.resetCaptcha = function(){};
	RegisterModal.prototype.submit = function(){};
	RegisterModal.prototype.check = function(){};

	App.RegisterModal = RegisterModal;

})(window.App);