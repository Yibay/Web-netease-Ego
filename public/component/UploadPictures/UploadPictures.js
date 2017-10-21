/**
*  上传图片 组件
*/

(function(App){

	var template = `<div class="m-uploadpictures">
		<div class="upload_controller f-cb">
			<label class="upload_title">上传图片</label>
			<div class="f-oh">
				<div class="f-cb">
					<label>
						<span class="upload_btn u-btn u-btn-primary">选择图片上传</span>
						<input class="upload_input" type="file" multiple accept="image/*" />
					</label>
					<progress class="f-dn" max="100" value="50"></progress>
					<span class="progress_msg" ></span>
				</div>
				<p class="prompt_box">提示：作品可以包含多张图片，一次选择多张图片，最多不超过10张（单张图片大小小于1M）</p>
			</div>
		</div>
		<ul class="pictures_controller f-cb">
		</ul>
	</div>`;

	/**
	*  options = {
	*    parent : dom节点  (父容器节点)
	*  }
	*/
	function UploadPictures(options){

		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = _.html2node(template);
		this.upload_btn = _.getElementsByClassName(this.container, 'upload_btn')[0]; // 上传图片的按钮
		this.upload_input = _.getElementsByClassName(this.container, 'upload_input')[0]; // 存图片文件的input
		this.progress = this.container.getElementsByTagName('progress')[0]; // 上传进度条
		this.progress_msg = _.getElementsByClassName(this.container, 'progress_msg')[0]; // 进度条文字提示
		this.pictures_controller = _.getElementsByClassName(this.container, 'pictures_controller')[0]; // 图片列表

		// 图片列表
		this.picture_list = [];

		// 初始化
		this.init();
	}

	// 混入事件管理器
	_.extend(UploadPictures.prototype, App.emitter);

	// 初始化
	UploadPictures.prototype.init = function(){

		// 绑定 选择上传图片后 触发事件
		this.upload_input.addEventListener('change', this.changeHandler.bind(this));
		// 绑定 拖拽上传
		this.pictures_controller.addEventListener('dragover', function(evt){
			evt.preventDefault();
		});
		this.pictures_controller.addEventListener('drop', function(evt){
			evt.preventDefault();
			this.dropFiles(evt.dataTransfer.files);
		}.bind(this));
		// 绑定 设置封面事件
		this.pictures_controller.addEventListener('click', this.setCoverImg.bind(this));
		// 绑定 移除图片事件
		this.pictures_controller.addEventListener('click', this.removeImg.bind(this));

		// 挂载组件
		this.parent.append(this.container);
	};

	// 1.通过按钮 上传文件
	UploadPictures.prototype.changeHandler = function(){
		// 从input中获取 files
		var files = this.upload_input.files;
		// 检验规格 (不合格，则不上传)
		this._checkFiles(files);
	};
	// 2.通过拖拽 上传文件
	UploadPictures.prototype.dropFiles = function(files){
		// 从drop事件中，获取files
		// 检验规格 (不合格，则不上传)
		this._checkFiles(files);
	};
	// 检验文件规格
	UploadPictures.prototype._checkFiles = function(files){
		var maxSize = 1024 * 1024;  // 1M
		var sizeOkFiles = [];
		var sizeExceedFiles = [];
		var typeExceedFiles = [];

		// 每次最多选择10张图片
		if(files.length > 10){
			this.emit('alert', '每次最多选择10张图片');
			return;
		}

		// 过滤出，大小 < 1M 的图片
		Array.prototype.forEach.call(files, function(item){
			// 文件类型 非图片格式
			if(!/^image\//.test(item.type)){
				typeExceedFiles.push(item);
				return;
			}
			// 图片尺寸 < 1M
			if(item.size < maxSize){
				sizeOkFiles.push(item);
			}
			// 图片尺寸 > 1M
			else{
				sizeExceedFiles.push(item);
			}
		});

		// 若有文件类型 不是图片类型
		if(typeExceedFiles.length > 0){
			this.emit('alert', '只能上传图片类型');
			return;
		}

		// 若有图片超过 1M,则 所有图片不做上传动作
		if(sizeExceedFiles.length > 0){
			this.emit('alert', '图片大小不能超过1M');
			return;
		}

		// 禁止点击上传按钮
		_.addClassName(this.upload_btn, 'f-pen');

		// 上传图片
		this._uploadFiles(sizeOkFiles);
	}
	// 上传文件
	UploadPictures.prototype._uploadFiles = function(files){

		// 进度条文案参数
		this.uploadfiles_total = files.length; // 上传文件总数 
		this.uploadfiles_loaded = 0 // 已上传完成文件数
		this.uploadfiles_progress = []; // 上传文件 进度数组
		for(var i=0;i<files.length;i++){
			this.uploadfiles_progress.push(0); // 各文件 初始值进度 为0
		}

		// 显示进度条
		this._showProgress(0, files.length);

		// 上传请求队列
		var uploadRequests = [];

		// 并发各图片上传请求
		files.forEach(function(item, index){

			uploadRequests.push(new Promise(function(resolve, reject){

				// 用于储存 File类型 数据
				var fd = new FormData();
				fd.append('file', item, item.name);

				// 请求
				var xhr = new XMLHttpRequest();
				xhr.withCredentials = true; // 支持异步，携带cookie身份认证

				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4){
						if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
							resolve(JSON.parse(xhr.responseText).result);
						}
						else{
							reject(xhr.responseText);
						}
					}
				}

				xhr.upload.addEventListener('progress', this.progressHandler.bind(this, index), false);
				xhr.open('POST', '/api/works?upload');
				// 直接send FormData实例
				xhr.send(fd);

			}.bind(this))
			.then(res => {
				// 添加图片
				this._addImg(res);
				return res;
			})
			.catch(e => e)
			);
		}.bind(this));

		// 全部请求返回后
		Promise.all(uploadRequests)
			.then(function(data){
				// 隐藏进度条
				this._hideProgress();
				// 清空进度条文案
				this._updateProgressMsg();
				// 上传完毕，恢复按钮状态
				_.delClassName(this.upload_btn, 'f-pen');
			}.bind(this))
			.catch(function(e){
				console.log(e);
			});
	};
	// 向图片列表中，添加图片
	UploadPictures.prototype._addImg = function(res){

		switch(Object.prototype.toString.call(res).slice(8,-1)){
			case 'String':
				// 若是string类型，则为错误信息，直接跳过
				return;
			case 'Array':
				res.forEach(function(item){
					_addOneImg.call(this, item);
				}.bind(this));
				break;
			case 'Object':
				_addOneImg.call(this, res);
				break;
		}
		// 添加 单张照片
		function _addOneImg(res){
			// 向图片list 数据中添加
			this.picture_list.push(res);
			// 向视图list 中添加
			this.pictures_controller.appendChild(_.html2node(`
				<li data-id="${res.id}" data-url="${res.url}">
					<img src="${res.url}" />
					<div class="hover_bg">
						<i class="u-icon u-icon-delete"></i>
					</div>
					<button class="u-btn u-btn-link">设为封面</button>
					<button class="u-btn u-btn-link">已设为封面</button>
				</li>`));
		}
		
	}

	// 3.上传进度 回调函数
	UploadPictures.prototype.progressHandler = function(index, evt){
		console.log(evt);
		// 若可计算
		if(evt && evt.lengthComputable){
			// 更新 进度数组
			this.uploadfiles_progress[index] = evt.loaded / evt.total;
			// 当一个文件上传完毕，上传文件数 ＋ 1
			if(this.uploadfiles_progress[index] === 1){this.uploadfiles_loaded ++;}
		}
		// 并归 进度数组值，传给进度条
		this._showProgress(this.uploadfiles_progress.reduce(function(prev, cur){return prev + cur;}));
	};
	// 显示进度条
	UploadPictures.prototype._showProgress = function(value, max){
		this.progress.max = max || this.progress.max || 0;
		this.progress.value = value;
		_.delClassName(this.progress, 'f-dn');
		// 更新进度条文案
		this._updateProgressMsg(this.progress.value, this.progress.max);
	};
	// 隐藏进度条
	UploadPictures.prototype._hideProgress = function(){
		_.addClassName(this.progress, 'f-dn');
	};
	// 更新进度条 文案
	UploadPictures.prototype._updateProgressMsg = function(value, max){
		// 默认 文案为空
		var progress_msg = '';
		// 若value 与 max 存在
		if(typeof value !== 'undefined' && typeof max !== 'undefined'){
			progress_msg = `共有${this.uploadfiles_total}个文件，已完成${this.uploadfiles_loaded}个文件，上传进度${parseInt(value / max * 100, 10)}%`;
		}
		// 更新 进度条 文案
		this.progress_msg.innerHTML = progress_msg;
	};

	// 4.设置封面
	UploadPictures.prototype.setCoverImg = function(evt){
		// 若不是设置封面按钮, 直接忽略
		if(!_.hasClassName(evt.target, 'u-btn')){return;}
		// 清楚其它li上的选中状态
		Array.prototype.forEach.call(this.pictures_controller.children, function(li){
			_.delClassName(li, 'z-active');
		});
		// 为当前选中li，增加选中状态
		_.addClassName(evt.target.parentNode, 'z-active');
		this.coverImg = {
			id: evt.target.parentNode.dataset.id,
			url: evt.target.parentNode.dataset.url
		};
	};

	// 5.删除图片
	UploadPictures.prototype.removeImg = function(evt){
		// 若不是删除图片按钮，直接忽略
		if(!_.hasClassName(evt.target, 'u-icon')){return;}
		// 删除图片的id
		console.log('删除图片');

		// 找到li元素
		var li = evt.target.parentNode.parentNode; 
		if(li.nodeName.toUpperCase() === 'LI'){
			// 找到id
			var id =  li.dataset.id;
			// 删除视图中的li
			this.pictures_controller.removeChild(li);

			// 从列表中清除 图片
			for(var i=this.picture_list.length - 1;i>=0;i--){
				// 若在图片列表中，找到该图片
				if(this.picture_list[i].id == id){
					// 则从列表中删除该图片
					this.picture_list.splice(i,1);
				}
			}
		}
		
	};

	// 6.获取图片列表信息
	UploadPictures.prototype.getValue = function(){
		return {
			coverId: this.coverImg ? this.coverImg.id : undefined, // 封面id
			coverUrl: this.coverImg ? this.coverImg.url : undefined, // 封面url
			pictures: this.picture_list.map(function(item, index){ // 图片列表
				var picture = {};
				for(key in item){
					picture[key] = item[key];
				}
				picture['position'] = index;
				return picture;
			})
		};
	};

	App.UploadPictures = UploadPictures;

})(window.App);