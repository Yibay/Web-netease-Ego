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
	};
	// 8. 判断是否含有该class
	_.hasClassName = function(ele, className){
		var current_className = ` ${ele.className} `,has_className;
		if(current_className.indexOf(` ${className} `) === -1){
			has_className = false;
		}
		else{
			has_className = true;
		}
		return has_className;
	};
	// 2. 为元素添加css类
	_.addClassName = function(ele, className){
		var new_className = ` ${ele.className} `;
		// 若 该元素没有此class，才添加
		if(new_className.indexOf(` ${className} `) === -1){
			new_className += className;
			// 更新className
			ele.className = new_className.trim();
		}
	};
	// 3. 删除元素的css类
	_.delClassName = function(ele, className){
		// 前后加上空格，防止误伤
		var new_className = ` ${ele.className} `;
		new_className = new_className.replace(new RegExp(` ${className} `, 'g'), ' ');
		// 更新className
		ele.className = new_className.trim();
	};
	// 4. 生成dom元素
	_.html2node = function(str){
		var container = document.createElement('div');
		container.innerHTML = str;
		return container.children[0];
	};
	// 5. 按className获取dom元素
	_.getElementsByClassName = function(ele, className){
		// 若浏览器支持getElementsByClassName, 则使用
		if(document.getElementsByClassName){
			return ele.getElementsByClassName(className);
		}
	};
	// 6. 数据请求
		/* options = {
		* 	url: str,       请求地址, 如：'/api/logout',
		* 	method: str,    请求方法, 如：'POST',
		* 	data: obj,      请求数据,
		* 	success: func,  请求成功后, 执行函数
		* 	fail: func,     请求失败后, 执行函数
		* }
		*/
	_.ajax = function(options, header){
		var xhr = new XMLHttpRequest();

		// 监听状态变化
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
					options.success(
						// JSON.parse(xhr.responseText)
						xhr.responseText
					);
				}
				else{
					options.fail(xhr);
				}
			}
		}
		
		// 开启请求
		xhr.open(options.method, options.url, true);
		
		// 有数据则 序列化，没数据则 send null
		var data = options.data ? _.serialize(options.data) : null;
		// 设置请求头
		if(header && header['content-type'] && header['content-type'] === 'application/json'){
			xhr.setRequestHeader('content-type','application/json');
			data = options.data || null;
		}
		// 发送请求 
		xhr.send(data);
	};
	// 7. 数据序列化
	_.serialize = function(data){
		// 若无数据
		if(!data){return '';}
		var pairs = [];
		for(key in data){
			// 过滤掉 继承来的属性
			if(!data.hasOwnProperty(key)){continue;}
			// 过滤掉 方法类的属性
			if(typeof data[key] === 'function'){continue;}
			var value = data[key].toString();
			key = encodeURIComponent(key);
			value = encodeURIComponent(value);
			pairs.push(`${key}=${value}`);
		}
		return pairs.join('&');
	};
	// 9. 将地址data，转成 选择器data格式 {name:,value:,list:}
	_.toSelectData = function(data){
		// 映射函数
		function mapping(data){
			// 对data数组映射
			return data.map(function(item){
				// 设置对应对象的 name，value
				var result_data = {
					name: item[1],
					value: item[0]
				}
				// 若存在第3项, 则递归映射第3项
				item[2] && (result_data.list = mapping(item[2]));
				return result_data;
			});
		}
		var select_data = mapping(data);
		return select_data;
	}

	// 把工具函数对象 绑定到 全局变量上。
	global._ = _;

})(window);