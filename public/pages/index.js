(function(App){

	// 登录
	// _.ajax({
	// 	 	url: '/api/login',
	// 	 	method: 'POST',
	// 	 	data: {
	// 			"username": "gKYeivXSti2",
	// 			"password": "fTCQjfsOEw"
	// 		},
	// 	 	success: function(){console.log('success')},
	// 	 	fail: function(){},
	// 	})

	// 构建顶栏
	new App.Nav({parent: _.getElementsByClassName(document, 'g-header')[0]});

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

	// 构建精选推荐
	new App.Section({
		parent: _.getElementsByClassName(document, 'g-main')[0],
		icon: 'u-icon-diamond',
		title: '/精选推荐/',
		contentElem: _.html2node(`<div class="section_cnt m-list m-list-4">
				<ul class="f-cb">
					<li><img src="/res/images/work1.jpg" alt="作品1"/></li>
					<li><img src="/res/images/work2.jpg" alt="作品2"/></li>
					<li><img src="/res/images/work3.jpg" alt="作品3"/></li>
					<li><img src="/res/images/work4.jpg" alt="作品4"/></li>
				</ul>
			</div>`)
	});

	// 构建最新作品
	new App.Section({
		parent: _.getElementsByClassName(document, 'g-main')[0],
		icon: 'u-icon-work',
		title: '/最新作品/',
		contentElem: _.html2node(`<div class="section_cnt m-list m-list-5">
				<ul class="f-cb f-tac">
					<li><img src="/res/images/work5.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品2"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品3"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品4"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品5"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品6"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品7"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品8"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品9"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品10"/><div>我是作品名字</div></li>
				</ul>
			</div>`)
	});

	// 活动进行时

	// 我们都爱原创
	new App.Section({
		parent: _.getElementsByClassName(document, 'g-main')[0],
		icon: 'u-icon-heart',
		title: '/我们都爱原创/',
		contentElem: _.html2node(`<div class="section_cnt m-list m-list-5">
				<ul class="f-cb f-tac">
					<li><img src="/res/images/work7.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品3"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品4"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品5"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品3"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品4"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品5"/><div>我是作品名字</div></li>
				</ul>
			</div>`)
	});

	// 我们都是同人粉
	new App.Section({
		parent: _.getElementsByClassName(document, 'g-main')[0],
		icon: 'u-icon-people',
		title: '/我们都是同人粉/',
		contentElem: _.html2node(`<div class="section_cnt m-list m-list-5">
				<ul class="f-cb f-tac">
					<li><img src="/res/images/work7.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品3"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品4"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品5"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品3"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品4"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品5"/><div>我是作品名字</div></li>
				</ul>
			</div>`)
	});

	// 看谁临摹的最好
	new App.Section({
		parent: _.getElementsByClassName(document, 'g-main')[0],
		icon: 'u-icon-pencle',
		title: '/看谁临摹的最好/',
		contentElem: _.html2node(`<div class="section_cnt m-list m-list-5">
				<ul class="f-cb f-tac">
					<li><img src="/res/images/work7.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品3"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品4"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品5"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品1"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work6.jpg" alt="作品3"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品4"/><div>我是作品名字</div></li>
					<li><img src="/res/images/work5.jpg" alt="作品5"/><div>我是作品名字</div></li>
				</ul>
			</div>`)
	});

	// 注册弹窗
	new App.RegisterModal({parent: document.body});
	// 登录弹窗
	var model = new App.LoginModal({parent: document.body});
	model.show();
	
})(window.App);