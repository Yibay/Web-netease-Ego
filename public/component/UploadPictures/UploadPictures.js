/**
*  上传图片 组件
*/

(function(App){

	var template = `<div class="m-uploadpictures">
		<div class="upload_controller f-cb">
			<label class="upload_title">上传图片</label>
			<div class="f-oh">
				<label>
					<span class="upload_btn u-btn u-btn-primary">选择图片上传</span>
					<input class="upload_input" type="file" multiple accept="image/*" />
				</label>
				<p class="prompt_box">提示：作品可以包含多张图片，一次选择多张图片，最多不超过10张（单张图片大小小于1M）</p>
			</div>
		</div>
		<div class="pictures_controller f-cb">

		</div>
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
		this.upload_input = _.getElementsByClassName(this.container, 'upload_input')[0]; // 存图片文件的input

		// 初始化
		this.init();
	}

	// 初始化
	UploadPictures.prototype.init = function(){

		// 绑定 选择上传图片后 触发事件
		this.upload_input.addEventListener('change', changeHandler.bind(this));

		function changeHandler(){
			var files = this.upload_input.files;
			var maxSize = 1024 * 1024;  // 1M
			var sizeOkFiles = [];
			var sizeExceedFiles = [];

			// 过滤出，大小 < 1M 的图片
			Array.prototype.forEach.call(files, function(item){
				// 图片尺寸 < 1M
				if(item.size < maxSize){
					sizeOkFiles.push(item);
				}
				// 图片尺寸 > 1M
				else{
					sizeExceedFiles.push(item);
				}
			});

			// 上传图片
			this.uploadFiles(sizeOkFiles);
		}

		// 挂载组件
		this.parent.append(this.container);
	};
	// 上传文件
	UploadPictures.prototype.uploadFiles = function(files){

		console.log(files);

		var uploadRequests = [];

		// 并发各图片上传请求
		files.forEach(function(item){

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

				xhr.upload.addEventListener('progress', progressHandler, false);
				xhr.open('POST', '/api/works?upload');
				xhr.send(fd);

			})
			.then(res => res)
			.catch(e => e)
			);
		});

		console.log(uploadRequests);

		function progressHandler(e){
			console.log(e);
		}

		// 全部请求返回后
		Promise.all(uploadRequests)
			.then(function(data){
				// 上传完毕，恢复按钮状态
				console.log(data);
			})
			.catch(function(e){
				console.log(e);
			})
		
	};

	App.UploadPictures = UploadPictures;

})(window.App);