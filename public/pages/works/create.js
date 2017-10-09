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
			// 标签
			this.initTag();
		},

		// 初始化顶栏
		initNav: function(){
			// 构建顶栏
			new App.Nav({parent: _.getElementsByClassName(document, 'g-header')[0]});
		},
		// 初始化标签
		initTag: function(){
			_.ajax({
				url: '/api/tags?recommend',
				method: 'GET',
				success: function(data){
					data = JSON.parse(data);
					if(data.code == 200){
						new App.Tag({
							parent: _.getElementsByClassName(document, 'g-main')[0],
							// tags: ['18禁','萝莉'],
							tags_recommend: data.result.split(',')
						});
					}
					else{
						console.log(data.msg);
					}
				}
			});
		}
	}


	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});

})(window.App);