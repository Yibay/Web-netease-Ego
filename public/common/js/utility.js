// 封装工具函数
(function(global){
	// 依赖
	var document = global.document;

	// 工具函数对象
	var _ = Object.create(null);

	// 1. 继承属性 (ES6写法)
	_.extend = function(obj, options){
		// 若options对象存在
		if(options && typeof options == 'object'){
			// obj 继承 options中的属性
			Object.assign(obj, options);
		}
	}
	// 2. 为元素添加css类
	_.addClassName = function(ele, className){
		var new_className = ` ${ele.className} `;
		// 若 该元素没有此class，才添加
		if(new_className.indexOf(` ${className} `) === -1){
			new_className += className;
			// 更新className
			ele.className = new_className.trim();
		}
	}
	// 3. 删除元素的css类
	_.delClassName = function(ele, className){
		// 前后加上空格，防止误伤
		var new_className = ` ${ele.className} `;
		new_className = new_className.replace(new RegExp(` ${className} `, 'g'), ' ');
		// 更新className
		ele.className = new_className.trim();
	}
	// 4. 生成dom元素
	_.html2node = function(str){
		var container = document.createElement('div');
		container.innerHTML = str;
		return container.children[0];
	}
	// 5. 按className获取dom元素
	_.getElementsByClassName = function(ele, className){
		// 若浏览器支持getElementsByClassName, 则使用
		if(document.getElementsByClassName){
			return ele.getElementsByClassName(className);
		}
	}

	// 把工具函数对象 绑定到 全局变量上。
	global._ = _;

})(window);