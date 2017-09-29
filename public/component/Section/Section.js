// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){

	/* options 参数说明
	*{
	*	parent: dom节点, 父容器（必填）
	*	icon: str, 
	*	title: str, 模块标题 (必填) 
	*	contentElem: dom元素, 内容区dom (选填)
	*}
	*/
	function Section(options){
		// 继承配置
		_.extend(this, options);

		var _template = App.template.m_section(this);

		// 缓存节点
		this.section = _.html2node(_template);

		// 初始化
		this.init();
	}

	// 初始化
	Section.prototype.init = function(){
		// 挂载组件
		this.parent.appendChild(this.section);
		// 替换section 内容结构
		if(this.contentElem){
			var section_cnt = _.getElementsByClassName(this.section, 'section_cnt')[0];
			section_cnt.parentNode.replaceChild(this.contentElem, section_cnt);
		}
	}

	App.Section = Section;

})(window.App);