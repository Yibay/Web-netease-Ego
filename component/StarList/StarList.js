
/* 登录弹窗组件
* 使用登录弹窗组件前，要先引入 Modal组件
* 以及 事件管理器、工具函数模块、md5加密库
*/
(function(App){

	// 模板
	var template = `<div class="section_cnt m-list m-list-2">
		<ul class="m-cardul f-cb">
		</ul>
	</div>`;

	/**
	* options = {
	*  loaction: dom节点，此组件载入的位置(必填)
	* }
	*/
	function StarList(options){

		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = _.html2node(template);
		this.ul = this.container.getElementsByTagName('ul')[0];

		// 初始化
		this.init();
	}

	// 混入事件管理器
	_.extend(StarList.prototype, App.emitter);

	// 获取明日之星数据
	StarList.prototype.getstarlist = function(){
		_.ajax({
			url: '/api/users?getstarlist',
			method: 'GET',
			success: function(data){
				data = JSON.parse(data);
				if(data.code === 200){
					this.render(data.result);
				}
			}.bind(this),
			fail: function(){}
		});
	};
	// 渲染列表
	StarList.prototype.render = function(data){
		var html = '';
		data.forEach(function(item, index){
			html += this.renderItem(item, index);
		}.bind(this));
		this.ul.innerHTML = html;
	};
	var followConfig = [
		{
			class: '',
			icon: 'u-icon-add',
			text: '关注'
		},
		{
			class: 'z-follow',
			icon: 'u-icon-right',
			text: '已关注'
		}
	];
	// 渲染m-card
	StarList.prototype.renderItem = function(data, index){
		var config = followConfig[Number(!!data.isFollow)];
		var html = `
			<li class="m-card">
				<img src="${base_url}/res/images/avatar${index}.jpg" alt="" class="card_avatar" />
				<div class="card_info">
					<div>${data.nickname}</div>
					<div><span>作品 ${data.workCount}</span><span>粉丝 ${data.followCount}</span></div>
				</div>
				<button class="u-btn u-btn-sm ${config.class}" data-userid="${data.id}" data-nickname="${data.nickname}" data-workcount="${data.workCount}" data-followcount="${data.followCount}" data-loginstatus=${typeof data.isFollow !== 'undefined'} data-index=${index}>
					<span class="u-icon ${config.icon}"></span>${config.text}
				</button>
			</li>`;
		return html;
	};
	// 关注按钮事件管理
	StarList.prototype.followHandler = function(evt){
		var target = evt.target;
		// 若点中 加号 小图标
		if(target.tagName !== 'BUTTON' && target.parentNode.tagName === 'BUTTON' ){
			target = target.parentNode;
		}
		console.dir(target);
		if(target.tagName === 'BUTTON'){
			// 未登录的情况
			if(target.dataset.loginstatus === 'false'){
				// 弹出登录弹窗
				this.emit('showLoginModal');
				return;
			}
			// 已登录的情况
			var data;
			// data 点击用户的信息
			data = {
				id: target.dataset.userid,
				index: target.dataset.index,
				nickname: target.dataset.nickname,
				workCount: target.dataset.workcount,
				followCount: target.dataset.followcount
			};
			// 已关注
			if(_.hasClassName(target, 'z-follow')){
				this.unFollow(data, target.parentNode);
			}
			// 未关注
			else{
				this.follow(data, target.parentNode);
			}
		}
	};
	// 关注
	StarList.prototype.follow = function(followInfo, replaceNode){
		_.ajax({
			url: api_url + '/api/users?follow',
			method: 'POST',
			data: {id: followInfo.id},
			header: {'content-type': 'application/json'},
			success: function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.code === 200){
					followInfo.isFollow = true; // 状态变成 已关注
					followInfo.followCount ++; // 关注人数 ＋1
					var newNode = _.html2node(this.renderItem(followInfo, followInfo.index));
					replaceNode.parentNode.replaceChild(newNode, replaceNode);
				}
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	};
	// 取消关注
	StarList.prototype.unFollow = function(followInfo, replaceNode){
		_.ajax({
			url: api_url + '/api/users?unfollow',
			method: 'POST',
			data: {id: followInfo.id},
			header: {'content-type': 'application/json'},
			success: function(data){
				data = JSON.parse(data);
				console.log(data);
				if(data.code === 200){
					followInfo.isFollow = false;
					followInfo.followCount --;
					var newNode = _.html2node(this.renderItem(followInfo, followInfo.index));
					replaceNode.parentNode.replaceChild(newNode, replaceNode);
				}
			}.bind(this),
			fail: function(err){
				console.log(err);
			}
		});
	};

	// 初始化
	StarList.prototype.init = function(){
		// 初始化 明日之星列表
		this.getstarlist();
		// 绑定事件
		this.ul.addEventListener('click', this.followHandler.bind(this)); // 绑定关注事件
		// 订阅事件
		this.on('login', this.getstarlist.bind(this)); // 登录时，刷新明日之星列表
		// 挂载组件
		this.location.parentNode.replaceChild(this.container, this.location);
	};

	App.StarList = StarList;
})(window.App);