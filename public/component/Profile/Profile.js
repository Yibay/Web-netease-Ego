/**
* 简介组件
*/

(function(App){

	var template = Handlebars.compile(`<div class="u-avatar"></div>
	<div class="u-info">
		<em class="name" title="{{nickname}}">{{nickname}}</em>
		<span class="sex">
			<em class="u-icon {{sex}}"></em>
		</span>
	</div>
	<div class="u-info">
		<em class="age">{{age}}岁</em>
		<em class="constellation">{{zodiac}}座</em>
		<span class="address-info">
			<em class="u-icon u-icon-address"></em>
			<em class="address">{{city}}</em>
		</span>
	</div>`);

	/**
	*  options = {
	*    parent: dom节点 
	*  }
	*/
	function Profile(options){

		// 继承配置
		_.extend(this, options);

		// 初始化(挂载组件)
		this.init();

	}

	// 混入 事件管理器
	_.extend(Profile.prototype, App.emitter);

	var iconConfig = [
		'u-icon-male',
		'u-icon-female'
	];

	// 初始化
	Profile.prototype.init = function(){
		// 订阅登录事件
		this.on('login', function(data){
			// 模板所用数据
			var user_info = {
				nickname: data.nickname,  // 昵称
				sex: iconConfig[data.sex],  // 性别icon
				age: _.calculateAge(data.birthday),  // 年龄
				city: _.searchCity(ADDRESS_CODES, {province: data.province,city: data.city}),  // 城市
				zodiac: _.calculateZodiac(data.birthday)  // 星座 
			};
			// 通过数据 生成模板
			this.parent.innerHTML = template(user_info);
		}.bind(this));
	};

	App.Profile = Profile;

})(window.App);