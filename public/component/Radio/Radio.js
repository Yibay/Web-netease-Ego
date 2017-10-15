/**
*  单选组件
*/
(function(App){

	var template = `<ul class="m-radio"></ul>`;

	/**
	*  options = {
	*    parent: dom节点 (必填) 父容器节点
	*    data: {name: str, list:[{text: str, value: num}...]} （必填）单选数据（名称、文本、值）
	*    default_checkindex: num (默认选中)序号
	*  }
	*/
	function Radio(options){
		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = _.html2node(template);

		// 初始化
		this.init();
	}

	// 初始化
	Radio.prototype.init = function(){
		// 渲染单选框
		this.render(this.data);

		// 绑定事件
		this.container.addEventListener('change', this.setChecked.bind(this));

		// 挂载组件
		this.parent.appendChild(this.container);
	};
	// 渲染单选框
	Radio.prototype.render = function(data){
		var html = '';
		if(Object.prototype.toString.call(data.list).slice(8, -1) === 'Array'){
			data.list.forEach(function(item){
				html += `<li>
					<label class="f-cb">
						<input type=radio name=${data.name} value=${item.value} />
						<i class="u-icon u-icon-radio"></i><i class="u-icon u-icon-radiocircle"></i>${item.text}
					</label>
				</li>`;
			});
		};
		this.container.innerHTML = html;
		// 设置默认 选中值
		this.list = this.container.children;
		if(this.list.length > 0){
			this.default_checkindex = this.default_checkindex || 0;
			this.list[this.default_checkindex].getElementsByTagName('input')[0].checked = true;
			this.value = this.list[this.default_checkindex].getElementsByTagName('input')[0].value;
		}
	};
	Radio.prototype.setChecked = function(evt){
		this.value = evt.target.value;
	};
	// 获取数据
	Radio.prototype.getValue = function(){
		return this.value;
	};

	App.Radio = Radio;

})(window.App);