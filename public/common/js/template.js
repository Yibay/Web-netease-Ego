// 防止window.App 不存在
if(!window.App || typeof window.App != 'object'){
	window.App = {};
}

// 模板储存对象
(function(App){

	var template = {

		/** Section 模板
		* 上下文 {
		*   icon, str类型 (用于 图标样式)
		*   title, str类型 (用于 标题内容)
		*   cnt, str类型 (用于 替换section_cnt结构)
		* }
		*/
		m_section: Handlebars.compile(`<div class="m-section">
			<h4 class="section_head">
				<span><i class="u-icon {{icon}}"></i>{{title}}</span>
				<span class="section_more">更多<i class="u-icon u-icon-moreright"></i></span>
			</h4>
			{{#if cnt}}
				{{!-- 使用3个{}，可以不转译<>等字符 --}}
				{{{cnt}}}
			{{else}}
				<div class="section_cnt"></div>
			{{/if}}
		</div>`),

		/** 图片列表 模板
		* 上下文 {
		*   list_type, str类型 (用于 列表整体样式，如每行几列。)
		*   list, array类型, 
		*         其中单个元素为obj{
		*                       img: str类型 (url地址)
		*                       img_alt: str类型 (图片加载失败时，显示的文案)
		*                       img_name: str类型 (图片的名字)[可选]
		*                     }
		* }
		*/
		list_img: Handlebars.compile(`<div class="section_cnt m-list {{list_type}}">
			<ul class="f-cb f-tac">
				{{#each list}}
					<li>
						<img src="{{img}}" alt="{{img_alt}}"/>
						{{#if img_name}}
							<div>{{img_name}}</div>
						{{/if}}
					</li>
				{{/each}}
			</ul>
		</div>`)

	}

	App.template = template;

})(window.App);