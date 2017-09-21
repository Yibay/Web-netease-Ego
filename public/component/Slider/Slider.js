// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

(function(App){

	// 模板
	var template = `<div class="m-slider"></div>`;

	/* options 参数说明
	*{
	*	parent: dom节点, 父容器（必填）
	*	imgArray: [], 图片src数组 (必填) 
	*	interval: num, 轮播间隔时间 (选填, 默认5000)
	*}
	*/
	function Slider(options){

		// 继承配置
		_.extend(this, options);
		this.imgLength = this.imgArray.length;
		this.interval = this.interval || 5000; // 若未设置 轮播间隔，默认5000

		// 缓存节点
		this.slider = this._template.cloneNode(true);
		this.sliders = this.buildSlider();
		this.cursors = this.buildCursors();

		// 初始化
		this.init();
	
	}

	// 用于复制的节点
	Slider.prototype._template = _.html2node(template);

	// 构建轮播图节点
	Slider.prototype.buildSlider = function(){
		var slider_ul = _.html2node('<ul></ul>');
		var html = '';
		// 轮播图
		this.imgArray.forEach(function(item, index){
			html += `<li class="slider_img"><img src=${item} /></li>`
		});
		slider_ul.innerHTML = html;
		// 挂载到 Slider组件
		this.slider.appendChild(slider_ul);

		return slider_ul.children;
	}

	// 构建指示器节点
	Slider.prototype.buildCursors = function(){
		var cursor = _.html2node(`<ul class="m-cursor"></ul>`);
		var html = '';
		// 添加指示器 按钮
		for(var i = 0;i < this.imgLength;i++){
			html += `<li data-index=${i}></li>`;
		}
		cursor.innerHTML = html;
		// 将指示器 挂载到 Slider组件
		this.slider.appendChild(cursor);

		cursor.addEventListener('click', function(evt){
			// 若点击的是li，而不是ul
			if(typeof evt.target.dataset.index !== 'undefined'){
				// 点击指示器节点按钮，跳到对应轮播
				this.nav(evt.target.dataset.index);
			}
		}.bind(this));

		return cursor.children;
	}

	// 初始化
	Slider.prototype.init = function(){
		// 绑定事件
		this.slider.addEventListener('mouseenter', this.stop.bind(this));
		this.slider.addEventListener('mouseleave', this.autoPlay.bind(this));
		// 挂载组件
		this.parent.appendChild(this.slider);
		// 初始化动作
		this.nav(this.initIndex || 0);
		this.autoPlay();
	}

	// 下一页
	Slider.prototype.next = function(){
		var index = (this.index + 1) % this.imgLength;
		this.nav(index);
	}

	// 跳到指定页
	Slider.prototype.nav = function(index){
		// 若未改变index, 则不做任何操作
		if(this.index === index) return;
		// 保存上一页
		this.last = this.index;
		this.index = index;
		// 过渡动画
		this.fade();
		this.setCurrent();
	}

	// 轮播效果
	Slider.prototype.fade = function(){
		// 若存在上一页
		if(typeof this.last !== 'undefined'){
			// 上一页隐藏
			this.sliders[this.last].style.opacity = 0;
		}
		// 当前页显示
		this.sliders[this.index].style.opacity = 1;
	}

	// 设置当前选中状态
	Slider.prototype.setCurrent = function(){
		// 若存在上一页
		if(typeof this.last !== 'undefined'){
			// 除去上一节点的选中状态
			_.delClassName(this.sliders[this.last], 'z-active');
			_.delClassName(this.cursors[this.last], 'z-active');
		}
		// 添加当前选中节点的选中状态
		_.addClassName(this.sliders[this.index], 'z-active');
		_.addClassName(this.cursors[this.index], 'z-active');
	}

	// 自动播放
	Slider.prototype.autoPlay = function(){
		this.timer = setInterval(this.next.bind(this), this.interval);
	}
	// 停止自动播放
	Slider.prototype.stop = function(){
		clearInterval(this.timer);
	}

	App.Slider = Slider;

})(window.App);