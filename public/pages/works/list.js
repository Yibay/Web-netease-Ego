// 作品列表页
(function(App){

	var page = {

		// 初始化
		init: function(){
			// 未登录，则跳转回首页
			App.emitter.on('notLogin', function(){
				location.href = '/index';
			});
			// 顶栏
			this.initNav();
			// 用户简介
			this.initProfile();
			// 作品列表
			this.initWorksList();
			// 侧边栏
			this.initAside();
		},

		// 初始化顶栏
		initNav: function(){
			// 构建顶栏
			new App.Nav({parent: _.getElementsByClassName(document, 'g-header')[0]});
		},
		// 初始化用户简介
		initProfile: function(){
			// 构建用户简介
			new App.Profile({parent: _.getElementsByClassName(document, 'g-profile')[0]});
		},
		// 作品列表
		initWorksList: function(){
			// 构建作品列表
			new App.WorksList({parent: _.getElementsByClassName(document, 'g-wrap')[0]});
		},
		// 侧边栏
		initAside: function(){
			App.Aside.init({parent: _.getElementsByClassName(document, 'm-aside')[0]});
		}
	}


	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});

})(window.App);