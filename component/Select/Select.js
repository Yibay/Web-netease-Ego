// 选择器组件
(function(App){

	// 模板
	var template = `<div class="m-select">
		<div class="select_hd">
			<span class="select_val"></span>
			<span class="u-icon u-icon-dropdown"></span>
		</div>
		<ul class="select_opt f-dn"></ul>
	</div>`;

	/* options 参数说明
	*{
	*	parent: dom节点, 父容器（必填）
	*}
	*/
	function Select(options){
		// 继承配置
		_.extend(this, options);
		
		// 缓存节点
		// 容器
		this.body = _.html2node(template);
		// 下拉列表节点
		this.nOption = _.getElementsByClassName(this.body, 'select_opt')[0];
		// 显示选中文本节点
		this.nValue = _.getElementsByClassName(this.body, 'select_val')[0];

		// 初始化
		this.init();
	}

	// 混入事件管理器
	_.extend(Select.prototype, App.emitter);

	// 0. 渲染下拉列表
	Select.prototype.render = function(data, defaultIndex){  // data: [{name:,value:,list:}]
		// 更新下拉列表
		var optionsHTML = '';
		data = data || []; // 若data为null，则默认空数组
		for(var i = 0;i < data.length;i++){
			// 格式化数据{name:,value:}
			optionsHTML += `<li data-index=${i}>${data[i].name}</li>`
		}
		this.nOption.innerHTML = optionsHTML;
		// 缓存下拉选项节点
		this.nOptions = this.nOption.children;
		// 缓存下拉选项数据
		this.options = data;
		// 置空选中项
		this.selectedIndex = undefined;
		// 默认选中第一项
		this.setSelect(defaultIndex || 0);
	};
	// 1. 设置选中选项
	Select.prototype.setSelect = function(index){
		// 取消上次选中效果
		if(this.selectedIndex !== undefined){
			_.delClassName(this.nOptions[this.selectedIndex], 'z-select');
		}
		// 为本次选中设置效果
		this.selectedIndex = index;
		// 防止被选列表为空数组报错
		if(this.nOptions.length > 0){
			_.addClassName(this.nOptions[this.selectedIndex], 'z-select');
			// 更新对外显示的选中内容
			this.nValue.innerText = this.options[this.selectedIndex].name;
		}
		else{
			this.nValue.innerText = '';
		}
		// 触发select事件
		this.emit('select', {
			value: this.getValue(),  // 数据值（如：地址编码）
			target: this, // 触发事件的选择器 本身，用于辅助判定级联选择器中，哪些选择器响应
			index: this.selectedIndex // 选中选项的序号，用于找出下级选择器 下拉菜单的数据
		});
	};
	// 获取选项值
	Select.prototype.getValue = function(){
		return typeof this.options[this.selectedIndex] !== 'undefined' ? this.options[this.selectedIndex].value : '';
	};

	// 2. 切换展开、关闭下拉列表
	Select.prototype.toggle = function(){
		// 若关闭，则展开;若展开，则关闭
		_.hasClassName(this.nOption, 'f-dn') ? this.open() : this.close();
	};
	// 展开下拉列表
	Select.prototype.open = function(){
		_.delClassName(this.nOption, 'f-dn');
	};
	// 关闭下拉列表
	Select.prototype.close = function(){
		_.addClassName(this.nOption, 'f-dn');
	};

	// 3. 与选择器的交互
	Select.prototype.clickHandler = function(evt){
		// 若选中的是li,则触发setSelect
		evt.target.dataset.index !== undefined ? this.setSelect(evt.target.dataset.index) : null;
		// 展开／关闭
		this.toggle();
	};

	// 4. 绑定事件
	Select.prototype.initEvent = function(){
		// 点击选择器，触发交互事件
		this.body.addEventListener('click', this.clickHandler.bind(this));
		// 点击选择器外部，触发关闭选择器事件
		document.addEventListener('click', function(evt){
			// 若是从选择器组件 冒泡出来的，则直接退出
			try{
				// 若浏览器 支持 event.path属性，用此写法
				for(var i=0;i<evt.path.length;i++){
					if(evt.path[i] === this.body){
						return;
					}
				};
			}
			catch(e){
				// 打印异常
				console.log(e);
				// 若浏览器 不支持 event.path属性，则用此写法
				if(evt.target.parentNode === this.body || evt.target.parentNode.parentNode === this.body){
					return;
				}
			}
			// 否则，关闭选择器下拉列表
			this.close();
		}.bind(this));
	};
	// 初始化
	Select.prototype.init = function(){
		// 绑定事件
		this.initEvent();
		// 挂载组件
		this.parent.appendChild(this.body);
	}

	App.Select = Select;

})(window.App);