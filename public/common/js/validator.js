// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

// 验证器（验证数据格式）
(function(App){

	var validator = {
		// 1. 验证是否为空
		isEmpty: function(value){
			return typeof value === 'undefined' || !value.trim();
		},
		// 2. 验证电话号码
		isPhone: function(value){
			return /\d{11}/.test(value);
		},
		// 3. 验证昵称
		isNickName: function(value){
			// 中英文数字均可，至少8个字符
			return /^[\u4e00-\u9fa5a-zA-Z0-9]{8}[\u4e00-\u9fa5a-zA-Z0-9]*$/.test(value);
		},
		// 4. 长度限制
		isLength: function(value, min, max){
			var length = value.toString().length;
			// 验证结果
			var result = true;
			// 长度 大于等于最小值，小于等于最大值
			typeof min !== 'undefined' && (result = result && length >= min);
			typeof max !== 'undefined' && (result = result && length <= max);
			return result;
		}
	};

	App.validator = validator;

})(window.App);