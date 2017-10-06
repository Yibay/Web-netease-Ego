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
		},

		// 初始化顶栏
		initNav: function(){
			// 构建顶栏
			new App.Nav({parent: _.getElementsByClassName(document, 'g-header')[0]});
		},
		// 初始化用户简介
		initProfile: function(){
			// 构建用户简介
			new App.Profile({parent: _.getElementsByClassName(document, 'g-profile')[0]})
		}
	}


	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});

})(window.App);