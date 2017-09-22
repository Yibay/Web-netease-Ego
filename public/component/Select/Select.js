// 选择器组件
(function(App){

	// 模板
	var template = `<div class="m-select">
		<div class="select_hd">
			<span class="select_val">北京</span>
			<span class="u-icon u-icon-dropdown"></span>
		</div>
		<ul class="select_opt f-dn"></ul>
	</div>`;

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
	}

	// 混入事件管理器
	_.extend(Select.prototype, App.emitter);

	// 渲染下拉列表
	Select.prototype.render = function(data, defaultIndex){
		// 更新下拉列表
		var optionsHTML = '';
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
	// 设置选中选项
	Select.prototype.setSelect = function(index){
		// 取消上次选中效果
		if(this.selectedIndex !== undefined){
			_.delClassName(this.nOptions[this.selectedIndex], 'z-select');
		}
		// 为本次选中设置效果
		this.selectedIndex = index;
		_.addClassName(this.nOptions[this.selectedIndex], 'z-select');
		// 更新对外显示的选中内容
		this.nValue.innerText = this.options[this.selectedIndex].name;

		// 触发select事件
		this.emit('select', this.getValue());
	}
	Select.prototype.init = function(){};
	Select.prototype.initEvent = function(){};
	Select.prototype.clickHandler = function(event){}
	Select.prototype.open = function(){};
	Select.prototype.close = function(){};
	Select.prototype.toggle = function(){};
	Select.prototype.getValue = function(){}

	App.Select = Select;

})(window.App);