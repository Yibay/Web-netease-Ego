// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

// 事件管理器（发布-订阅模式）
(function(App){

	// 事件列表对象
	var client_list = {};

	// 订阅事件 函数
	function on(key, fn){
		// 若该事件，还没有事件列表
		if(!client_list[key]){
			// 则新建一个事件列表
			client_list[key] = [];
		}
		// 向该事件列表，存入回调函数
		client_list[key].push(fn);
	}

	// 发布事件 函数
	function emit(){
		// 获取第一个参数 事件名称
		var key = Array.prototype.shift.call(arguments);
		// 该事件 对应的回调函数集合
		var fns = client_list[key];
		// 若该事件无回调函数
		if(!fns || fns.length === 0){
			// 则直接返回
			return false;
		}
		// 否则，遍历数组，执行回调函数
		for(var i=0;i<fns.length;i++){// 不能使用fns.forEach，除非和=>函数连用，不然会污染this，arguments
			fns[i].apply(this, arguments);// emit将被混入组件，所以emit将被作为组件方法调用，预测this指向组件本身
		}
	}

	// 取消订阅
	function remove(key, fn){
		// 该事件 对应的回调函数集合
		var fns = client_list[key];
		// 若该事件无回调函数
		if(!fns){
			// 则直接返回
			return false;
		}
		// 若未指定具体函数
		if(!fn){
			// 清空全部 回调函数
			fns && (fns.length = 0);
		}
		else{
			for(var i = fns.length - 1;i>=0;i--){
				if(fns[i] === fn){
					fns.splice(i,1);
				}
			}
		}

	}

	// 揭示接口
	App.emitter = {
		on: on,
		emit: emit,
		romove: remove
	}

})(window.App);