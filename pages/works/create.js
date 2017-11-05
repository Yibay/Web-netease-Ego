// 作品创建页
(function(App){

	var page = {

		// 初始化
		init: function(){
			// 未登录，则跳转回首页
			App.emitter.on('notLogin', function(){
				location.href = `${base_url}/index`;
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
			// 权限设置
			this.initWorkPermission();
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
				url: _.createUrl('/api/tags?recommend', 'GET'),
				method: _.fixMethod('GET'),
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
		// 初始化权限设置
		initWorkPermission: function(){
			// 
			this.work_permission = new App.WorkPermission({parent: _.getElementsByClassName(document ,'g-side')[0]});
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
				// 新创建作品数据
				var new_work = {};

				// 向作品数据中，添加 名称、描述
				_.extend(new_work, this.work_description.getValue());
				// 向作品数据中，添加 封面图片id、封面图片地址、图片列表
				_.extend(new_work, this.upload_pictures.getValue());
				// 向作品数据中，添加 标签
				new_work.tag = this.tag.getValue();
				// 向作品数据中，添加 分类
				new_work.category = this.classific_works.getValue();
				// 向作品数据中，添加 权限设置、授权类型
				_.extend(new_work, this.work_permission.getValue());

				console.log(new_work);
				// 若作品名称为空，则停止提交
				this.subimitForm(new_work);
			}.bind(this));
		},
		// 检查表单
		checkForm: function(data){
			var result = true;
			// 若作品名字为空，则验证不通过
			if(!data.name){result = false;}
			// 若作品列表为空，则验证不通过
			else if(data.pictures.length === 0){
				App.emitter.emit('alert', '请选择图片上传');
				result = false;
			}
			// 若作品列表为空，则验证不通过
			else if(!data.coverId || !data.coverUrl){
				App.emitter.emit('alert', '请设置封面图片');
				result = false;
			}
			return result;
		},
		// 提交表单
		subimitForm: function(data){
			// 若表单数据不合格，则不做提交请求
			if(!this.checkForm(data)){return;}
			// 提交表单请求
			_.ajax({
				url: _.createUrl('/api/works', 'POST'),
				method: _.fixMethod('POST'),
				data: data,
				success: function(res){
					res = JSON.parse(res);
					console.log(res);
					// 上传成功
					if(res.code === 200){
						// 跳转回列表页
						location.assign(`${base_url}/works`);
					}
				},
				fail: function(e){
					console.log(e);
				},
				header: {'content-type': 'application/json'}
			});
		}
	}

	document.addEventListener('DOMContentLoaded', function(e){
		page.init();
	});

	console.dir(page);

})(window.App);