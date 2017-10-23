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
				<span class="section_more">更 多<i class="u-icon u-icon-moreright"></i></span>
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
		</div>`),

		/** 活动进行时 模板
		* 上下文 {
		*   list_type, str类型 (用于 列表整体样式，如每行几列。)
		*   list, array类型，
		*         其中单个元素为obj{
		*                       img: str类型 (url地址)
		*                       times: str类型 (活动时间段)
		*                       status: str类型 (活动状态)
		*                     }
		* }
		*/ 
		list_activity: Handlebars.compile(`<div class="section_cnt m-list {{list_type}}">
			<ul class="f-cb f-tac">
				{{#each list}}
					<li class="activity_ongonging">
						<div class="f-fr involve_activity">
							<div class="u-btn u-btn-primary">快来PK</div>
							<div class="u-btn u-btn-primary">邀请小伙伴</div>
						</div>
						<div class="f-oh">
							<img src="{{img}}" />
						</div>
					</li>
				{{/each}}
			</ul>	
		</div>`),

		/** 首页 侧边栏排行榜
		* 上下文 {
		*  list, array类型,
		*        其中单个元素为obj{
		*                      img_url: str类型          (作品图片地址)
		*                      work_name: str类型        (作品名字)
		*                      author_name: str类型     （作者名称）
		*                      visit_num: num类型       （查看人数）
		*                      collection_num: num类型  （收藏人数）
		*                    }
		* }
		*/
		aside_ranking: Handlebars.compile(`<div class="m-aside">
			<div class="ranking_header">
				<div class="f-fl title">排 行</div>
				<div id="ranking_tabs" class="f-oh"></div>
			</div>
			<ul class="ranking_cnt">
			{{#each list}}
				<li class="f-cb">
					<img class="f-fl" src="{{img_url}}" />
					<div class="f-oh">
						<h6>{{work_name}}</h6>
						<p>{{author_name}}</p>
						<p><span>查看 {{visit_num}}</span><span>收藏 {{collection_num}}</span></p>
					</div>
				</li>
			{{/each}}
			<i class="u-icon u-icon-morebottom"></i>
			</ul>
		</div>`),

		/** 首页 侧边栏达人排行榜
		* 上下文 {
		*  list, array类型,
		*        其中单个元素为obj{
		*                      img_url: str类型          (作品图片地址)
		*                      author_name: str类型     （作者名称）
		*                      works_num: num类型       （查看人数）
		*                      fans_num: num类型        （收藏人数）
		*                    }
		* }
		*/
		aside_authorranking: Handlebars.compile(`<div class="m-aside">
			<div class="authorranking_header">
				<div class="title">达 人 排 行 榜</div>
			</div>
			<ul class="authorranking_cnt">
			{{#each list}}
				<li class="f-cb">
					<img class="f-fl" src="{{img_url}}" />
					<div class="f-oh">
						<h6>{{author_name}}</h6>
						<p><span>作品 {{works_num}}</span><span>粉丝 {{fans_num}}</span></p>
					</div>
				</li>
			{{/each}}
			<i class="u-icon u-icon-morebottom"></i>
			</ul>
		</div>`),

		/** 首页 侧边栏热门话题
		* 上下文 {
		*  list, array类型,
		*        其中单个元素为obj{
		*                      title: str类型          (热门话题 标题)
		*                    }
		* }
		*/
		aside_hottopic: Handlebars.compile(`<div class="m-aside">
			<div class="hottopic_header">
				<div class="title">热 门 话 题</div>
			</div>
			<ul class="hottopic_cnt">
			{{#each list}}
				<li class="f-cb">
					<div class="f-oh">
						<div class="title">{{title}}</div>
					</div>
				</li>
			{{/each}}
			</ul>
			<h4 class="aside_more">更 多<i class="u-icon u-icon-moreright"></i></h4>
		</div>`),

		/** 首页 侧边栏圈子
		* 上下文 {
		*  list, array类型,
		*        其中单个元素为obj{
		*                      circle_name: str类型    (圈子 名称)
		*                      circle_members         (圈子 成员数)
		*                    }
		* }
		*/
		aside_circle: Handlebars.compile(`<div class="m-aside">
			<div class="circle_header">
				<label class="title"><input class="f-dn" type="radio" name="circle" value="0" checked /><div>活 跃 圈 子</div></label><label class="title"><input class="f-dn" type="radio" name="circle" value="1" /><div>创 建 圈 子</div></label>
			</div>
			<ul class="circle_cnt">
			{{#each list}}
				<li class="f-cb">
					<img class="f-fl" src="{{img_url}}" />
					<div class="f-oh">
						<h6>{{circle_name}}</h6>
						<p><span>已圈 {{circle_members}}人</span></p>
					</div>
				</li>
			{{/each}}
			</ul>
			<h4 class="aside_more">更 多<i class="u-icon u-icon-moreright"></i></h4>
		</div>`)

	}

	App.template = template;

})(window.App);