/**
*  作品名称、作品说明组件
*/
(function(App){

	var template =`<div class="m-workdescription">
		<div class="f-cb">
			<label class="name_title">作品名称</label><input class="u-ipt" placeholder="给作品起个名字吧" /><span class="prompt_msg f-dn">你的作品还没有取名字哦</span>
		</div>
		<div class="f-cb">
			<label class="description_title">作品说明</label><textarea class="u-ipt"></textarea>
		</div>
	</div>`;

	var WorkDescription = {
		// 初始化
		/**
		*  options = {
		*    parent: dom节点 (父容器节点)
		*  }
		*/
		init: function(options){
			// 继承配置
			_.extend(this, options);

			// 缓存节点
			this.container = _.html2node(template);
			this.msg = _.getElementsByClassName(this.container, 'prompt_msg')[0];

			// 挂载组件
			this.parent.appendChild(this.container);

			return this;
		},
		getValue: function(){
			// 若名字为空
			if(!this.checkName()){
				// 显示警告消息
				_.delClassName(this.msg, 'f-dn');
			}
			else{
				// 隐藏警告消息
				_.addClassName(this.msg, 'f-dn');
			}
			return {
				name: this.container.getElementsByTagName('input')[0].value.trim(),
				description: this.container.getElementsByTagName('textarea')[0].value.trim()
			};
		},
		checkName: function(){
			return !!this.container.getElementsByTagName('input')[0].value.trim();
		}
	};

	App.WorkDescription = WorkDescription;

})(window.App);