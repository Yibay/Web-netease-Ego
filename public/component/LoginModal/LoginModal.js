
/* 登录弹窗组件
* 使用登录弹窗组件前，要先引入 Modal组件
* 以及 事件管理器、工具函数模块、md5加密库
*/
(function(App){

	// 模板
	var template = `<div class="m-loginmodal">
		<span class="close_btn u-icon u-icon-close"></span>
		<div class="modal_tt">
			<strong>欢迎回来</strong><span>还没有账号？<a class="u-link" id="goregister">立即注册</a></span>
		</div>
		<form class="m-form m-form-1" id="loginform">
			<div class="u-formitem">
				<input class="formitem_ct u-ipt username_input" placeholder="手机号" />
			</div>
			<div class="u-formitem u-formitem-1">
				<input class="formitem_ct u-ipt password_input" type="password" placeholder="密 码"/>
			</div>
			<div class="u-formitem u-formitem-2 remember_box">
				<label for="remember" class="u-checkbox u-checkbox-remeber">
					<input type="checkbox" class="remember" />
					<i class="u-icon u-icon-checkbox"></i>
					<i class="u-icon u-icon-checkboxchecked"></i>
					<span>保持登录</span>
				</label>
				<span class="f-fr">忘记密码?</span>
			</div>
			<div class="u-error f-dn"><span class="u-icon u-icon-errorsquare"></span><span class="errormsg"></span></div>
			<button class="u-btn u-btn-primary submit_btn" type="submit">登&nbsp;&nbsp;录</button>
		</form>
	</div>`;

	/* options 参数说明
	* {
	*	parent: dom节点, 父容器（必填）
	* }
	*/
	function LoginModal(options){
		// 弹窗内容模块
		this.content = template;
		// 继承父类Modal (挂载工作在Modal中完成)
		App.Modal.call(this, options);

		// 缓存节点
		this.closeBtn = _.getElementsByClassName(this.container, 'close_btn')[0];  // 关闭弹窗按钮
		this.goregister = document.getElementById('goregister'); // 立即注册按钮
		this.nUsername = _.getElementsByClassName(this.container, 'username_input')[0]; // 用户名输入框
		this.nPassword = _.getElementsByClassName(this.container, 'password_input')[0]; // 密码输入框
		this.nRemember = _.getElementsByClassName(this.container, 'remember')[0]; // 记住登录状态选框
		this.nErrorBox = _.getElementsByClassName(this.container, 'u-error')[0]; // 错误盒子
		this.nError = _.getElementsByClassName(this.container, 'errormsg')[0]; // 错误消息提示
		this.submitBtn = _.getElementsByClassName(this.container, 'submit_btn')[0]; // 登录按钮

		// 初始化
		this.initLoginEvent();
	}

	// 继承父类Modal的原型
	LoginModal.prototype = Object.create(App.Modal.prototype);

	// 混入事件管理器
	_.extend(LoginModal.prototype, App.emitter);

	// 初始化事件
	LoginModal.prototype.initLoginEvent = function(){
		// 订阅显示登录弹窗事件
		this.on('showLoginModal', this.show.bind(this));
		// 为关闭按钮，绑定关闭弹窗事件
		this.closeBtn.addEventListener('click', this.hide.bind(this));
		// 去注册
		this.goregister.addEventListener('click', function(){
			// 关闭登录弹窗
			this.hide();
			// 显示注册弹窗
			this.emit('showRegisterModal');
		}.bind(this));
		// 绑定提交表单事件
		this.submitBtn.addEventListener('click', this.submit.bind(this));
	};
	// 表单验证
	LoginModal.prototype.check = function(){
		// 载入 数据验证器
		var validator = App.validator;

		var isValid = true,
			flag = true;
		// 验证用户名
		flag = flag && !validator.isEmpty(this.nUsername.value);
		flag = flag && validator.isPhone(this.nUsername.value);
		// 显示错误
		flag ? _.delClassName(this.nUsername, 'error') : _.addClassName(this.nUsername, 'error');
		isValid = isValid && flag;

		// 验证密码
		flag = true;
		flag = flag && !validator.isEmpty(this.nPassword.value);
		// 显示错误
		flag ? _.delClassName(this.nPassword, 'error') : _.addClassName(this.nPassword, 'error');
		isValid = isValid && flag;
		
		isValid || (this.nError.innerText = '账号或密码不正常，请重新输入');
		// 显示错误
		this.showError();
		isValid ? _.addClassName(this.nErrorBox, 'f-dn') : this.showError();


		return isValid;
	};
	// 显示错误
	LoginModal.prototype.showError = function(){
		_.delClassName(this.nErrorBox, 'f-dn');
	};
	// 表单提交
	LoginModal.prototype.submit = function(event){
		event.preventDefault();
		if(this.check()){
			var data = {
				username: this.nUsername.value.trim(),
				password: hex_md5(this.nPassword.value),
				remember: !!this.nRemember.checked
			};
			_.ajax({
				url: '/api/login',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: data,
				success: function(data){
					data = JSON.parse(data);
					console.log(data);
					if(data.code === 200){
						this.hide();
						this.emit('login', data.result);
					}
					else{
						// 根据不同代码错误，显示不同的错误提示
						switch(data.code){
							case 400:
								this.nError.innerText = '密码错误，请重新输入';
								break;
							case 404:
								this.nError.innerText = '用户不存在，请重新输入';
								break;
						}
						this.showError();
					}
				}.bind(this),
				fail: function(){}
			});
		}
	};

	App.LoginModal = LoginModal;

})(window.App);