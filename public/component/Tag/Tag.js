/**
*  标签组件
*/
(function(App){

	var template = `<div class="m-tag">
		<div class="f-cb">
			<label class="tag_title">标签</label>
			<ul class="tag_list"></ul>
		</div>
		<div class="f-cb">
			<label class="tag_recommend">推荐标签</label>
			<ul class="tag_recommendlist"></ul>
		</div>
	</div>`;

	/**
	*  option = {
	*    parent: dom节点 (父容器节点)
	*    tags: [] (默认选中标签)
	*    tags_recommend: [] (推荐标签)
	*  }
	*/
	function Tag(options){

		// 继承配置
		_.extend(this, options);

		// 缓存节点
		this.container = _.html2node(template);
		this.tag_ul = _.getElementsByClassName(this.container, 'tag_list')[0];
		this.tags_recommend_ul = _.getElementsByClassName(this.container, 'tag_recommendlist')[0];
		// tag数组
		this.list = [];
		// 推荐tag数组
		this.list_recommend = [];

		// 初始化
		this.init();
	}

	Tag.prototype.init = function(){

		// 1.检验必传参数
		if(!this.parent){
			console.log('请传入标签父容器节点');
			return;
		}

		// 2.初始化默认标签（选中标签、推荐标签）
		this.initTagList();

		// 3.绑定事件
		this.addEvent();

		// 4.挂载组件
		this.parent.appendChild(this.container);

	};
	// 初始化选中标签组 & 推荐标签组
	Tag.prototype.initTagList = function(){
		// 添加最后的自定义标签
		this.add_tag = _.html2node(`<li class="add_tag"><input class="f-dn" /><span>自定义标签</span></li>`);
		this.tag_ul.appendChild(this.add_tag);
		// 添加默认选中标签
		this.tags && this.addTag(this.tags, this.tag_ul, this.add_tag);
		// 添加推荐标签
		this.tags_recommend && this.addTag(this.tags_recommend, this.tags_recommend_ul);

		// 缓存节点
			// 输入框
		this.add_tag_input = this.add_tag.getElementsByTagName('input')[0];
			// 自定义标签按钮
		this.add_tag_btn = this.add_tag.getElementsByTagName('span')[0];
	};
	/** 添加标签
	*   tags: [] || str 存放标签的[] 或者 单个标签
	*   target: dom节点  插入标签的父容器节点
	*   before: dom节点  在此节点前，插入标签 (选填)
	*/
	Tag.prototype.addTag = function(tags, target, before){
		// 添加单个tag函数
		var add = function(tag){
			// 若未添加过此标签
			if(this.list.indexOf(tag) === -1){
				// 若对位置没有要求，则直接放在尾部
				if(typeof before === 'undefined'){
					this.target.appendChild(_.html2node(`<li>${tag}</li>`));
				}
				// 否则 放在特定位置的前面
				else{
					this.target.insertBefore(_.html2node(`<li>${tag}</li>`), this.before);
				}
				this.list.push(tag);
			}
		};

		// tags支持数组，也支持单个字符串
		if(tags && !Array.isArray(tags)){
			tags = [tags];
		}
		// 遍历tags, 添加时，用到的上下文
		var context = {}; // 指定forEach的上下文
		target && (context.target = target);
		before && (context.before = before);
		// 若是添加到选中tag节点
		if(target === this.tag_ul){
			context.list = this.list;
		}
		// 否则，添加到推荐tag节点
		else{
			context.list = this.list_recommend;
		}
		// 遍历tags, 添加tag
		(tags || []).forEach(add, context);
	};
	//  移除标签
	Tag.prototype.removeTag = function(evt){
		// 若已添加过此标签
		if(this.list.indexOf(evt.target.innerText) !== -1){
			// 从选中list中移除
			this.list.splice(this.list.indexOf(evt.target),1);
			// 从视图中移除
			evt.target.parentNode.removeChild(evt.target);
		}
		console.log(this.list);
	}
	//  添加事件
	Tag.prototype.addEvent = function(){

		//   3.1 点击推荐标签 事件
		this.tags_recommend_ul.addEventListener('click', function(evt){
			// 若不是点中li，则直接return
			if(evt.target.nodeName.toUpperCase() !== 'LI'){return;}
			// 添加tag 到 选中list
			this.addTag(evt.target.innerText, this.tag_ul, this.add_tag);
		}.bind(this));

		//   3.2 点击选中标签 事件
		this.tag_ul.addEventListener('click', function(evt){
			// 若是点中li，则删除标签
			if(evt.target.nodeName.toUpperCase() === 'LI'){
				this.removeTag(evt);
			}
			// 若是自定义标签按钮
			if(evt.target === this.add_tag_btn){
				// 隐藏自定义标签按钮
				_.addClassName(this.add_tag_btn, 'f-dn');
				// 显示自定义标签输入框
				_.delClassName(this.add_tag_input, 'f-dn');
				// 清空输入框内内容
				this.add_tag_input.value = '';
				// 聚焦输入框
				this.add_tag_input.focus();
			}
		}.bind(this));

		//  添加自定义标签 函数
		var addCustomTag = function(evt){
			// 若自定义input内 有值
			if(evt.target.value.trim()){
				// 向选中列表中, 添加标签
				this.addTag(evt.target.value.trim(), this.tag_ul, this.add_tag);
			}
			// 隐藏自定义标签输入框
			_.addClassName(this.add_tag_input, 'f-dn');
			// 显示自定义标签按钮
			_.delClassName(this.add_tag_btn, 'f-dn');
		}.bind(this);

		//   3.3  自定义标签输入框 失去焦点事件
		this.add_tag_input.addEventListener('blur', addCustomTag);

		//   3.4  自定义标签输入框 按下回车键
		this.add_tag_input.addEventListener('keydown',function(evt){
			if(evt.keyCode == 13){
				addCustomTag(evt);
			}
		});
	}
	//  获取选中tag列表
	Tag.prototype.getValue = function(){
		return this.list.join(',');
	};

	App.Tag = Tag;

})(window.App);