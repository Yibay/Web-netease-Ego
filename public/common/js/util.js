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
		* 	data: obj,      请求数据,(选填)
		* 	success: func,  请求成功后, 执行函数
		* 	fail: func,     请求失败后, 执行函数
		*   header: {}      请求头(选填)
		* }
		*/
	_.ajax = function(options){
		var xhr = new XMLHttpRequest();

		// 0. 监听状态变化
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

		var data;

		// 若是 GET 请求
		if(options.method.toUpperCase() === 'GET'){
			var search = options.data ? ('?' + _.serialize(options.data)) : '';
			options.url += search;
			data = null;
		}
		
		// 1. 开启请求
		xhr.open(options.method, options.url, true);

		// 若是 POST 请求
		if(options.method.toUpperCase() === 'POST'){
			data = options.data ? JSON.stringify(options.data) : null;
		}

		// 若有请求头，则设置请求头
		if(options.header){
			for(var key in options.header){
				xhr.setRequestHeader(key, options.header[key]);
			}
		}
		console.log(data);
		// 2. 发送请求 
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
	// 10. 以选择器data格式，生成日期数据 {name:,value:,list:}
	_.createDateData = function(start_year, end_year){
		// 默认值
		start_year = start_year || 1970;
		end_year = end_year || new Date().getFullYear();
		// 日模板  (用模板，可以省去第3重循环，提升效率)
		var day_template = [];
		for(var k=1;k<=31;k++){
			day_template.push({name:k,value:k});
		}
		var select_data = [];
		for(var i=start_year;i<=end_year;i++){
			var year = {
				name: i,
				value: i,
				list: []
			}
			for(var j=1;j<=12;j++){
				var month = {
					name: j,
					value: j,
					list: day_template.slice(0,new Date(i,j,0).getDate())
				}
				year.list.push(month);
			}
			select_data.unshift(year);
		}
		return select_data;
	}

	// 把工具函数对象 绑定到 全局变量上。
	global._ = _;

})(window);