/**
* 作品列表组件
* 依赖：分页器组件
*/

(function(App){

	var template_title = `
		<div class="m-workstitle">
			<div class="title">/我发表的作品/</div>
			<button class="u-btn">上传作品</button>
		</div>`;

	var template = Handlebars.compile(`
		<ul class="m-works">
			{{#if total}}
				{{#each data}}
				<li class="item">
					<a href="#">
						<img src="{{coverUrl}}" alt="作品默认封面" />
						<h3>{{name}}</h3>
					</a>
					<div class="icons">
						<i class="u-icon u-icon-edit"></i>
						<i class="u-icon u-icon-delete"></i>
					</div>
				</li>
				{{/each}}
			{{else}}
				<div class="cnt">你还没有创建过作品</div>
			{{/if}}
		</ul>`);

	/**
	*  options = {
	*    parent: dom节点,  父容器
	*  }
	*/
	function WorksList(options){

		// 继承配置
		_.extend(this, options);

		// 初始化
		this.init();
	}

	WorksList.prototype.init = function(){
		// 渲染列表头
		this.title = _.html2node(template_title);
		this.parent.appendChild(this.title);
		// 添加Loading图标
		this.loading = _.html2node(`<img class="f-dn" src="../../res/images/loading.gif" />`);
		this.title.appendChild(this.loading);
		// 获取列表信息
		this.getWorksList();
	};
	/**
	*  获取作品列表数据
	*  options = {
	*    total: 0 || 1  // 是否需要返回总数
	*    offset: num    // 偏移数
	*    limit: num     // 返回的 作品条数
	*  }
	*/
	WorksList.prototype.getWorksList = function(options){
		// 防止options undefined
		options = options || {};
		// 隐藏已有数据列表
		this.workList && _.addClassName(this.workList, 'f-vh');
		// 显示Loading图标
		_.delClassName(this.loading, 'f-dn');
		_.ajax({
			url: '/api/works',
			method: 'GET',
			data: {
				total: typeof options.total === 'undefined' ? 1 : options.total,  // 是否需要返回总数
				offset: typeof options.offset === 'undefined' ? 0 : options.offset, // 偏移数
				limit: typeof options.limit === 'undefined' ? 10 : options.limit  // 返回的 作品条数
			},
			success: function(data){
				data = JSON.parse(data);
				if(data.code === 200){
					_.addClassName(this.loading, 'f-dn');
					// 更新作品列表
					this.renderList(data.result);
					// 渲染分页器
					this.renderPagination(data.result);
				}
			}.bind(this),
			fail: function(){}
		});
	};
	// 渲染作品列表
	WorksList.prototype.renderList = function(data){
		// 是否已存在作品列表
		if(this.workList){
			// 若存在，则更新数据
			var oldWorkList = this.workList;
			this.workList = _.html2node(template(data));
			oldWorkList.parentNode.replaceChild(this.workList, oldWorkList);
		}
		else{
			// 若不存在，则新增
			this.workList = _.html2node(template(data));
			this.parent.appendChild(this.workList);
		}
	};
	// 渲染分页器组件
	WorksList.prototype.renderPagination = function(data){
		// 若没有数据，则不渲染分页器
		if(data.total === 0){return;}
		// 单例模式
		this.pagination = this.pagination || new App.Pagination({  // 若不存在则新建
				parent: this.parent,
				total: data.total,
				togglePageNum: this.getWorksList.bind(this)
			});
		
	};

	App.WorksList = WorksList;

})(window.App);