// 级联选择器组件
(function(App){

	/* options 参数说明
	*{
	*	parent: dom节点, 父容器（必填）
	*   data: [{name:,value:,list:}]
	*}
	*/
	function CascadeSelect(options){
		// 继承配置
		_.extend(this, options);
		// 缓存 各级选择器节点 列表
		this.selectList = [];
		// 初始化
		this.init();
	}

	// 初始化
	CascadeSelect.prototype.init = function(){
		for(var i=0;i<3;i++){
			// 创建 选择级组件 (Select中，完成挂载)
			var select = new App.Select({
				parent: this.parent
			});
			// 订阅 select事件，用于触发级联关系
			select.on('select',this.onChange.bind(this, i));//绑定this，绑定参数i
			// 缓存选择器节点
			this.selectList[i] = select;
		}
		// 1级下拉菜单,初始化数据
		this.selectList[0].render(this.data);
	}
	/* 响应select事件，渲染下一个Select数据
	*  参数：index: 选择器在 级联数组中的序号
	*       data{
	*		 	value:   地址编码,
	*		  	target:  触发事件的选择器,
	*		 	index:   选中选项的序号
	*		}
	*/
	CascadeSelect.prototype.onChange = function(index, data){
		// 无关的选择器，不做任何操作，直接退出。
		if(this.selectList[index] !== data.target){return;}
		// 下级选择器，若是末级选择器，则退出
		var next = index + 1;
		if(next === this.selectList.length){return;}
		// 否则，更新渲染下级 选择菜单;
		this.selectList[next].render(this.getList(next, data.index));
	}
	// 获取第N个Select的下拉列表数据
	CascadeSelect.prototype.getList = function(n, index){
		return this.selectList[n - 1].options[index].list;
	}
	CascadeSelect.prototype.getValue = function(){
		var value = [];
		for(var i=0;i<3;i++){
			value.push(this.selectList[i].getValue());
		}
		return value;
	}

	App.CascadeSelect = CascadeSelect;
})(window.App);