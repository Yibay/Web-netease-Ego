// 首页
(function(App){

	var base_url = 'Web-netease-Ego';

	var page = {

		// 初始化
		init: function(){
			// 编译模板（主内容区）
			this.compileTemplateMain();
			// 编译模板（侧边栏）
			this.compileTemplateAside();
			// 底栏
			this.initFooter();
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
			// 侧边栏 排行tabs
			this.initRankingTabs();
		},

		// 编译模板（主内容区）
		compileTemplateMain: function(){
			var html = '';

			// 构建精选推荐
			html += App.template.m_section({
				icon: 'u-icon-diamond',
				title: '/ 精 选 推 荐 /',
				cnt: App.template.list_img({
					list_type: 'm-list-4',
					list: [
						{img:'${base_url}/res/images/work1.jpg',img_alt:'作品1'},
						{img:'${base_url}/res/images/work2.jpg',img_alt:'作品2'},
						{img:'${base_url}/res/images/work3.jpg',img_alt:'作品3'},
						{img:'${base_url}/res/images/work4.jpg',img_alt:'作品4'}
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
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品10',img_name:'我是作品名字'}
					]
				})
			});
			// 活动进行时
			html += App.template.m_section({
				icon: 'u-icon-time',
				title: '/ 活 动 进 行 时 /',
				cnt: App.template.list_activity({
					list_type: 'm-list-1',
					list: [
						{img:'${base_url}/res/images/activity1.png',times:'7.23-8.12',status:'正在进行'},
						{img:'${base_url}/res/images/activity2.png',times:'7.23-8.12',status:'正在进行'}
					]
				})
			});

			// 我们都爱原创
			html += App.template.m_section({
				icon: 'u-icon-heart',
				title: '/ 我 们 都 爱 原 创 /',
				cnt: App.template.list_img({
					list_type: 'm-list-5',
					list: [
						{img:'${base_url}/res/images/work7.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'},
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
						{img:'${base_url}/res/images/work7.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'}
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
						{img:'${base_url}/res/images/work7.jpg',img_alt:'作品1',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品2',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品3',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品4',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品5',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品6',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work6.jpg',img_alt:'作品7',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品8',img_name:'我是作品名字'},
						{img:'${base_url}/res/images/work5.jpg',img_alt:'作品9',img_name:'我是作品名字'}
					]
				})
			});

			// 编译结果，载入页面主内容区
			_.getElementsByClassName(document, 'g-main')[0].innerHTML = html;

		},

		// 编译模板（侧边栏）
		compileTemplateAside: function(){
			var html = '';

			html += `<img class="my_work m-aside" src="/res/images/my_work.png" />`;

			// 圈子
			html += App.template.aside_circle({
				list: [
					{img_url: '${base_url}/res/images/circle1.jpg', circle_name: '门口小贩',circle_members:5221},
					{img_url: '${base_url}/res/images/circle2.jpg', circle_name: '原画集中营',circle_members:5221},
					{img_url: '${base_url}/res/images/circle3.jpg', circle_name: '—— Horizon ——',circle_members:5221}
				]
			});

			// 热门话题
			html += App.template.aside_hottopic({
				list: [
					{title: '1. [萝莉学院] 你不知道的那些事儿 这是标题标题 这是标题标题 这是标题标题 这是标题标题'},
					{title: '1. [萝莉学院] 你不知道的那些事儿 这是标题标题 这是标题标题 这是标题标题 这是标题标题'},
					{title: '1. [萝莉学院] 你不知道的那些事儿 这是标题标题 这是标题标题 这是标题标题 这是标题标题'},
					{title: '1. [萝莉学院] 你不知道的那些事儿 这是标题标题 这是标题标题 这是标题标题 这是标题标题'},
					{title: '1. [萝莉学院] 你不知道的那些事儿 这是标题标题 这是标题标题 这是标题标题 这是标题标题'}
				]
			});

			// 排行
			html += App.template.aside_ranking({
				list: [
					{img_url: '${base_url}/res/images/work5.jpg',work_name: '我是作品名称',author_name: '用户名',visit_num: 2348,collection_num: 421},
					{img_url: '${base_url}/res/images/work6.jpg',work_name: '我是作品名称',author_name: '用户名',visit_num: 2348,collection_num: 421},
					{img_url: '${base_url}/res/images/work8.jpg',work_name: '我是作品名称',author_name: '用户名',visit_num: 2348,collection_num: 421},
					{img_url: '${base_url}/res/images/work9.jpg',work_name: '我是作品名称',author_name: '用户名',visit_num: 2348,collection_num: 421},
					{img_url: '${base_url}/res/images/work10.jpg',work_name: '我是作品名称',author_name: '用户名',visit_num: 2348,collection_num: 421}
				]
			});

			// 达人排行
			html += App.template.aside_authorranking({
				list: [
					{img_url: '${base_url}/res/images/avatar0.jpg',author_name: 'Grinch',works_num: 2348,fans_num: 421},
					{img_url: '${base_url}/res/images/avatar0.jpg',author_name: 'Grinch',works_num: 2348,fans_num: 421},
					{img_url: '${base_url}/res/images/avatar0.jpg',author_name: 'Grinch',works_num: 2348,fans_num: 421},
					{img_url: '${base_url}/res/images/avatar0.jpg',author_name: 'Grinch',works_num: 2348,fans_num: 421},
					{img_url: '${base_url}/res/images/avatar0.jpg',author_name: 'Grinch',works_num: 2348,fans_num: 421}
				]
			});

			// 编译结果，载入页面主内容区
			_.getElementsByClassName(document, 'g-side')[0].innerHTML = html;
		},

		initFooter: function(){
			var html = `<div class="footer_main">
				<div class="u-btn u-btn-primary">/ 友 情 链 接 /</div>
			</div>
			<div class="footer_aside">
				<div class="u-btn u-btn-link">/ 关 于 我 们 /</div>
			</div>`;

			_.getElementsByClassName(document, 'g-footer')[0].innerHTML = html;
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
					'${base_url}/res/images/Slider/banner0.jpg',
					'${base_url}/res/images/Slider/banner1.jpg',
					'${base_url}/res/images/Slider/banner2.jpg',
					'${base_url}/res/images/Slider/banner3.jpg'
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
		},
		initRankingTabs: function(){
			// 侧边栏 排行tabs
			new App.Tabs({
				parent: document.getElementById('ranking_tabs'),
				nTabData: [
					{name:'原 创',url:'javascript:;'},
					{name:'同 人',url:'javascript:;'},
					{name:'临 摹',url:'javascript:;'}
				],
				list_type: 'm-tabs-aside'
			});
		}
	}

	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});

})(window.App);