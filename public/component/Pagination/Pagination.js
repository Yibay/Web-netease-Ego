/**
*  分页器组件
*/ 
(function(App){

	// 默认选中页码
	var DEFAULT_CURRENT_PAGE = 1;
	// 默认显示页码个数
	var DEFAULT_SHOW_NUM = 8;
	// 默认每页显示数量
	var DEFAULT_ITEMS_LIMIT = 10;

	/**
	*  options = {
	*	 parent: dom节点
	*    total: num 总共作品数
	*  }
	*/
	function Pagination(options){

		// 继承配置
		_.extend(this, options);
		// 当前页
		this.current = options.current || DEFAULT_CURRENT_PAGE;
		// 显示页码个数
		this.showNum = options.showNum || DEFAULT_SHOW_NUM;
		// 每页显示数量
		this.itemsLimit = options.itemsLimit || DEFAULT_ITEMS_LIMIT;
		// 总页数
		this.totalNum = Math.ceil(this.total / this.itemsLimit);

		// 缓存节点
		this.container = _.html2node('<ul class="m-pagination f-cb"></ul>'); // 容器节点

		this.render();
		this.addEvent();
	}

	// 渲染分页器，选项卡
	Pagination.prototype.render = function(){
		// 起始页
		this.startNum = Math.floor((this.current - 1) / this.showNum) * this.showNum + 1;
		// 截止页
		this.endNum = Math.min(this.startNum + this.showNum - 1, this.totalNum);

		// 分页器结构
		var html = `<li data-page="1" class="${this.current == 1 ? 'disable' : ''}">第一页</li>`;
		html += `<li data-page="${this.current - 1}" class="${this.current == 1 ? 'disable' : ''}">上一页</li>`;
		for(var i=this.startNum;i<=this.endNum;i++){
			html += `<li data-page="${i}" class="${i == this.current ? 'z-active' : ''}">${i}</li>`;
		}
		html += `<li data-page="${this.current - 0 + 1}" class="${this.current == this.totalNum ? 'disable' : ''}">下一页</li>`;
		html += `<li data-page="${this.totalNum}" class="${this.current == this.totalNum ? 'disable' : ''}">尾页</li>`;
		this.container.innerHTML = html;
		this.parent.appendChild(this.container);
	};
	// 切换页码
	Pagination.prototype.setStatus = function(page){
		// 更新当前页
		this.current = page;
		// 刷新分页器
		this.render();
		// 重新渲染分页器组件
		this.togglePageNum({
			total: 1,
			offset: (this.current - 1) * this.itemsLimit,
			limit: this.itemsLimit
		});
	};
	// 绑定事件
	Pagination.prototype.addEvent = function(){
		// 容器节点，事件代理
		this.container.addEventListener('click', function(evt){
			// 有页码，且未被禁用时
			if(evt.target.dataset.page && ! _.hasClassName(evt.target, 'disable')){
				// 切换页码
				this.setStatus(evt.target.dataset.page);
			}
		}.bind(this));
	};

	App.Pagination = Pagination;

})(window.App);