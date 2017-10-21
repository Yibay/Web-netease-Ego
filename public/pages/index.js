// 首页
(function(App){

	var page = {

		// 初始化
		init: function(){
			// 编译模板（主内容区）
			this.compileTemplate();
			// 顶栏
			this.initNav();
			// 轮播
			this.initSlider();
			// 明日之星
			this.initStarList();
			// 注册弹窗
			this.initRegisterModal();
			// 登录弹窗
			this.initLoginModal();
		},

		// 编译模板
		compileTemplate: function(){
			var html = '';

			// 构建精选推荐
			html += App.template.m_section({
				icon: 'u-icon-diamond',
				title: '/ 精 选 推 荐 /',
				cnt: App.template.list_img({
					list_type: 'm-list-4',
					list: [
						{img:'/res/images/work1.jpg',img_alt:'作品1'},
						{img:'/res/images/work2.jpg',img_alt:'作品2'},
						{img:'/res/images/work3.jpg',img_alt:'作品3'},
						{img:'/res/images/work4.jpg',img_alt:'作品4'}
					]
				})
			});
			// 明日之星
			html += App.template.m_section({
				icon: 'u-icon-star',
				title: '/ 明 日 之 星 /',
				cnt: '<div id="star_list" class="section_cnt"></div>'
			});
			// 构建最新作品
			html += App.template.m_section({
				icon: 'u-icon-work',
				title: '/ 最 新 作 品 /',
				cnt: App.template.list_img({
					list_type: 'm-list-5',
					list: [
						{img:'/res/images/work5.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品10',img_name:'我是作品名字'}
					]
				})
			});
			// 活动进行时
			// html += App.template.m_section({
			// 	icon:
			// });

			// 我们都爱原创
			html += App.template.m_section({
				icon: 'u-icon-heart',
				title: '/ 我 们 都 爱 原 创 /',
				cnt: App.template.list_img({
					list_type: 'm-list-5',
					list: [
						{img:'/res/images/work7.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'},
					]
				})
			});
			// 我们都是同人粉
			html += App.template.m_section({
				icon:'u-icon-people',
				title:'/ 我 们 都 是 同 人 粉 /',
				cnt: App.template.list_img({
					list_type: 'm-list-5',
					list: [
						{img:'/res/images/work7.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'}
					]
				})
			});
			// 看谁临摹的最好
			html += App.template.m_section({
				icon:'u-icon-pencle',
				title:'/ 看 谁 临 摹 的 最 好 /',
				cnt: App.template.list_img({
					list_type: 'm-list-5',
					list: [
						{img:'/res/images/work7.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'/res/images/work6.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'}
					]
				})
			});
			// 编译结果，载入页面主内容区
			_.getElementsByClassName(document, 'g-main')[0].innerHTML = html;

		},

		// 初始化顶栏
		initNav: function(){
			// 构建顶栏
			new App.Nav({parent: _.getElementsByClassName(document, 'g-header')[0]});
		},
		// 初始化轮播图
		initSlider: function(){
			// 构建轮播图
			new App.Slider({
				parent: _.getElementsByClassName(document, 'g-banner')[0],
				imgArray: [
					'../res/images/Slider/banner0.jpg',
					'../res/images/Slider/banner1.jpg',
					'../res/images/Slider/banner2.jpg',
					'../res/images/Slider/banner3.jpg'
				],
				interval: 5000
			});	
		},
		// 初始化明日之星
		initStarList: function(){
			new App.StarList({location: document.getElementById('star_list')});
		},
		// 初始化注册弹窗
		initRegisterModal: function(){
			// 注册弹窗
			new App.RegisterModal({parent: document.body});
		},
		// 初始化登录弹窗
		initLoginModal: function(){
			// 登录弹窗
			new App.LoginModal({parent: document.body});
		}
	}

	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});

})(window.App);