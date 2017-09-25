// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}


/* 注册组件
* 使用注册组件前，要先引入 Modal组件
*/
(function(App){

	// 模板
	var template = `<div class="m-registermodal">
		<span class="close_btn u-icon u-icon-close"></span>
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
				<label for="comform_password" class="formitem_tt">确认密码</label>
				<input type="password" id="comform_password" name="comform_password" placeholder="" class="formitem_ct u-ipt"/>
			</div>
			<div class="u-formitem">
				<label for="" class="formitem_tt">性 别</label>
				<div class="formitem_ct">
					<div class="sex_box">
						<label>
							<input type="radio" name="sex" checked value=0 />
							<i class="u-icon u-icon-radio"></i><i class="u-icon u-icon-radiocircle"></i>少男
						</label>
						<label>
							<input type="radio" name="sex" value=1 />
							<i class="u-icon u-icon-radio"></i><i class="u-icon u-icon-radiocircle"></i>少女
						</label>
					</div>
				</div>
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
			<div class="u-formitem">
				<label for="" class="formitem_tt">验证码</label>
				<div class="formitem_ct formitem_ct-validate">
					<input type="text" id="captcha" class="u-ipt" />
					<img id="captchaimg" src="/captcha" alt="" />
				</div>
			</div>
			<div class="terms">
				<label for="agree2terms" class="u-checkbox u-checkbox-agree">
					<input type="checkbox" id="agree2terms" name="agree2terms" value="1" />
					<i class="u-icon u-icon-checkbox"></i>
					<i class="u-icon u-icon-checkboxchecked"></i>
					<span>我已阅读并同意相关条款</span>
				</label>
			</div>
			<div class="u-error f-dn"><span class="u-icon u-icon-errorsquare"></span><span id="errormsg"></span></div>
			<button id="submit" class="u-btn u-btn-primary" type="submit">注&nbsp;&nbsp;册</button>
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
		this.closeBtn = _.getElementsByClassName(this.container, 'close_btn')[0]; // 关闭按钮
		this.captchaImg = document.getElementById('captchaimg'); // 二维码图片
		this.phone = document.getElementById('phone'); // 电话input
		this.nick = document.getElementById('nickname'); // 昵称input
		this.pwd = document.getElementById('password'); // 密码input
		this.confirmpwd = document.getElementById('comform_password'); // 确认密码input
		this.captcha = document.getElementById('captcha'); // 二维码input
		this.agree2terms = document.getElementById('agree2terms'); // 同意条款input
		this.errorBox = _.getElementsByClassName(this.container, 'u-error')[0]; // 错误盒子
		this.nError = document.getElementById('errormsg'); // 错误消息提示
		this.submitBtn = document.getElementById('submit'); // 提交按钮

		// 初始化
		this.initSelect();
		this.initRegisterEvent();
	}

	// 继承父类Modal的原型
	RegisterModal.prototype = Object.create(App.Modal.prototype);

	// 混入事件管理器
	_.extend(RegisterModal.prototype, App.emitter);

	// 初始化选择器
	RegisterModal.prototype.initSelect = function(){
		// 生日 级联选择器
		this.birthdaySelect = new App.CascadeSelect({
			parent: _.getElementsByClassName(this.container, 'birthday_select')[0],
			// 生日数据（为了让 生日和地址 可以共用一个级联选择器组件，则构造相同的数据结构）
			data: _.createDateData()
		});
		// 地址 级联选择器
		this.locationSelect = new App.CascadeSelect({
			parent: _.getElementsByClassName(this.container, 'location_select')[0],
			// 地址数据
			data: _.toSelectData(ADDRESS_CODES)
		});
	};

	// 重置验证码
	RegisterModal.prototype.resetCaptcha = function(){
		this.captchaImg.src = `/captcha?t=${new Date().getTime()}`
	};
	// 表单验证
	RegisterModal.prototype.check = function(){
		var isValid = true,
			errorMsg = "";

		// 隐藏错误信息框
		_.addClassName(this.errorBox, 'f-dn');

		// 验证数据填写 是否符合规范
		var checkList = [
			[this.phone, ['require', 'phone']],
			[this.nick, ['require', 'nickname']],
			[this.pwd, ['require', 'length']],
			[this.confirmpwd, ['require', 'length']],
			[this.captcha, ['require']]
		];
		isValid = this.checkRules(checkList);
		if(!isValid){
			errorMsg = '输入有误';
		}
		// 验证两次密码
		if(isValid && this.pwd.value !== this.confirmpwd.value){
			isValid = false;
			errorMsg = '2次验证码不一致';
		}
		
		// 验证条款是否为空
		if(isValid && !this.agree2terms.checked){
			isValid = false;
			errorMsg = '未同意条款';
		}

		// 显示错误
		if(!isValid){
			this.nError.innerText = errorMsg;
			_.delClassName(this.errorBox, 'f-dn');
		}
		// 返回结果
		return isValid;
	};
	// 按规则验证表单
	RegisterModal.prototype.checkRules = function(checkRules){
		// 载入 数据验证器
		var validator = App.validator;
		// 验证结果
		var check_result = true;

		for(var i=0;i<checkRules.length;i++){
			// 被检查的元素节点
			var checkItem = checkRules[i][0],
				// 规则数组
				rules = checkRules[i][1],
				// 错误标示
				flag;

			// 去除错误标示
			_.delClassName(checkItem, 'error');

			for(var j=0;j<rules.length;j++){
				// 检测规则名称
				var key = rules[j];
				switch(key){
					case 'require':
						flag = !validator.isEmpty(checkItem.value);
						break;
					case 'phone':
						flag = validator.isPhone(checkItem.value);
						break;
					case 'nickname':
						flag = validator.isNickName(checkItem.value);
						break;
					case 'length':
						flag = validator.isLength(checkItem.value, 6, 16);
						break;
				}
				if(!flag){break;}
			}
			// 显示错误
			flag || _.addClassName(checkItem, 'error'); 
			flag || (check_result = false);
		}
		// 若无错误
		return check_result;
	}
	// 表单提交
	RegisterModal.prototype.submit = function(evt){
		evt.preventDefault();
		// ...
		// 若验证成功
		if(this.check()){
			// 构造数据
			var data = {
				username: this.phone.value.trim(),
				nickname: this.nick.value.trim(),
				password: hex_md5(this.pwd.value),
				sex: this.getRadioValue('registerform', 'sex'),
				captcha: this.captcha.value.trim()
			};
			this.birthday = this.birthdaySelect.getValue().join('-');
			this.location = this.locationSelect.getValue();
			data.province = this.location[0];
			data.city = this.location[1];
			data.district = this.location[2];
			data.birthday = this.birthday;
			// 发送请求
			_.ajax({
				url:'/api/register',
				method:'POST',
				header: {
					'content-type': 'application/json'
				},
				data:data,
				success:function(data){
					console.log(data);
					data = JSON.parse(data);
					if(data.code === 200){
						this.hide();
						this.emit('ok');
					}
					else{
						this.nError.innerText = data.msg;
						this.showError();
					}
				}.bind(this),
				fail:function(){}
			});
		}
	};
	// 获取 单选框的值
	RegisterModal.prototype.getRadioValue = function(registerform, sex){
		return document.getElementById(registerform)[name=sex].value;
	};
	// 显示错误信息
	RegisterModal.prototype.showError = function(){
		_.delClassName(this.errorBox, 'f-dn');
	};

	// 初始化注册事件
	RegisterModal.prototype.initRegisterEvent = function(){
		// 为关闭按钮，绑定关闭弹窗事件
		this.closeBtn.addEventListener('click', this.hide.bind(this));
		// 为二维码图片，绑定刷新事件
		this.captchaImg.addEventListener('click', this.resetCaptcha.bind(this));
		// 绑定提交表单事件
		this.submitBtn.addEventListener('click', this.submit.bind(this));
	};

	App.RegisterModal = RegisterModal;

})(window.App);