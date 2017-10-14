/**
*  作品分类组件
*/

(function(App){

	// 模板
	var template = `<div class="m-classificworks f-cb">
		<label class="classific_title">作品分类</label>
		<label class="classific_radio"><input type="radio" name="category" value=0 checked /><span class="u-btn">原创</span></label>
		<label class="classific_radio"><input type="radio" name="category" value=1 /><span class="u-btn">临摹</span></label>
	</div>`;

	// 单例组件
	var ClassificWorks = {
		/**
		*  options = {
		*    parent: dom节点 (父容器节点)
		*  }
		*/
		// 初始化
		init: function(options){
			// 继承配置
			_.extend(this, options);

			// 缓存节点
			this.container = _.html2node(template);

			// 挂载组件
			this.parent.appendChild(this.container);
			return this;
		},
		// 获取 作品分类信息
		getValue: function(){
			var input = this.container.getElementsByTagName('input');
			var value = 0;
			Array.prototype.some.call(input, function(item){
				var found = false;
				if(item.checked){
					value = item.value;
					found = true;
				}
				return found;
			});
			return value;
		}
	};

	App.ClassificWorks = ClassificWorks;

})(window.App);