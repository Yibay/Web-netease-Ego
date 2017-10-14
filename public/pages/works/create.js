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
			// 作品分类模块
			this.initClassificWorks();
			// 上传图片模块
			this.initUploadPictures();
			// 作品名称、描述模块
			this.initWorkDescription();
			// 标签
			this.initTag();
			// 创建按钮
			this.initSubmitBtn();
			// 警告弹窗
			this.initAlertModal();
			// 绑定事件
			this.addEvent();
		},

		// 初始化顶栏
		initNav: function(){
			// 构建顶栏
			new App.Nav({parent: _.getElementsByClassName(document, 'g-header')[0]});
		},
		// 初始化作品分类组件
		initClassificWorks: function(){
			this.classific_works = App.ClassificWorks.init({parent: _.getElementsByClassName(document, 'g-main')[0]});
		},
		// 初始化上传图片组件
		initUploadPictures: function(){
			// 构建上传图片
			this.upload_pictures = new App.UploadPictures({parent: _.getElementsByClassName(document, 'g-main')[0]});
		},
		// 初始化作品名称、描述组件
		initWorkDescription: function(){
			this.work_description = App.WorkDescription.init({parent: _.getElementsByClassName(document, 'g-main')[0]});
		},
		// 初始化标签
		initTag: function(){
			_.ajax({
				url: '/api/tags?recommend',
				method: 'GET',
				success: function(data){
					data = JSON.parse(data);
					if(data.code == 200){
						this.tag = new App.Tag({
							parent: _.getElementsByClassName(document, 'g-main')[0],
							// tags: ['18禁','萝莉'],
							tags_recommend: data.result.split(',')
						});
					}
					else{
						console.log(data.msg);
					}
				}.bind(this)
			});
		},
		// 初始化创建按钮
		initSubmitBtn: function(){
			// 提交按钮
			this.submit_btn = _.html2node(`<button class="subimit u-btn u-btn-primary">创建</button>`);
			// 挂载按钮
			_.getElementsByClassName(document, 'g-main')[0].appendChild(this.submit_btn);
		},
		// 初始化注册弹窗
		initAlertModal: function(){
			new App.AlertModal({parent: document.body});
		},
		// 绑定事件
		addEvent: function(){
			// 绑定提交表单事件
			this.submit_btn.addEventListener('click', function(){
				console.log(this.classific_works.getValue());
				console.log(this.upload_pictures.getValue());
				console.log(this.work_description.getValue());
				console.log(this.tag.getValue());
			}.bind(this));
		}
	}

	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});

	console.dir(page);

})(window.App);