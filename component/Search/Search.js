// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){

	// 模板
	var template = `<form action="${page_url}/search" class="m-search" id="search" method="GET">
		<div class="u-search f-cb">
			<input type="text" id="keyword" name="keyword" placeholder="输入搜索内容" />
			<button class="u-icon u-icon-search u-icon-btn" type="submit"></button>
		</div>
	</form>`;

	// options 参数说明
	// {
	//   parent: dom节点, 父容器 (必填)
	// }）
	function Search(options){
		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.nForm = this._template.cloneNode(true);
		this.nKeyword = this.nForm.getElementsByTagName('input')[0];

		// 初始化
		this.init();
	}

	// 用于复用的dom节点
	Search.prototype._template = _.html2node(template);

	// 初始化(绑定事件, 将组件载入页面)
	Search.prototype.init = function(){
		// 绑定事件
		this.nForm.addEventListener('submit', this.search.bind(this));
		// 挂载组件
		this.parent.appendChild(this.nForm);
	}
	Search.prototype.search = function(event){
		// 清除空格
		this.nKeyword.value = this.nKeyword.value.trim();
		// 验证表单是否为空
		if(!this.nKeyword.value){
			// 不提交表单
			event.preventDefault();
		}
	}

	App.Search = Search;

})(window.App);